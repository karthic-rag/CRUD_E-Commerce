import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import Pagenotfound from "./pages/Pagenotfound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import DashBoard from "./pages/User/DashBoard";
import PrivateRoute from "./components/Routes/Private";
import Forgot from "./pages/Auth/forgot";
import AdminPrivateRoute from "./components/Routes/AdminPrivate";
import AdminDashBoard from "./pages/Admin/AdminDashBoard";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import Users from "./pages/Admin/Users";
import Orders from "./pages/User/Orders";
import Products from "./pages/Admin/Products";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import UserSearch from "./pages/UserSearch";
import ProductDetails from "./pages/User/ProductDetails";
import CartPage from "./pages/User/CartPage";
import PaymentForm from "./pages/User/PaymentForm";
import UserOrder from "./pages/Admin/UserOrder";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/product/payment/:slug" element={<PaymentForm />} />
        <Route path="/search" element={<UserSearch />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<DashBoard />} />
          <Route path="user/orders" element={<Orders />} />
        </Route>
        <Route path="/dashboard" element={<AdminPrivateRoute />}>
          <Route path="admin" element={<AdminDashBoard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-products" element={<CreateProduct />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/users-order" element={<UserOrder />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
        </Route>
        <Route path="/forgot-password" element={<Forgot />} />
        <Route path="/register" element={<Register />} />

        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </>
  );
}

export default App;
