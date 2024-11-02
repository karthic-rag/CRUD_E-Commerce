// src/PaymentForm.js
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../Context/auth";

const PaymentForm = () => {
  const [Order, setOrder] = useState("");
  const [auth, setAuth] = useAuth();
  const [orderPrice, setOrderPrice] = useState("");
  const params = useParams();
  const srcPath = "/images/";
  const [useraddress, setUserAddress] = useState("");
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photoname, setPhotoname] = useState("");
  const [cart, setProdata] = useState([]);

  useEffect(() => {
    setOrderPrice(Order * price);
  }, [Order]);

  //GET SINGLE
  const singleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/gets-product/${params.slug}`
      );
      if (data?.success) {
        setName(data?.products[0].name);
        setPrice(data?.products[0].price);
        setQuantity(data?.products[0].quantity);
        setShipping(data?.products[0].shipping);
        setPhotoname(data?.products[0].photoname);
        setProdata(data.products);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    singleProduct();
    //eslint-disable-next-line
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.target.reset();

    try {
      await axios.post(`${process.env.REACT_APP_API}/api/v1/product/orders`, [
        cart,
        auth,
        { useraddress },
      ]);

      setOrderPrice("");
      localStorage.removeItem("cart");
      toast.success("Payment Success");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="m-3">
        <div className="container w-50">
          <h1 className="text-center">Orders Summary</h1>
          <div className="row  m-3">
            <div className="col-md-6">
              <img
                src={srcPath + photoname}
                alt="product_photo"
                className="card-img-top"
              />
            </div>
            <div className="col-md-6 ">
              <h1 className="text-center">Product Details</h1>
              <h4>Name : {name}</h4>

              <h4>Price : ₹{price}</h4>

              <h4>Shipping : {shipping ? "Yes" : "No"}</h4>
              <h4>Quantity in available : {quantity}</h4>
            </div>
          </div>
        </div>
        <div className="container mt-5 w-50">
          <h2 className="mb-4">Payment Details</h2>
          <form onSubmit={handleSubmit} className="form-group">
            <h4 htmlFor="cardNumber mb-3">Total Amount : {orderPrice}</h4>
            <label htmlFor="cardNumber mb-3">Quantity </label>
            <input
              type="Number"
              className="form-control mb-3"
              id="cardNumber"
              placeholder="Enter Quantity"
              onChange={(e) => setOrder(e.target.value)}
              required
            />

            <label htmlFor="cardNumber">Card Number</label>
            <input
              type="text"
              className="form-control mb-3"
              id="cardNumber"
              placeholder="Enter card number"
              required
            />

            <label htmlFor="expiryDate">Expiry Date (MM/YY)</label>
            <input
              type="text"
              className="form-control mb-3"
              id="expiryDate"
              placeholder="MM/YY"
              required
            />

            <label htmlFor="cvv">CVV</label>
            <input
              type="text"
              className="form-control mb-4"
              id="cvv"
              placeholder="CVV"
              required
            />

            <label htmlFor="cardNumber mb-3">Address to Delivery</label>
            <textarea
              type="text"
              className="form-control mb-3"
              placeholder="Enter Address"
              onChange={(e) => setUserAddress(e.target.value)}
              required
            />

            <button type="submit" className="btn btn-primary">
              Confirm Order
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default PaymentForm;
