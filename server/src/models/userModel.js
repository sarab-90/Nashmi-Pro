import { pool } from "../config/db.js";
// get user by id
export const getUserByid = async (id) => {
  const result = await pool.query(
    `SELECT userid, name, email, hashed_password, role FROM users WHERE userid = $1`, 
    [id]
  );
  return result.rows[0];
};
// get user by email
export const findUserByEmail = async (email) => {
  try {
    const result = await pool.query(
      `SELECT * FROM users WHERE email = $1`, 
      [email]
    );
    return result.rows[0];
  } catch (error) {
    console.log("FIND USER ERROR:", error);
    throw error;
  }
};
// get all users
export const getAllUsers = async () => {
  const result = await pool.query(
    `SELECT userid, name, email, role FROM users`,
  );
  return result.rows;
};
// update user by id
export const updateUserById = async (id, name, email) => {
  const result = await pool.query(
    `UPDATE users SET name = $1, email = $2 WHERE userid = $3 RETURNING userid, name, email`,
    [name, email, id],
  );
  return result.rows[0];
};
// delete user by id
export const deleteUserById = async (id) => {
  await pool.query(`DELETE FROM users WHERE userid = $1`, [id]);
};
// save refresh token
export const saveRefreshToken = async (userId, refreshToken) => {
  await pool.query(`UPDATE users SET refresh_token = $1 WHERE userid = $2`, [
    refreshToken,
    userId,
  ]);
};