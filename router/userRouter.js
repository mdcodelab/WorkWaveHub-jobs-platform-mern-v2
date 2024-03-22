import { Router } from "express";
const router = Router();
import { validateUpdateUserInput } from "../middleware/validationMiddleware.js";
import { authorizePermissions, checkForTestUser} from "../middleware/authMiddleware.js";

import { getCurrentUser, getApplicationStats, updateUser } from "../controllers/userController.js";
import upload from "../middleware/multer.js";

router.get("/current-user", getCurrentUser);
router.get("/admin/app-stats", authorizePermissions("admin"), getApplicationStats);
router.patch("/update-user", checkForTestUser, upload.single("avatar"), 
validateUpdateUserInput, updateUser); //the name in the form data

export default router;

