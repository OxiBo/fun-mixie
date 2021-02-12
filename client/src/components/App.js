import React from "react";
import Header from "./Header";
import Footer from "./Footer"

const App = (props) => {
  return (
    <div className="container">
      <Header />
      {/* <hr/> */}
      <hr className="hr-solid" />
      {props.children}
      <hr className="hr-solid" />
      <Footer />
    </div>
  );
};

export default App;
