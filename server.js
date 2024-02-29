import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import morgan from "morgan";
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
import {nanoid} from "nanoid";

const jobs = [
    {id: nanoid(), company: "apple", position: "front-end"},
    {id: nanoid(), company: "microsoft", position: "back-end"}
]

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.post("/", (req, res) => {
  console.log(req);
  res.json({ message: "Data received...", data: req.body });
});

//get all jobs
app.get("/api/v1/jobs", (req, res) => {
  res.status(200).json({ jobs });
});

const port = process.env.POrt || 3100; 

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
