import Job from "../models/jobModel.js";
import { StatusCodes } from "http-status-codes";

//get all jobs
// export const getAllJobs = async (req, res) => {
// try {
//   const jobs=await Job.find({});
//   res.status(200).json({jobs});
// } catch (error) {
//   res.status(500).json({msg: error.msg});
// }
// }

export const getAllJobs = async (req, res) => {
  const jobs = await Job.find({});
  res.status(StatusCodes.OK).json({ jobs });
};

  

//create job
// export const createJob = async (req, res) => {
//    const { company, position } = req.body;
//    try {
//     const job=await Job.create({company, position});
//     if(!company || !position) {
//       res.status(404).json({msg: "Plase provide company & position"})
//     }
//     res.status(201).json({job});
//    } catch (error) {
//     res.status(500).json({msg: "There was an error"})
//    }
//   }


export const createJob = async (req, res) => {
  const { company, position } = req.body;

  const job = await Job.create({ company, position });
  res.status(StatusCodes.CREATED).json({ job });
};

//get job
// export const getJob = async (req, res) => {
// const {id}=req.params;
// try {
//   const job = await Job.findById(id);
//   if(!job) {
//     res.status(404).json({msg: `There is no job with id ${id}`});
//   }
//   res.status(200).json({job});
// } catch (error) {
//   res.status(500).json({msg: error.message})
// }
// }

export const getJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findById(id);
  if (!job) {
    return res.status(404).json({ msg: `no job with id ${id}` });
  }
  res.status(StatusCodes.OK).json({ job });
};

//update job
// export const updateJob = async (req, res) => {
//     const {id}=req.params;
//     const {company, position}=req.body;
//     if(!company || !position) {
//         return res.status(400).json({msg: "Please provide company & position"});
//     }
//     try {
//       const job= await Job.findByIdAndUpdate(id, {company, position});
//       if(!job) {
//         return res.status(404).json({msg: `No job with id ${id} was found`})
//       }
//       res.status(200).json({msg: "Job updated", job})
//     } catch (error) {
//       res.status(500).json({msg: error.message})
//     }
// }

export const updateJob = async (req, res) => {
  const { id } = req.params;

  const updatedJob = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!updatedJob) {
    return res.status(404).json({ msg: `no job with id ${id}` });
  }
  res.status(StatusCodes.OK).json({ job: updatedJob })
}


//delete job
// export const deleteJob = async (req, res) => {
// const { id } = req.params;
// try {
//   const job = await Job.findByIdAndDelete(id);
//   if (!job) {
//     return res.status(404).json({ msg: `No job with id ${id} was found` });
//   }
//   res.status(200).json({ msg: "Job deleted", job });
// } catch (error) {
//       res.status(500).json({msg: error.message})
//     }
// }

export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const removedJob = await Job.findByIdAndDelete(id);

  if (!removedJob) {
    return res.status(404).json({ msg: `no job with id ${id}` });
  }
  res.status(StatusCodes.OK).json({ job: removedJob });
};

