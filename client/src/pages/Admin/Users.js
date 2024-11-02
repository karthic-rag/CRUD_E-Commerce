import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";

const Users = () => {
  const [users, setUsers] = useState([]);

  //get all users
  const getallUsers = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/admin/all-users`
      );

      if (data?.success) {
        setUsers(data?.users);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getallUsers();
    // eslint-disable-next-line
  }, []);
  return (
    <Layout title={"Users - Shopiko"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>all Users</h1>
            <div className="border shadow p-3" style={{ maxWidth: "1000px" }}>
              <table className="table" id="order">
                <thead>
                  <tr>
                    <th scope="col">S.No</th>
                    <th scope="col">User Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                  </tr>
                </thead>
                {users?.map((e, i) => (
                  <tbody key={e._id}>
                    <tr>
                      <td scope="row">{i + 1}</td>
                      <td>{e.name}</td>
                      <td>{e.email}</td>
                      <td>{e.phone}</td>
                    </tr>
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

export default Users;
