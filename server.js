import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import {body, validationResult} from "express-validator";
import cors from "cors";
import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
import morgan from "morgan";
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
import { authenticateUser } from "./middleware/authMiddleware.js";
import cookieParser from "cookie-parser";
import connectDB from "./connectDB.js";

import { nanoid } from "nanoid";
import jobRouter from "./router/jobRouter.js";
import authRouter from "./router/authRouter.js";
import userRouter from "./router/userRouter.js";

// const jobs = [
//     {id: nanoid(), company: "apple", position: "front-end"},
//     {id: nanoid(), company: "microsoft", position: "back-end"}
// ]

//public
import {dirname} from "path";
import {fileURLToPath} from "url";
import path from "path";
const __dirname=dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "./public")));


app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world!");
});

// app.post("/", (req, res) => {
//   console.log(req);
//   res.json({ message: "Data received...", data: req.body });
// });

// app.post("/api/v1/test",
//   [body("name").notEmpty().withMessage("name is required")],
//   validateTest,
//   (req, res) => {
//     const { name } = req.body;
//     res.json({ msg: `hello ${name}` });
//   }
// );

app.get("/api/v1/test", (req, res) => {
  res.json({msg: "test route"})
})

app.use("/api/v1/jobs", authenticateUser, jobRouter);
app.use("/api/v1/auth", authRouter); //api/v1/auth/register & api/v1/auth/login
app.use("/api/v1/users", authenticateUser, userRouter);

// //get all jobs
// app.get("/api/v1/jobs", (req, res) => {
//   res.status(200).json({ jobs });
// });

// //create job
// app.post("/api/v1/jobs", (req, res) => {
//   const { company, position } = req.body;
//   if (!company || !position) {
//     return res.status(400).json({ msg: "Please provide company & position" });
//   }
//   const id = nanoid(10);
//   const job = { id, company, position };
//   jobs.push(job);
//   res.status(201).json({ job }); //when create a resource, status=201
// });

// //get single job
// app.get("/api/v1/jobs/:id", (req, res) => {
//     const {id}=req.params;
//     const job=jobs.find((job) => job.id === id);
//     if(!job) {
//         return res.status(404).json({msg: `No job with id ${id}`})
//     }
//   res.status(200).json({ job });
// });

// //edit job
// app.patch("/api/v1/jobs/:id", (req, res) => {
//   const { id } = req.params;
//   const {company, position}=req.body;
//   if (!company || !position) {
//     return res.status(400).json({ msg: "Please provide company & position"});
//   }
//   const job = jobs.find((job) => job.id === id);
//   if (!job) {
//     return res.status(404).json({ msg: `no job with id ${id}` });
//   }
// job.company=company;
// job.position=position;
//   res.status(200).json({ msg: "Job modified", job });
// });

// //delete job
// app.delete("/api/v1/jobs/:id", (req, res) => {
//   const { id } = req.params;
//   const job = jobs.find((job) => job.id === id);
//   if (!job) {
//     return res.status(404).json({ msg: `no job with id ${id}` });
//   }
//   const newJobs=jobs.filter((job)=> job.id !==id);
//   jobs=newJobs;

//   res.status(200).json({ msg: "Job deleted", newJobs });
// });

//not found
// app.use("*", (req, res) => {
//   res.status(404).json({ msg: "Not found" }); //"not-found" middleware requests for non-existing routes
// });

// //error middleware
// app.use((err, req, res, next) => {
//   console.log(err);
//   res.status(500).json({ msg: "Something went wrong" }); //"error" middleware is a catch-all for handling unexpected errors that occur during request processing.
// });

//entry point for the front-end: node server /localhost:3100
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public", "index.html"));
});

const port = process.env.PORT || 3100;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    console.log("Connection to database");
    app.listen(port, () => {
      console.log(`server is listening at port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
