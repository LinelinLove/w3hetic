import pool from "../config/database";
import { UserI, UserRepositoryI } from "../types/user.d";

export class UserRepository implements UserRepositoryI {
  // Fetch all users
  async getAll(): Promise<UserI[]> {
    let conn;
    try {
      conn = await pool.getConnection();
      const rows = await conn.query<UserI[]>(
        "SELECT id, username, password_hash FROM user"
      );
      return rows[0];
    } catch (error) {
      console.error("Error fetching all users:", error);
      return [];
    } finally {
      if (conn) conn.release();
    }
  }

  // Fetch a single user by ID
  async getOne(id: number): Promise<UserI | null> {
    let conn;
    try {
      conn = await pool.getConnection();
      const rows = await conn.query<UserI[]>(
        "SELECT id, username, password_hash FROM user WHERE id = ?",
        [id]
      );
      return rows[0].length > 0 ? rows[0][0] : null;
    } catch (error) {
      console.error(`Error fetching user with ID ${id}:`, error);
      return null;
    } finally {
      if (conn) conn.release();
    }
  }

  async getOneByUsername(username: string): Promise<UserI | null> {
    let conn;
    try {
      conn = await pool.getConnection();
      const [rows] = await conn.query<UserI[]>( // Destructure rows from result
        "SELECT id, username, email, password_hash FROM user WHERE username = ?",
        [username]
      );

      return rows.length > 0 ? rows[0] : null; // Access the first row directly
    } catch (error) {
      console.error(`Error fetching user with username ${username}:`, error);
      return null;
    } finally {
      if (conn) conn.release();
    }
  }

  async getOneByEmail(email: string): Promise<UserI | null> {
    let conn;
    try {
      conn = await pool.getConnection();
      const rows = await conn.query<UserI[]>(
        "SELECT id, email FROM user WHERE email = ?",
        [email]
      );
      return rows[0].length > 0 ? rows[0][0] : null;
    } catch (error) {
      console.error(`Error fetching user with email ${email}:`, error);
      return null;
    } finally {
      if (conn) conn.release();
    }
  }

  // Insert a new user and return the user with ID set
  async insert(user: UserI): Promise<UserI> {
    let conn;
    try {
      conn = await pool.getConnection();
      const result = await conn.query(
        "INSERT INTO user (email, username, password_hash) VALUES (?, ?, ?)",
        [user.email, user.username, user.password_hash]
      );
      user.id = result.insertId;
      return user;
    } catch (error) {
      console.error("Error inserting user:", error);
      throw error;
    } finally {
      if (conn) conn.release();
    }
  }

  // Update an existing user's details
  async update(user: UserI): Promise<UserI> {
    let conn;
    try {
      if (!user.id) {
        throw new Error("User ID is required for update");
      }
      conn = await pool.getConnection();
      await conn.query(
        "UPDATE user SET username = ?, password_hash = ? WHERE id = ?",
        [user.username, user.password_hash, user.id]
      );
      return user;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    } finally {
      if (conn) conn.release();
    }
  }

  // Delete a user by ID
  async delete(id: number): Promise<void> {
    let conn;
    try {
      conn = await pool.getConnection();
      await conn.query("DELETE FROM user WHERE id = ?", [id]);
    } catch (error) {
      console.error(`Error deleting user with ID ${id}:`, error);
      throw error;
    } finally {
      if (conn) conn.release();
    }
  }

  async getTotalUploadSizeByUserId(user_id: number): Promise<UserI | null> {
    let conn;
    try {
      conn = await pool.getConnection();
      const [rows] = await conn.query<{ total_upload_size: number }[]>(
        "SELECT total_upload_size FROM user_total_upload_size WHERE user_id = ?",
        [user_id]
      );

      return rows.length > 0 ? rows[0].total_upload_size : null;
    } catch (error) {
      console.error(
        `Error fetching total upload size for user ID ${user_id}:`,
        error
      );
      return null;
    } finally {
      if (conn) conn.release();
    }
  }

  async getFilenamesByUserId(user_id: number): Promise<
    | {
        file_name: string;
        file_path: string;
        file_size: number;
        uploaded_at: string;
      }[]
    | null
  > {
    let conn;
    try {
      conn = await pool.getConnection();
      const [rows] = await conn.query<
        {
          file_name: string;
          file_path: string;
          file_size: number;
          uploaded_at: string;
        }[]
      >(
        "SELECT file_name, file_path, file_size, uploaded_at FROM files WHERE user_id = ?",
        [user_id]
      );

      return rows.length > 0 ? rows : null;
    } catch (error) {
      console.error(`Error fetching filenames for user ID ${user_id}:`, error);
      return null;
    } finally {
      if (conn) conn.release();
    }
  }
}

export default new UserRepository();
