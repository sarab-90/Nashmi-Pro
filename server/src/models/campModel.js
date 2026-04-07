import { pool } from "../config/db.js";

export const getAllCamps = async () => {
  const result = await pool.query("SELECT * FROM camps");
  return result.rows;
};

export const getCampById = async (id) => {
  const result = await pool.query("SELECT * FROM camps WHERE campId = $1", [
    id,
  ]);
  return result.rows[0];
};

export const createCamp = async (campData) => {
  const {
    title,
    description,
    location,
    age_range,
    mentor,
    category,
    capacity,
  } = campData;
  const result = await pool.query(
    "INSERT INTO camps (title, description, location, age_range, mentor, category, capacity) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
    [title, description, location, age_range, mentor, category, capacity],
  );
  return result.rows[0];
};
export const updateCampById = async (id, campData) => {
  const {
    title,
    description,
    location,
    age_range,
    mentor,
    category,
    capacity,
  } = campData;
  const result = await pool.query(
    "UPDATE camps SET title = $1, description = $2, location = $3, age_range = $4, mentor = $5, category = $6, capacity = $7 WHERE campId = $8 RETURNING *",
    [title, description, location, age_range, mentor, category, capacity, id],
  );
  return result.rows[0];
};
export const deleteCampById = async (id) => {
  const result = await pool.query(
    "DELETE FROM camps WHERE campId = $1 RETURNING *",
    [id],
  );
  return result.rows[0];
};
export const findCampById = async (id) => {
  const result = await pool.query("SELECT * FROM camps WHERE campId = $1", [
    id,
  ]);
  return result.rows[0];
};
