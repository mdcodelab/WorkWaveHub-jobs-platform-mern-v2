import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import {body, validationResult} from "express-validator";
import morgan from "morgan";
//import { validateTest } from "./middleware/validationMiddleware.js";
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
import { authenticateUser } from "./middleware/authMiddleware.js";
import connectDB from "./connectDB.js";

import { nanoid } from "nanoid";
import jobRouter from "./router/jobRouter.js";
import userRouter from "./router/userRouter.js";

// const jobs = [
//     {id: nanoid(), company: "apple", position: "front-end"},
//     {id: nanoid(), company: "microsoft", position: "back-end"}
// ]

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

app.use("/api/v1/jobs", authenticateUser, jobRouter);
app.use("/api/v1/auth", userRouter); //api/v1/auth/register & api/v1/auth/login

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
