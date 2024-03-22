import Job from "../models/jobModel.js";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import dayjs from "dayjs";

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
  const jobs = await Job.find({ createdBy: req.user.userId});
  res.status(StatusCodes.OK).json({ jobs });
};

  

//create job
// export const createJob = async (req, res) => {
//    const { company, position } = req.body;
//    try {
//     const job=await Job.create({company, position});
//     if(!company || !position) {
//       res.status(404).json({msg: "Please provide company & position"})
//     }
//     res.status(201).json({job});
//    } catch (error) {
//     res.status(500).json({msg: "There was an error"})
//    }
//   }


export const createJob = async (req, res) => {
  req.body.createdBy=req.user.userId;
  console.log(req.body.createdBy);
  const job = await Job.create(req.body);
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
    return res.status(StatusCodes.NOT_FOUND).json({ msg: `no job with id ${id}` });
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


export const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },//userId as object
    { $group: { _id: "$jobStatus", count: { $sum: 1 } } },
  ]);
  console.log(stats); //array of 3 objects
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});
  console.log(stats); //object 3 elements

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0
  }
  const monthlyApplications = [
    {
      date: "May 23",
      count: 22,
    },
    {
      date: "Jun 23",
      count: 9,
    },
    {
      date: "Jul 23",
      count: 9,
    },
  ];
res.status(StatusCodes.OK).json({stats})
}

