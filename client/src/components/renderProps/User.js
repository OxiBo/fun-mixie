import React, { useEffect } from "react";
// import { connect } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
// action creators
import { fetchUser } from "../../actions";
// import { FETCH_USER } from '../..actions/types'
// const User = ({ user, error, children, fetchUser }) => {
const User = ({ children }) => {
  const dispatch = useDispatch();
  const { user, authError } = useSelector((state) => { 
    return state.auth});

  useEffect(() => {
    dispatch(fetchUser());
    
  }, [ dispatch ]);


  // return <>{children({ user, error })}</>;
  return <>{children({ user, authError })}</>;
};

// const mapStateToProps = ({ auth: { user, error } }) => {
//   return {
//     user,
//     error,
//   };
// };

//export default connect(mapStateToProps, { fetchUser })(User);
export default User;
