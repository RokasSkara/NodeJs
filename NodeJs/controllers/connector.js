import 'dotenv/config';
import mysql from 'mysql2/promise';

const mysqlConfig = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASS,
  database: process.env.DB,
  port: process.env.PORT,
};

const con = await mysql.createConnection(mysqlConfig);

export default con;
