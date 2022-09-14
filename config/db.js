import {Sequelize} from "sequelize";
import dotenv from "dotenv"

dotenv.config({path: '.env'})

const db = process.env.NODE_ENV === "production"? new Sequelize({
  database:DB_NAME,
  dialect: "postgres",
  host: DB_HOST,
  port: "5432",
  username: DB_USER,
  password: DB_PASSWORD,
  pool: {
    max: 3,
    min: 1,
    idle: 10000,
  },
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
    keepAlive: true,
  },
  ssl: true,
}) : new Sequelize(`${process.env.DB_NAME}`, `${process.env.DB_USER}`, `${process.env.DB_PASSWORD}`, {
    host: `${process.env.DB_HOST}`,
    port: process.env.DB_PORT,
    dialect: "postgres",
    define: {
        timestamps: true
    },
    pool: {
      max: 3,
      min: 1,
      idle: 10000,
    },
    operatorAliases: false,
    logging: false, // Para que no aparezcan los msg de SQL en la consola
    native:false,
    dialectOptions:{
      keepAlive: true
    }
})

export default db

// process.env.NODE_ENV === "production"? new Sequelize({
//   database:process.env.DB_NAME,
//   dialect: "postgres",
//   host: process.env.DB_HOST,
//   port: "5432",
//   username: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   pool: {
//     max: 3,
//     min: 1,
//     idle: 10000,
//   },
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false,
//     },
//     keepAlive: true,
//   },
//   ssl: true,
// }) :