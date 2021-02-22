import React from "react";

// import PropTypes from 'prop-types';

// const ErrorStyles = styled.div`
//   padding: 1.5rem;
//   background: white;
//   margin: 1.5rem 0;
//   border: 1px solid rgba(0, 0, 0, 0.05);
//   border-left: 5px solid ${props => props.theme.purpleLight};
//   p {
//     margin: 0;
//     font-weight: 100;
//   }
//   strong {
//     margin-right: 1rem;
//   }
// `;

const ErrorMessage = ({ error }) => {
  if (!error) return null;
  
  return (
    <div className="error">
      <p className="error-message">
        {/* <strong>Shoot!</strong> */}
        {error}
      </p>
    </div>
  );
};

export default ErrorMessage;
