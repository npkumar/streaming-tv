import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ width: "100%", padding: "1rem" }}>
      <Link to="/" style={{ color: "#ffe300", textDecoration: "none" }}>
        Streaming TV
      </Link>
    </nav>
  );
};

export default Navbar;
