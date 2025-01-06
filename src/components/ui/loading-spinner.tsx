import React from 'react';
import styled from 'styled-components';

const LoadingSpinner = styled.div`
display: inline-block;
  border: 2px solid #f3f3f3; /* Light grey */
  border-top: 2px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 14px;
  height: 14px;
  animation: spin 2s linear infinite;
  margin: 0 5px;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingSpinnerComponent: React.FC = () => {
  return <LoadingSpinner />;
};

export default LoadingSpinnerComponent;