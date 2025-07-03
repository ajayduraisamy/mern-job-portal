import express from "express";
import { login, logout, register, updateProfile } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload, uploadProfile} from "../middlewares/mutler.js"; 
import { singleResumeUpload } from "../middlewares/uploadResume.js";
import { multiUpload } from "../middlewares/mutler.js";
const router = express.Router();

router.route("/register").post(uploadProfile.single('file'),register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated, multiUpload, updateProfile);
// router.route("/profile/update").post(isAuthenticated, singleUpload, updateProfile);
// router.route("/profile/update").post(isAuthenticated, singleResumeUpload, updateProfile);

export default router;

