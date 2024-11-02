import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../../Context/Cart";

const ProductDetails = () => {
  const params = useParams();
  const [cart, setCart] = useCart();
  const srcPath = "/images/";
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photoname, setPhotoname] = useState("");
  const [prodata, setProdata] = useState([]);

  //GET SINGLE
  const singleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/gets-product/${params.slug}`
      );
      console.log(data);
      if (data?.success) {
        setName(data?.products[0].name);
        setPrice(data?.products[0].price);
        setDescription(data?.products[0].description);
        setQuantity(data?.products[0].quantity);
        setShipping(data?.products[0].shipping);
        setCategory(data?.products[0].category);
        setPhotoname(data?.products[0].photoname);
        setProdata(data?.products[0]);
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
  return (
    <Layout>
      <div className="row w-75 m-3">
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
          <h4>Description : {description}</h4>
          <h4>Price : ₹{price}</h4>
          <h4>Category : {category.name}</h4>
          <h4>Shipping : {shipping ? "Yes" : "No"}</h4>
          <h4>Quantity in available : {quantity}</h4>
          <button
            className="btn btn-secondary ms-1"
            onClick={() => {
              setCart([...cart, prodata]);
              localStorage.setItem("cart", JSON.stringify([...cart, prodata]));
              toast.success("Item added to cart");
            }}
          >
            ADD TO CART
          </button>
          <button
            className="btn btn-warning ms-3"
            onClick={() => navigate(`/product/payment/${params.slug}`)}
          >
            BUY NOW
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
