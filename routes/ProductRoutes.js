import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createProductController,
  deleteImage,
  deleteProductController,
  getOrdersController,
  getProductController,
  getSingleProductController,
  ordersController,
  ProductFilter,
  searchController,
  UpdateProductController,
} from "../controllers/productController.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

//routes
router.post(
  "/create-product",
  upload.single("image"),
  requireSignIn,
  isAdmin,
  createProductController
);

//routes
router.put(
  "/update-product/:id",
  upload.single("image"),
  requireSignIn,
  isAdmin,
  UpdateProductController
);

//get products
router.get("/get-product", getProductController);

//get single product
router.get("/gets-product/:slug", getSingleProductController);

//delete product
router.delete(
  "/delete-product/:pid",
  requireSignIn,
  isAdmin,
  deleteProductController
);

//delete image from local folder
router.delete("/delete-image/:image", requireSignIn, isAdmin, deleteImage);

//filter product
router.post("/product-filter", ProductFilter);

//search products
router.get("/search/:keywords", searchController);

//post order
router.post("/orders", ordersController);

//get orders
router.get("/get-orders", getOrdersController);

export default router;
