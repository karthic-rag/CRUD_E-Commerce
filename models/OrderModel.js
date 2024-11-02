import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    products: {
      type: Object,
      required: true,
    },
    payment: {
      type: String,
      enum: ["Payment Success", "Payment Not Success"],
      default: "Payment Success",
    },
    buyer: {
      type: Object,
      required: true,
    },
    address: {
      type: String,
    },
    status: {
      type: String,
      enum: [
        "Not Processing",
        "Processing",
        "Shipping",
        "Out for delivery",
        "Deliveried",
      ],
      default: "Not Processing",
    },
  },
  { timestamps: true }
);

export default mongoose.model("orders", OrderSchema);
