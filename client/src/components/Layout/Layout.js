import React from "react";
import { Helmet } from "react-helmet";
import Footer from "./Footer";
import Header from "./Header";
import { Toaster } from "react-hot-toast";

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
        <meta charset="UTF-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "70vh" }}>{children}</main>
      <Toaster />
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "Shopiko",
  description: "mern stack project",
  keywords: "mern,react,node,mongodb,express",
  author: "Karthic Ragunath",
};

export default Layout;
