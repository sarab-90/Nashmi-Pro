import { pool } from "../config/db.js";
// get user by userId
export const getUserById = async (userId) => {
  const result = await pool.query(
    `SELECT * FROM users WHERE userId = $1`, 
    [userId]
  );
  return result.rows[0];
};
// find user by email
export const findUserByEmail = async (email) => {
  const result = await pool.query(
    `SELECT userId, name, email, hashed_password, role FROM users WHERE email = $1`,
    [email]
  );
  return result.rows[0];
}
// get all users
export const getAllUsers = async () => {
  const result = await pool.query(
    `SELECT userId, name, email, role, created_at FROM users`,
  );
  return result.rows;
};
// update user by Id
export const updateUserById = async (userId, updateFields) => {
  const result = await pool.query(
    `UPDATE users SET name = $1, email = $2 WHERE userId = $3 RETURNING userId, name, email`,
    [updateFields.name, updateFields.email, userId],
  );
  return result.rows[0];
};
// delete user by Id
export const deleteUserById = async (userId) => {
  await pool.query(`DELETE FROM users WHERE userId = $1`, [userId]);
};
// save refresh token
export const saveRefreshToken = async (userId, refreshToken) => {
  await pool.query(`UPDATE users SET refresh_token = $1 WHERE userId = $2`, [
    refreshToken,
    userId,
  ]);
};
// change password
export const changePassword = async (userId, hashed_password) => {
  const result = await pool.query(
    `UPDATE users SET hashed_password = $1 WHERE userId = $2`,
    [hashed_password, userId]
  );
  return result.rows[0];
}