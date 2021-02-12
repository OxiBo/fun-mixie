import React from "react";
import { Link } from "react-router-dom";

import Search from "./Search";
import SearchWithAutocomplete from "./SearchWithAutocomplete";
import Navigation from "./Navigation";

const Header = () => {

  return (
    <div className="header">
      <div className="brand"><Link to="/" className="brand__link">Brand</Link></div>
      {/* <Search /> */}
      <SearchWithAutocomplete />
      <Navigation />
    </div>
  );
};

export default Header;
