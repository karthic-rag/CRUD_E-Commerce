import { useState, useEffect } from "react";
import { useAuth } from "../../Context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function PrivateRoute() {
  const [watch, setWatch] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/user-auth`
      );
      if (res.data.watch) {
        setWatch(true);
      } else {
        setWatch(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return watch ? <Outlet /> : <Spinner />;
}
