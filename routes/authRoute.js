import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

//test routes
router.get("/test", requireSignIn, isAdmin, testController);

//forgot password
router.post("/forgot-pass", forgotPasswordController);

//proteced route
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ watch: true });
});

//proteced route
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ watch: true });
});

export default router;
