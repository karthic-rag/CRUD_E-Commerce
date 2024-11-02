import React from "react";
import { useSearch } from "../../Context/search";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/search/${values.keywords}`
      );
      setValues({ ...values, result: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };
  return (
    <div>
      <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <input
          className="form-control mx-2 "
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={values.keywords}
          onChange={(e) => setValues({ ...values, keywords: e.target.value })}
        />
        <button className="btn btn-outline-success me-5" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
