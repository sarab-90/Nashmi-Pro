import pool from "../config/db.js";

//  الطريقة 1 >>استعلام لإنشاء مستخدم جديد في قاعدة البيانات
export const createUser = async (username, email, hashed_password, role) => {
  const query = `INSERT INTO users (username, email, hashed_password, role) 
                    VALUES ($1, $2, $3, $4) RETURNING id, username, email, role`;

  const result = await pool.query(query, [
    username,
    email,
    hashed_password,
    role,
  ]);
  return result.rows[0]; // اخر سطر في النتيجة
};