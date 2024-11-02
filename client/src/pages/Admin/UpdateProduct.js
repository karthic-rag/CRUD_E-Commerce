import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";

const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [id, setId] = useState("");
  const [photoname, setPhotoname] = useState("");
  //GET SINGLE
  const singleProduct = async (req, res) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/gets-product/${params.slug}`
      );
      if (data?.success) {
        setName(data?.products[0].name);
        setPrice(data?.products[0].price);
        setDescription(data?.products[0].description);
        setQuantity(data?.products[0].quantity);
        setShipping(data?.products[0].shipping);
        setId(data?.products[0]._id);
        setCategory(data?.products[0].category);
        setPhotoname(data?.products[0].photoname);
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
  }, []);

  //update product
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("category", category);
      productData.append("price", price);
      productData.append("description", description);
      productData.append("shipping", shipping);
      productData.append("quantity", quantity);
      productData.append("image", image);

      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/product/update-product/${id}`,
        productData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (data?.success) {
        toast.success(`new product is created`);
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  //delete product
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      let answer = window.prompt("Are you sure to delete ?");
      if (!answer) return;

      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/product/delete-product/${id}`
      );
      if (data?.success) {
        await axios.delete(
          `${process.env.REACT_APP_API}/api/v1/product/delete-image/${photoname}`
        );
        toast.success(` product is deleted`);
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <Layout title={"Craete Product"}>
      <div className="container-fluid m-3 p-3 ">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <form
            className="col-md-9"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <h1>Update product</h1>
            <div className="m-1 w-75">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3 "
                onChange={(value) => {
                  setCategory(value);
                }}
                value={category.name}
              >
                {categories?.map((e) => (
                  <Option key={e._id} value={e._id}>
                    {e.name}
                  </Option>
                ))}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {image ? image.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    hidden
                  />
                </label>
                <div className="mt-3">
                  {image && (
                    <div className="text-center">
                      <img
                        src={URL.createObjectURL(image)}
                        alt="ptoduct_photo"
                        height={"200px"}
                        className="img img-responsive"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="mb-3">
                <input
                  name="productname"
                  type="text"
                  value={name}
                  placeholder="Enter a name"
                  className="form-control"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="Enter a description"
                  className="form-control pb-5"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="Enter a Price"
                  className="form-control "
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="Enter a quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select Shipping"
                  size="large"
                  showSearch
                  className="form-select mb-3 "
                  onChange={(value) => {
                    setShipping(value);
                  }}
                  value={shipping ? "Yes" : "No"}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" type="submit">
                  UPDATE PRODUCT
                </button>
                <button className="btn btn-danger m-3" onClick={handleDelete}>
                  DELETE PRODUCT
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
