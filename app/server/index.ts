import express, { Request, Response } from "express"
import cors from 'cors'
import {App} from "./types/app"
import userRoutes from './routes/users';
import {getRoute} from "./routes/api"

const server = express();
const PORT = 3000;

server.use(cors())

server.use(express.json())
server.use(userRoutes)

server.use((req, res, next) => {
  res.status(404)
  res.json({
      message: "t'es perdu"
  })
})

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

