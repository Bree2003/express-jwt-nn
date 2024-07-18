import { Router } from "express";
import authController from "../controllers/authController.js";

const router = Router();

router.get("/signup", authController.signupGET);
router.post("/signup", authController.signupPOST);
router.get("/login", authController.loginGET);
router.post("/login", authController.loginPOST);
router.get("/logout", authController.logoutGET);

export default router;
