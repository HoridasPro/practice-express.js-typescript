import { pool } from "../../db";
import type { Iuser } from "./user_interface";
import bcrypt from "bcrypt";
// get all data
const getAllUsersDataFromDB = async () => {
  const result = await pool.query(`
    SELECT * FROM users
    `);
  return result;
};

// Post data
const createUserIntoDB = async (payload: Iuser) => {
  const { name, email, password, age } = payload;
  const hashPassword = await bcrypt.hash(password, 10);
  const result = await pool.query(
    `
    INSERT INTO users(name, email, password, age) VALUES($1, $2, $3, $4)
    RETURNING *
    `,
    [name, email, hashPassword, age],
  );

  delete result.rows[0].password;
  return result;
};

// get single data
const getSingleData = async (id: string) => {
  const result = await pool.query(
    `
    SELECT * FROM users WHERE id=$1
    `,
    [id],
  );
  return result;
};

// Delete data
const deleteDataFromDB = async (id: string) => {
  const result = await pool.query(
    `
    DELETE FROM users WHERE id=$1
    RETURNING *
    `,
    [id],
  );
  return result;
};

// update data
const updateDataFromDB = async (payload: Iuser, id: string) => {
  const { name, password, age, is_active } = payload;
  const result = await pool.query(
    `
      UPDATE users
      SET
        name = COALESCE($1, name),
        password = COALESCE($2, password),
        age = COALESCE($3, age),
        is_active = COALESCE($4, is_active)
      WHERE id = $5
      RETURNING *;
      `,
    [name, password, age, is_active, id],
  );
  return result;
};

export const createService = {
  createUserIntoDB,
  getAllUsersDataFromDB,
  getSingleData,
  deleteDataFromDB,
  updateDataFromDB,
};
