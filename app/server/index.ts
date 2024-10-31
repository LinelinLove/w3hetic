import express, { Request, Response } from "express"
import cors from 'cors'
import mysql from 'mysql2/promise'
import {getRepository} from "./repository/repository"
import {App} from "./types/app"
import {getRoute} from "./routes/api"

const server = express();
const PORT = 3000;

server.use(cors())

const database = mysql.createPool({
  host: process.env.DB_HOST,
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "express"
})

const repository = getRepository(database)

const app: App = {
    repository
}

const routes = getRoute(app)

server.use(express.json())
server.use(routes)

server.use((req, res, next) => {
  res.status(404)
  res.json({
      message: "t'es perdu"
  })
})

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

