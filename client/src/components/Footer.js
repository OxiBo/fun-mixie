import React from "react";

const Footer = () => {
  return (
    <div className="footer">
      <p className="footer__copyright">
        Built by
        <a href="https://github.com/OxiBo" className="footer__link">
          OxiBo
        </a>
        . Copyright &copy; by OxiBo. Inspired by{" "}
        <a
          href="https://www.udemy.com/user/jonasschmedtmann/"
          className="footer__link"
        >
          Jonas Schmedtmann
        </a>{" "}
        , teacher from
        <a href="https://www.udemy.com/" className="footer__link">
          Udemy
        </a>{" "}
        .
      </p>
    </div>
  );
};

export default Footer;


