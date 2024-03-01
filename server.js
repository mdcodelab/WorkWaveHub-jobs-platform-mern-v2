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

//create job
app.post("/api/v1/jobs", (req, res) => {
  const { company, position } = req.body;
  if (!company || !position) {
    return res.status(400).json({ msg: "Please provide company & position" });
  }
  const id = nanoid(10);
  const job = { id, company, position };
  jobs.push(job);
  res.status(201).json({ job }); //when create a resource, status=201
});

//get single job
app.get("/api/v1/jobs/:id", (req, res) => {
    const {id}=req.params;
    const job=jobs.find((job) => job.id === id);
    if(!job) {
        return res.status(404).json({msg: `No job with id ${id}`})
    }
  res.status(200).json({ job }); 
});

//edit job
app.patch("/api/v1/jobs/:id", (req, res) => {
  const { id } = req.params;
  const {company, position}=req.body;
  if (!company || !position) {
    return res.status(400).json({ msg: "Please provide company & position"});
  }
  const job = jobs.find((job) => job.id === id);
  if (!job) {
    return res.status(404).json({ msg: `no job with id ${id}` });
  }
job.company=company;
job.position=position;
  res.status(200).json({ msg: "Job modified", job });
});




const port = process.env.POrt || 3100; 

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
