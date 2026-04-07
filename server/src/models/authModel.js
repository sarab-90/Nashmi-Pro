import { pool } from "../config/db.js";
// لإنشاء مستخدم جديد في قاعدة البيانات
export const createUser = async (name, email, hashed_password, role) => {
  const query = `INSERT INTO users (name, email, hashed_password, role) 
                 VALUES ($1, $2, $3, $4) 
                 RETURNING userid, name, email, role`;
  const result = await pool.query(query, [
    name,            
    email,         
    hashed_password,
    role            
  ]);
  return result.rows[0]; // يعيد الكائن الجديد المنشأ
};