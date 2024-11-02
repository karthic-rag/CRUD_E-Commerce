import React from "react";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../Context/search";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/Cart";
import toast from "react-hot-toast";

const UserSearch = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [values, setValues] = useSearch();
  const srcPath = "/images/";
  return (
    <Layout title={"search Results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values?.result.length < 1
              ? "No Products found"
              : `Found ${values.result.length}`}
          </h6>
          <div className="d-flex flex-wrap justify-content-around">
            {values?.result.map((p) => (
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

export default UserSearch;
