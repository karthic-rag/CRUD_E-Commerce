import React from "react";
import Layout from "../../components/Layout/Layout";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [answer, setanswer] = useState("");

  const navigate = useNavigate();

  //form default prevention
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/forgot-pass`,
        { email, newPassword, answer }
      );
      if (res.data.success) {
        toast.success(res.data.message);

        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout title={"Forgot Password - Shopiko"}>
      <div className="backColor-1">
        <div className="login">
          <h1>RESET PASSWORD</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail" className="form-label">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                id="exampleInputEmail1"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail" className="form-label">
                How is your best friend?
              </label>
              <input
                type="text"
                value={answer}
                onChange={(e) => setanswer(e.target.value)}
                className="form-control"
                id="exampleInputanswer"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setnewPassword(e.target.value)}
                className="form-control"
                id="exampleInputPassword1"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Reset
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Forgot;
