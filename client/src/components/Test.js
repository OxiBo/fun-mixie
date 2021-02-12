import React from "react";
import User from "./renderProps/User";
const Test = () => {
  return (
    <User>
      {({ user, error }) => {
        return <div>test {user.name}</div>;
      }}
    </User>
  );
};

export default Test;
