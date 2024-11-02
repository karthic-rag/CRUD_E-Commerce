import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useCart } from "../../Context/Cart";
import { useAuth } from "../../Context/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import toast from "react-hot-toast";

const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const srcPath = "/images/";
  const navigate = useNavigate();
  const [useraddress, setUserAddress] = useState("");
  const [show, setShow] = useState(false);

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };

  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.target.reset();
    try {
      await axios.post(`${process.env.REACT_APP_API}/api/v1/product/orders`, [
        cart,
        auth,
        { useraddress },
      ]);
      localStorage.removeItem("cart");
      toast.success("Payment Success");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  //delete item
  const removeCartItem = (id) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === id);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2">{`Hello ${
              auth?.token && auth?.user?.name
            }`}</h1>
            <h6 className="text-center">
              {cart?.length > 1
                ? `You Have ${cart.length} items in your cart ${
                    auth?.token ? "" : "Please login to checkout"
                  }`
                : "Your Cart is empty"}
            </h6>
          </div>
        </div>
        <div className="row ">
          <div className="col-md-8 ">
            {cart?.map((p) => (
              <div className="row m-2 card flex-row">
                <div className="col-md-4">
                  <img
                    src={srcPath + p.photoname}
                    alt="product_photo"
                    className="card-img-top m-2"
                    height="200"
                  />
                </div>
                <div className="col-md-8 mt-2">
                  <h4>{p.name}</h4>
                  <p>{p.description.substring(0, 30)}...</p>
                  <p>Price : ₹{p.price}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeCartItem(p._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4 text-center ">
            <h4>Cart Summay</h4>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4>Total : {totalPrice()}</h4>
            {auth?.user ? (
              <div className="mb-3">
                <h4>Current Address</h4>
                <h5>{auth?.user?.adddress}</h5>
                <button
                  onClick={() => setShow(true)}
                  className="btn btn-warning"
                >
                  Checkout
                </button>
              </div>
            ) : (
              <button
                className="btn btn-outline-warning"
                onClick={() => navigate("/login")}
              >
                Please Login to Checkout
              </button>
            )}

            {show && (
              <form onSubmit={handleSubmit} className="form-group">
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
            )}
            <div className="mt-2"></div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
