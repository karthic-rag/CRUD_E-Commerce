import React, { useEffect, useState } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Checkbox, Radio } from "antd";
import { Price } from "../components/Price";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/Cart";

const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const srcPath = "/images/";
  const [checked, setCheck] = useState([]);
  const [radio, setRadio] = useState([]);

  //get products
  const getallProducts = async (req, res) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product`
      );
      if (data?.success) {
        setProducts(data?.products);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getallProducts();
  }, [checked.length, radio.length]);
  //get all cate
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );

      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getAllCategory();
    // eslint-disable-next-line
  }, []);

  //get filtered products
  const filteredProduct = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/product-filter`,
        { checked, radio }
      );
      console.log(data.products);
      if (data?.success) {
        setProducts(data?.products);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    if (checked.length || radio.length) filteredProduct();
    // eslint-disable-next-line
  }, [checked, radio]);

  //filter
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setCheck(all);
  };
  return (
    <Layout title={"Shopiko - shop now"}>
      <div>
        <img
          src="/images/banner.jpg"
          alt="banner img"
          style={{ width: "100vw" }}
        />
      </div>
      <div className="row m-3">
        <div className="col-2">
          <h4 className="text-center">Filter By Category</h4>
          <div className="d-flex flex-column">
            {categories.map((e) => (
              <Checkbox
                key={e._id}
                onChange={(c) => handleFilter(c.target.checked, e._id)}
              >
                {e.name}
              </Checkbox>
            ))}
          </div>
          <h4 className="text-center mt-4">Filter By Price</h4>
          <div className="d-flex flex-column">
            <Radio.Group
              className="d-flex flex-column"
              onChange={(e) => setRadio(e.target.value)}
            >
              {Price?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
        </div>
        <div className="col-10">
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap justify-content-around">
            {products?.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={srcPath + p.photoname}
                  alt="product_photo"
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text">₹{p.price}</p>
                  <button
                    className="btn btn-primary ms-1"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                  <button
                    className="btn btn-secondary ms-1 "
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      toast.success("Item added to cart");
                    }}
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
