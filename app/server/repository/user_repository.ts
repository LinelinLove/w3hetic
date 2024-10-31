import pool from '../config/database';
import { UserI, UserRepositoryI } from '../types/user.d';

export class UserRepository implements UserRepositoryI {
    // Fetch all users
    async getAll(): Promise<UserI[]> {
        let conn;
        try {
            conn = await pool.getConnection();
            const rows = await conn.query<UserI[]>('SELECT id, username, password_hash FROM user');
            return rows[0];
        } catch (error) {
            console.error('Error fetching all users:', error);
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
            const rows = await conn.query<UserI[]>('SELECT id, username, password_hash FROM user WHERE id = ?', [id]);
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
          const rows = await conn.query<UserI[]>('SELECT id, username, password_hash FROM user WHERE username = ?', [username]);
          return rows[0].length > 0 ? rows[0][0] : null;
      } catch (error) {
          console.error(`Error fetching user with username ${username}:`, error);
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
                'INSERT INTO user (username, password_hash) VALUES (?, ?)',
                [user.username, user.password_hash]
            );
            user.id = result.insertId;
            return user;
        } catch (error) {
            console.error('Error inserting user:', error);
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
                throw new Error('User ID is required for update');
            }
            conn = await pool.getConnection();
            await conn.query(
                'UPDATE user SET username = ?, password_hash = ? WHERE id = ?',
                [user.username, user.password_hash, user.id]
            );
            return user;
        } catch (error) {
            console.error('Error updating user:', error);
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
            await conn.query('DELETE FROM user WHERE id = ?', [id]);
        } catch (error) {
            console.error(`Error deleting user with ID ${id}:`, error);
            throw error;
        } finally {
            if (conn) conn.release();
        }
    }
}

export default new UserRepository();