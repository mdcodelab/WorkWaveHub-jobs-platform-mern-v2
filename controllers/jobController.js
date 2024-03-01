import { nanoid } from "nanoid";

let jobs = [
  { id: nanoid(), company: "apple", position: "front-end developer" },
  { id: nanoid(), company: "google", position: "back-end developer" },
];

//get all jobs
export const getAllJobs = async (req, res) => {
res.status(200).json({jobs});
}

//create job
export const createJob = async (req, res) => {
   const {company, position}=req.params;
   if(!company || position) {
    return res.status(404).json({msg: "Please provide company & position"});
   }
   const {id}=nanoid(10);
   const job = {id, company, position};
job.company=company;
job.position=position;
jobs.push(job);
res.status(200).json({job});
}

//get job
export const getJob = async (req, res) => {
const {id}=req.params;
const job = find.jobs((job) => job.id === id);
if(!job) {
    return res. status(404).json({msg: `The job with id of ${id} does not exist`});
}
res.status(200).json({job});
}

//update job
export const updateJob = async (req, res) => {
    const {id}=req.params;
    const {company, position}=req.body;
    if(!company || !position) {
        return res.status(404).json({msg: "Please provide company & position"});
    }
    const job = jobs.find((job) => job.id === id);
    if (!job) {
      return res.status(404).json({ msg: `no job with id ${id}` });
    }
    job.company = company;
    job.position = position;
    res.status(200).json({ msg: "job modified", job });
}

//delete job
export const deleteJob = async (req, res) => {
const { id } = req.params;
const job=jobs.find((job) => job.id === id);
if (!job) {
  return res.status(404).json({ msg: `no job with id ${id}` });
}
const newJobs=jobs.filter((job)=> job.id === id)
jobs=newJobs;
res.status(200).json({msg: "    Job deleted"})
}
