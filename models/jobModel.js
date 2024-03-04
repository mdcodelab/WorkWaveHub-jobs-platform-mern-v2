import mongoose from "mongoose";
import { JOB_STATUS, JOB_TYPE, JOB_SORT_BY } from "../utils/constants.js";

const JobSchema = new mongoose.Schema(
  {
    company: String,
    position: String,
    jobStatus: {
      type: String,
      //enum: ["interview", "declined", "pending"],
      enum: Object.values(JOB_STATUS),
      default: JOB_STATUS.PENDING,
    },
    jobType: {
      type: String,
      //enum: ["full-time", "part-time", "internship"],
      enum: Object.values(JOB_TYPE),
      default: JOB_TYPE.FULL_TIME,
    },
    jobLocation: {
      type: String,
      default: "my city",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Job", JobSchema);





