import mongoose from "mongoose";
import { body, validationResult } from "express-validator";
import { param } from 'express-validator';
import { JOB_STATUS, JOB_TYPE, JOB_SORT_BY } from "../utils/constants.js";
import Job from "../models/jobModel.js"
const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        res.status(404).json({errorMessages});
      }
      next();
    },
  ];
};

export const validateJobInput = withValidationErrors([
  body("company").notEmpty().withMessage("company is required"),
  body("position").notEmpty().withMessage("position is required"),
  body("jobLocation").notEmpty().withMessage("job location is required"),
  body("jobStatus")
    .isIn(Object.values(JOB_STATUS))
    .withMessage("invalid status value"),
  body("jobType").isIn(Object.values(JOB_TYPE)).withMessage("invalid job type"),
]);

// export const validateIdParam = withValidationErrors([
//   param("id")
//     .custom((value) => mongoose.Types.ObjectId.isValid(value))
//     .withMessage("invalid MongoDB id"),
// ]);


export const validateIdParam = withValidationErrors([
  param("id").custom(async (value) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) {
      const error = new Error("invalid MongoDB id");
      error.statusCode = 400;
      throw error;
    }
    const job = await Job.findById(value);
    if (!job) {
      const error = new Error(`no job with id : ${value}`);
      error.statusCode = 404;
      throw error;
    }
  }),
]);


