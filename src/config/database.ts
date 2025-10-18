import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.DB_NAME || 
  !process.env.DB_USER || 
  !process.env.DB_PASSWORD ||
  !process.env.DB_HOST) {
  throw new Error("Database Enviroment Variables not set");
}

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false,
  }
);

export default sequelize;
