import { Sequelize } from "sequelize";
import {DB_NAME,DB_PASSWOR,DB_USER}from './src/config.js'
const sequelize = new Sequelize(
    DB_NAME,
    DB_USER,
    DB_PASSWOR,
    {
        host: "localhost",
        dialect: "mysql",
  
        logging: false
    }
);

export default sequelize;