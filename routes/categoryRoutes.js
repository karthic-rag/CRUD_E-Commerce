import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  categoryController,
  createCategoryController,
  deleteController,
  singleCategoryController,
  updatecategory,
} from "../controllers/categoryContoller.js";

const router = express.Router();

//routes
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

//
router.put("/update-category/:id", requireSignIn, isAdmin, updatecategory);

//get all category
router.get("/get-category", categoryController);

//single category
router.get("/single-category/:slug", singleCategoryController);

//delete
router.delete("/delete-category/:id", requireSignIn, isAdmin, deleteController);

export default router;
