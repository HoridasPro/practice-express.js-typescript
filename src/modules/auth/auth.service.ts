import { pool } from "../../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config/env";

const createLoginIntoDB = async (payload: {
  email: string;
  password: string;
}) => {
  // check the user if exists
  // match the password
  //generate token
  const { email, password } = payload;

  // create user
  const userData = await pool.query(
    `
  SELECT * FROM users WHERE email=$1
  `,
    [email],
  );

  if (userData.rowCount === 0) {
    throw new Error("Invalid Credentials!");
  }
  const user = userData.rows[0];

  // mathc password
  const matchPassword = await bcrypt.compare(password, user.password);
  if (!matchPassword) {
    throw new Error("Invalid Credentials!");
  }

  // token generate
  const jwtpayload = {
    id: user.id,
    name: user.name,
    email: user.email,
    is_active: user.is_active,
  };

  const accessToken = jwt.sign(jwtpayload, config.secret as string, {
    expiresIn: "1d",
  });
  return { accessToken };
};
export const loginService = {
  createLoginIntoDB,
};
