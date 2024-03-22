import { Router } from "express";
const router = Router();

import {getAllJobs, getJob, createJob, updateJob, deleteJob,} from "../controllers/jobController.js";
import { validateJobInput, validateIdParam} from "../middleware/validationMiddleware.js";
import { checkForTestUser } from "../middleware/authMiddleware.js";
import { showStats } from "../controllers/jobController.js";

router.route("/").get(getAllJobs).post(checkForTestUser, validateJobInput, createJob);

router.route("/stats").get(showStats); //place stats before the :id

router.route("/:id").get(validateIdParam, getJob).
patch(checkForTestUser, validateJobInput, validateIdParam, updateJob)
.delete(checkForTestUser, validateIdParam, deleteJob);




export default router;
