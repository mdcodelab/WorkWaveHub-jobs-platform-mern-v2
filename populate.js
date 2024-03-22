//mock data from https://www.mockaroo.com
import { readFile } from "fs/promises";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import Job from "./models/jobModel.js";
import User from "./models/userModel.js";

try {
    await mongoose.connect(process.env.MONGO_URL);
    const user = await User.findOne({email: "mihaela@gmail.com"});
    const jsonJobs = JSON.parse(
      await readFile(new URL("./utils/mockData.json", import.meta.url)));
      const job = jsonJobs.map((job)=> {
        return {...job, createdBy: user._id}
      });
      await Job.deleteMany({createdBy: user._id}); //delete existing jobs
      await Job.create(job); //populate
      console.log("Success");
      process.exit(0);
} catch (error) {
    console.log(error);
    process.exit(1);
}

//node populate