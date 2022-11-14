import React from "react";
import { useDispatch } from "react-redux";

const ButtonClear = ({ action }) => {
  const dispatch = useDispatch();
  //  console.log(props)
  return (
    <button className="btn button-clear" onClick={() => dispatch(action())}>
      clear
    </button>
  );
};

export default ButtonClear;



