import slugify from "slugify";
import Productmodel from "../models/Productmodel.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import OrderModel from "../models/OrderModel.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//payment gateway

//create
export const createProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } = req.body;
    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "name is required" });

      case !description:
        return res.status(500).send({ error: "Description  is required" });
      case !price:
        return res.status(500).send({ error: "price is required" });
      case !category:
        return res.status(500).send({ error: "category is required" });
      case !quantity:
        return res.status(500).send({ error: "quantity is required" });
    }
    const products = new Productmodel({
      name,
      slug: slugify(name),
      description,
      price,
      category,
      quantity,
      shipping,
      photoname: req.file.filename,
      photo: req.file.path,
    });
    await products.save();
    res.status(201).send({
      success: true,
      message: " Product created successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error in creating product",
    });
  }
};

//get product
export const getProductController = async (req, res) => {
  try {
    const products = await Productmodel.find({})
      .populate("category")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      countTotal: products.length,
      message: " Products get successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error in getting product",
    });
  }
};

//get single product
export const getSingleProductController = async (req, res) => {
  try {
    const products = await Productmodel.find({
      slug: req.params.slug,
    })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: " Product get successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error in getting product",
    });
  }
};

//delete product
export const deleteProductController = async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await Productmodel.findByIdAndDelete(pid);
    res.status(200).send({
      success: true,
      message: " product deleted successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error in deleting product",
    });
  }
};

//delete image from local folder
export const deleteImage = async (req, res) => {
  try {
    const filename = req.params.image;
    const filepath = path.join(
      __dirname,
      "..",
      "client",
      "public",
      "images",
      filename
    );

    fs.unlinkSync(filepath, (err) => {
      if (err) {
        return res.status(500);
      } else {
        res.status(200).send({
          success: true,
          message: " image deleted from folder successfully",
        });
      }
    });
    res.status(200).send({
      success: true,
      message: " image deleted from folder successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error in deleting image",
    });
  }
};

//update product
export const UpdateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } = req.body;
    //validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "name is required" });
      case !description:
        return res.status(500).send({ error: "Description  is required" });
      case !price:
        return res.status(500).send({ error: "price is required" });
      case !category:
        return res.status(500).send({ error: "category is required" });
      case !quantity:
        return res.status(500).send({ error: "quantity is required" });
    }
    const product = await Productmodel.findByIdAndUpdate(req.params.id, {
      name,
      slug: slugify(name),
      description,
      price,
      category,
      quantity,
      shipping,
      photoname: req.file.filename,
      photo: req.file.path,
    });
    await product.save();
    res.status(201).send({
      success: true,
      message: " Product created successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error in creating product",
    });
  }
};

// filter

export const ProductFilter = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };
    const products = await Productmodel.find(args);
    res.status(201).send({
      success: true,
      message: " filtered Product get successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "error in filtering product",
    });
  }
};

//search product
export const searchController = async (req, res) => {
  try {
    const { keywords } = req.params;
    const result = await Productmodel.find({
      $or: [
        { name: { $regex: keywords, $options: "i" } },
        { description: { $regex: keywords, $options: "i" } },
      ],
    }).select("-photo");
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "error in searching product",
    });
  }
};

//order post
export const ordersController = async (req, res) => {
  try {
    const [cart, auth, { useraddress }] = req.body;
    const product = OrderModel.insertMany({
      products: cart,
      buyer: auth,
      address: useraddress,
    });
    res.status(201).send({
      success: true,
      message: " order created successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "error in creating order",
    });
  }
};
//get orders
export const getOrdersController = async (req, res) => {
  try {
    const product = await OrderModel.find({});
    res.status(201).send({
      success: true,
      message: "orders get successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "error in get ordres",
    });
  }
};
