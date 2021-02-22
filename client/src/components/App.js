import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const App = (props) => {
  return (
    <div className="container">
      <Header />
      {/* <hr/> */}
      <hr className="hr-solid" />
      <main className="main">{props.children}</main>
      <hr className="hr-solid" />
      <Footer />
    </div>
  );
};

export default App;
