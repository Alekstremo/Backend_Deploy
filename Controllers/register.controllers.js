import { sqlConnect, sql } from "../utils/sql.js";
import db from "../utils/firebase.js";
import mongoose from "mongoose";
import crypto from "crypto";

// Función para generar un hash con sal
const hashPassword = (password, salt) => {
  return crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");
};

export const register = async (req, res) => {
  const { username, password, email } = req.body;
  const salt = crypto.randomBytes(16).toString("hex");
  const hashedPassword = hashPassword(password, salt);
  
  try {
    // SQL Server
    const pool = await sqlConnect();
    await pool.request()
      .input("username", sql.VarChar, username)
      .input("email", sql.VarChar, email)
      .input("password", sql.VarChar, hashedPassword)
      .input("salt", sql.VarChar, salt)
      .query("INSERT INTO users (username, email, password, salt) VALUES (@username, @email, @password, @salt)");
    
    // MongoDB
    const UserModel = mongoose.model("User", new mongoose.Schema({
      username: String,
      email: String,
      password: String,
      salt: String,
    }));
    await UserModel.create({ username, email, password: hashedPassword, salt });
    
    // Firebase
    await db.collection("users").doc(username).set({
      username,
      email,
      password: hashedPassword,
      salt,
    });
    
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error registering user" });
  }
};
