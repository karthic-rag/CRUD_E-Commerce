import userModel from "../models/userModel.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).send({
      success: true,
      message: " users get successfully",
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error in getting users",
    });
  }
};
