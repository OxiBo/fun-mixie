// import React from "react";
import { useState } from "react";



function useForm(initial) {
  console.log(initial);
  let [inputs, setInputs] = useState(initial);

  function handleChange(e) {
    // console.log(e.target.type);
    let { name, type, value } = e.target;
    console.log(type, name, value);

    if (type === "number") {
      value = parseInt(value);
    }

    setInputs({ ...inputs, [name]: value });
  }
  return {
    inputs,
    handleChange,
  };
}

export default useForm;
