import mongoose from "mongoose";
import { body, validationResult } from "express-validator";
import { param } from 'express-validator';
import { JOB_STATUS, JOB_TYPE, JOB_SORT_BY } from "../utils/constants.js";
import Job from "../models/jobModel.js";
import User from "../models/userModel.js";

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
      error.status = 400;
      throw error;
    }
    const job = await Job.findById(value);
    if (!job) {
      const error = new Error(`no job with id : ${value}`);
      error.status = 404;
      throw error;
    }
  }),
]);

// export const validateRegisterInput = withValidationErrors([
//   body("name").notEmpty().withMessage("name is required"),
//   body("email")
//     .notEmpty()
//     .withMessage("email is required")
//     .isEmail()
//     .withMessage("invalid email format")
//     .custom(async (email) => {
//       const user = await User.findOne({ email });
//       if (user) {
//         const error= new Error("email already exists");
//         error.status=400;
//         throw error
//       }
//     }),
//   body("password")
//     .notEmpty()
//     .withMessage("password is required")
//     .isLength({ min: 8 })
//     .withMessage("password must be at least 8 characters long"),
//   body("location").notEmpty().withMessage("location is required"),
//   body("lastName").notEmpty().withMessage("last name is required"),
// ]);




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

export const validateLoginInput = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),
  body("password").notEmpty().withMessage("Password is required"),
  async (req, res, next) => {
    const errors = validationResult(req);

    // Verificarea dacă există erori de validare
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;

      // Căutarea utilizatorului în baza de date
      const existingUser = await User.findOne({ email });

      // Verificarea dacă utilizatorul există
      if (!existingUser) {
        return res.status(404).json({ error: "Email does not exist" });
      }

      // Verificarea parolei
      const passwordMatch = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (!passwordMatch) {
        return res.status(401).json({ error: "Incorrect password" });
      }

      // Dacă totul este în regulă, continuăm cu următoarea etapă
      next();
    } catch (error) {
      console.error("Login validation error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
];


