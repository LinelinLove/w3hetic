import pool from "../config/database";
import { FileI, FileRepositoryI } from "../types/file";

export class FileRepository implements FileRepositoryI {
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
  async deleteFile(id: number): Promise<void> {
    let conn;
    try {
      conn = await pool.getConnection();
      await conn.query("DELETE FROM files WHERE id = ?", [id]);
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
      const downloadLink = `http://127.0.0.1:8090/files/${uniqueToken}`;

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
}

export default new FileRepository();
