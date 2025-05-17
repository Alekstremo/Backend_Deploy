import { sqlConnect, sql } from "../utils/sql.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";

const hashPassword = (password, salt) => {
  return crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");
};

export const login = async (req, res) => {
  const pool = await sqlConnect();
  const data = await pool
    .request()
    .input("username", sql.VarChar, req.body.username)
    .query("SELECT * FROM users WHERE username=@username");

  if (data.recordset.length === 0) {
    return res.status(400).json({ isLogin: false, message: "Usuario no encontrado" });
  }

  const user = data.recordset[0];
  const hashedInputPassword = hashPassword(req.body.password, user.salt);
  const isLogin = hashedInputPassword === user.password;

  if (isLogin) {
    const token = jwt.sign(
      { id: user.id, username: user.username }, 
      process.env.JWT_SECRET || "secretkey",      
      { expiresIn: "2h" }                         
    );

    return res.json({ isLogin: true, token, user: { id: user.id, username: user.username } });
  } else {
    return res.status(400).json({ isLogin: false, message: "Contraseña incorrecta" });
  }
};
