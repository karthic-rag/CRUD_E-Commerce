import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { getAllUsers } from "../controllers/OrdersContoller.js";

//router object
const router = express.Router();

//get users
router.get("/all-users", requireSignIn, isAdmin, getAllUsers);

export default router;
