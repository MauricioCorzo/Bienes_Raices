import {Sequelize} from "sequelize";
import dotenv from "dotenv"

dotenv.config({path: '.env'})

const db = process.env.NODE_ENV === "production"? new Sequelize({
    database:process.env.DB_NAME,
    dialect: "postgres",
    host: process.env.DB_HOST,
    port: "5432",
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
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
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    operatorAliases: false,
    logging: false, // Para que no aparezcan los msg de SQL en la consola
    native:false
})

export default db