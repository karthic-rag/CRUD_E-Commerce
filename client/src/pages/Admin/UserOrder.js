import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import moment from "moment";
import AdminMenu from "../../components/Layout/AdminMenu";

const UserOrder = () => {
  const [orderPlace, setOrderPlace] = useState([]);
  const srcPath = "/images/";

  //get orders
  const OrdersPlaced = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-orders`
      );

      if (data?.success) {
        setOrderPlace(data.product);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    OrdersPlaced();
    //eslint-disable-next-line
  }, []);
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>all orders</h1>
            <div className="border shadow p-3" style={{ maxWidth: "1000px" }}>
              <table className="table" id="order">
                <thead>
                  <tr>
                    <th scope="col">S.No</th>
                    <th scope="col">Product</th>
                    <th scope="col">Name</th>
                    <th scope="col">Date</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                {orderPlace.map((e, i) => (
                  <tbody key={e._id}>
                    <>
                      {e.products.map((p) => (
                        <tr key={p._id}>
                          <td scope="row">{i + 1}</td>
                          <td>
                            <img src={srcPath + p.photoname} width={100} />
                          </td>
                          <td scope="row">{p.name}</td>
                          <td scope="row"> {moment(e.createdAt).fromNow()}</td>
                          <td>{e.status}</td>
                        </tr>
                      ))}
                    </>
                  </tbody>
                ))}
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserOrder;
