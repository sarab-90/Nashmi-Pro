import { pool } from "../config/db.js";

//  الطريقة 2 >>  get user by id
export const getUserByid = async (id) => {
  const result = await pool.query(
    `SELECT username, email, hashed_password, role FROM users WHERE id= $1`,
    [id],
  );
  return result.rows[0]; // اخر سطر في النتيجة
};
////
export const findUserByEmail = async (email) => {
  console.log("12email:", email);

  try {
    const result = await pool.query(
      ` SELECT column_name FROM information_schema.columns WHERE table_name = 'users'`,
      // `SELECT id, username, email, hashed_password, role FROM users WHERE email = $1`,
      [email],
    );
    (console.log("query:", query), console.log("555email:", email));
    console.log("result:", result.rows);

    return result.rows[0];
  } catch (error) {
    console.log("FIND USER ERROR:", error);
    throw error;
  }
};
// get all users
export const getAllUsers = async () => {
  const result = await pool.query(
    `SELECT id, username, email, role FROM users`,
  );
  return result.rows; // كل السطور في النتيجة
};
// update user by id
export const updateUserById = async (id, username, email) => {
  const result = await pool.query(
    `UPDATE users SET username = $1, email = $2 WHERE id = $3 RETURNING id, username, email`,
    [username, email, id],
  );
  return result.rows[0]; // اخر سطر في النتيجة
};
// delete user by id
export const deleteUserById = async (id) => {
  await pool.query(`DELETE FROM users WHERE id = $1`, [id]);
};
// save refresh token
export const saveRefreshToken = async (userId, refreshToken) => {
  await pool.query(`UPDATE users SET refresh_token = $1 WHERE id = $2`, [
    refreshToken,
    userId,
  ]);
};
