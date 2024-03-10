import mongoose from "mongoose";
import { body, validationResult } from "express-validator";
import { param } from 'express-validator';
import { JOB_STATUS, JOB_TYPE, JOB_SORT_BY } from "../utils/constants.js";
import Job from "../models/jobModel.js";
import User from "../models/userModel.js";

// const withValidationErrors = (validateValues) => {
//   return [
//     validateValues,
//     (req, res, next) => {
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         const errorMessages = errors.array().map((error) => error.msg);
//         res.status(404).json({errorMessages});
//       }
//       next();
//     },
//   ];
// };

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);

        const firstMessage = errorMessages[0];
        console.log(Object.getPrototypeOf(firstMessage));
        if (errorMessages[0].startsWith("no job")) {
          const error = new Error(errorMessages);
          error.status(404);
          throw error;
        }
        if (errorMessages[0].startsWith("not authorized")) {
          const error = new Error ("not authorized to access this route");
          error.status=401;
          throw error;
        }
        const error = new Error(errorMessages);
        error.status = 400;
        throw error;
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
  body("jobType")
    .isIn(Object.values(JOB_TYPE))
    .withMessage("invalid type value"),
]);



export const validateIdParam = withValidationErrors([
  param("id").custom(async (value, {req}) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) {
      const error = new Error("invalid MongoDB id");
      error.status = 400;
      throw error;
    }
    const job = await Job.findById(value);
    if (!job) {
      const error = new Error(`no job with id : ${value}`);
      error.status = 404;
      throw error;
    }
    const isAdmin = req.user.role === "admin";
    const isOwner = req.user.user.Id === job.createdBy.toString();
    if(!isAdmin && !isOwner) {
      const error = new Error ("Not authorize to access this route.");
      error.status(401);
      throw error;
    }
  }),
]);


export const validateRegisterInput = [
  body("name").notEmpty().withMessage("name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email, { req }) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error("email already exists");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters long"),
  body("location").notEmpty().withMessage("location is required"),
  body("lastName").notEmpty().withMessage("last name is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

import bcrypt from "bcrypt";

export const validateLoginInput = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format"),
  body("password").notEmpty().withMessage("password is required"),
]);


export const validateUpdateUserInput = withValidationErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });
      if (user && user._id.toString() !== req.user.userId) {
        throw new Error("email already exists");
      }
    }),
  body("location").notEmpty().withMessage("location is required"),
  body("lastName").notEmpty().withMessage("last name is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
]);


