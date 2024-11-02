import { useState } from "react";
import React from "react";
import axios from "axios";
import Layout from "../../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  //form default prevention
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        { name, email, password, phone, address, answer }
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
    <Layout title={"Register - Shopiko"}>
      <div className="backColor">
        <div className="register">
          <h1>REGISTER FORM</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputName" className="form-label">
                Name
              </label>
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                className="form-control"
                id="exampleInputName"
                value={name}
                required
              />
            </div>
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
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                id="exampleInputPassword1"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPhone" className="form-label">
                Phone
              </label>
              <input
                type="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="form-control"
                id="exampleInputPhone"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputAddress" className="form-label">
                Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="form-control"
                id="exampleInputAddress"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputAddress" className="form-label">
                How is your best friend?
              </label>
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="form-control"
                id="exampleInputAddress"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              register
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
