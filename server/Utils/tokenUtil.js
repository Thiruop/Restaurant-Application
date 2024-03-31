import jwt from "jsonwebtoken";

export const createJWT = (payload) => {
  const token = jwt.sign(payload, process.env.TOKEN_KEY);
  return token;
};

export const verifyJWT = (token) => {
  const decoded = jwt.verify(token, process.env.TOKEN_KEY);
  return decoded;
};
