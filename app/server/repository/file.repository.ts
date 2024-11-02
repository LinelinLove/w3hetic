import pool from "../config/database";
import {
  FileI,
  FileRepositoryI,
  FileLinkI,
  FileLinkRepositoryI,
} from "../types/file";
import { v4 as uuidv4 } from "uuid";

export class FileRepository implements FileRepositoryI, FileLinkRepositoryI {
  // Fetch all files for a specific user
  async getAllFilesByUser(user_id: number): Promise<FileI[]> {
    let conn;
    try {
      conn = await pool.getConnection();
      const rows = await conn.query<FileI[]>(
        "SELECT * FROM files WHERE user_id = ?",
        [user_id]
      );
      return rows[0];
    } catch (error) {
      console.error("Error fetching files for user:", error);
      return [];
    } finally {
      if (conn) conn.release();
    }
  }

  // Fetch a single file by ID
  async getFile(id: number): Promise<FileI | null> {
    let conn;
    try {
      conn = await pool.getConnection();
      const rows = await conn.query<FileI[]>(
        "SELECT * FROM files WHERE id = ?",
        [id]
      );

      return rows[0].length > 0 ? rows[0][0] : null;
    } catch (error) {
      console.error(`Error fetching file with ID ${id}:`, error);
      return null;
    } finally {
      if (conn) conn.release();
    }
  }

  // Insert a new file and return the file with ID set
  async insertFile(file: FileI): Promise<FileI> {
    let conn;
    try {
      conn = await pool.getConnection();
      const result = await conn.query(
        "INSERT INTO files (user_id, file_name, file_path, file_size) VALUES (?, ?, ?, ?)",
        [file.user_id, file.file_name, file.file_path, file.file_size]
      );
      file.id = result.insertId;
      return file;
    } catch (error) {
      console.error("Error inserting file:", error);
      throw error;
    } finally {
      if (conn) conn.release();
    }
  }

  // Update an existing file's details
  async updateFile(file: FileI): Promise<FileI> {
    let conn;
    try {
      if (!file.id) {
        throw new Error("File ID is required for update");
      }
      conn = await pool.getConnection();
      await conn.query(
        "UPDATE files SET file_name = ?, file_path = ?, file_size = ? WHERE id = ?",
        [file.file_name, file.file_path, file.file_size, file.id]
      );
      return file;
    } catch (error) {
      console.error("Error updating file:", error);
      throw error;
    } finally {
      if (conn) conn.release();
    }
  }

  // Delete a file by ID
  async deleteFile(id: number): Promise<boolean> {
    let conn;
    try {
      conn = await pool.getConnection();
      console.log(`Trying to delete file with ID: ${id}`);
      const result = await conn.query("DELETE FROM files WHERE id = ?", [id]);
      return result[0].affectedRows > 0;
    } catch (error) {
      console.error(`Error deleting file with ID ${id}:`, error);
      throw error;
    } finally {
      if (conn) conn.release();
    }
  }

  // Generate a download link for a file
  async generateDownloadLink(
    file_id: number,
    expiration_date?: Date
  ): Promise<FileLinkI> {
    let conn;
    try {
      const uniqueToken = uuidv4();
      const downloadLink = `http://localhost:3000/files/download/${uniqueToken}`;

      conn = await pool.getConnection();
      const result = await conn.query(
        "INSERT INTO file_links (file_id, download_link, expiration_date) VALUES (?, ?, ?)",
        [file_id, downloadLink, expiration_date]
      );

      return {
        id: result.insertId,
        file_id,
        download_link: downloadLink,
        expiration_date,
        created_at: new Date(),
      };
    } catch (error) {
      console.error("Error generating download link:", error);
      throw error;
    } finally {
      if (conn) conn.release();
    }
  }
  // Récupère un lien de téléchargement via un token unique
  async getDownloadLink(token: string): Promise<FileLinkI | null> {
    let conn;
    try {
      conn = await pool.getConnection();
      const rows = await conn.query<FileLinkI[]>(
        "SELECT * FROM file_links WHERE download_link = ?",
        [`http://localhost:3000/files/download/${token}`]
      );
      return rows[0].length > 0 ? rows[0][0] : null;
    } catch (error) {
      console.error(`Error fetching download link with token ${token}:`, error);
      return null;
    } finally {
      if (conn) conn.release();
    }
  }

  getTotalUploadSize = async (req: Request, res: Response) => {
    try {
      const userId = req.params.userId;

      // Vérifier si l'ID utilisateur est présent
      if (!userId) {
        return res.status(400).json({ message: "User ID is required." });
      }

      // Requête à la vue pour obtenir la taille totale des uploads de l'utilisateur
      const result = await db.query(
        "SELECT total_upload_size FROM user_total_upload_size WHERE user_id = $1",
        [userId]
      );

      if (result.rows.length === 0) {
        return res
          .status(404)
          .json({ message: "User not found or no uploads available." });
      }

      res.status(200).json({
        userId,
        totalUploadSize: result.rows[0].total_upload_size,
      });
    } catch (error) {
      console.error("Error fetching total upload size:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
}

export default new FileRepository();
