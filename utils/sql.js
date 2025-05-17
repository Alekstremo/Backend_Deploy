import sql from "mssql";
import dotenv from "dotenv";

dotenv.config();

const sqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  server: process.env.DB_SERVER,
  port: parseInt(process.env.DB_PORT), // Asegurar que sea un número
  options: {
    encrypt: false, // Cambiar a true si usas Azure
    trustServerCertificate: true // Cambiar a true para entornos locales
  }
};

const sqlConnect = async () => {
  return await sql.connect(sqlConfig);
}

export { sqlConnect, sql };