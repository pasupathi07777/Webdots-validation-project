import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();
const key=process.env.JWT_SECRET 



export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, key, {
    expiresIn: "7d",
  });
  return token;
};

export const verifyJwtToken = async (token)=> await jwt.verify(token, key);
