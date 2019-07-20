import React from 'react';

import styled from 'styled-components';

const StyledButton = styled.button`
  width: 100%;
  outline: none;
  padding: 1.2rem 2rem;
  border-radius: 2rem;
  color: #fff;
  font-weight: 700;
  box-shadow: ${({ theme }) => `0rem 0.5rem 3.5rem ${theme.shadow}`};
  background-color: ${({ theme }) => theme.primary_color};
  border: none;
  transition: all 0.2s;
  font-size: 1rem;
  
  &:hover {
    transform: translateY(-3px);
  }

  &:active {
    transform: translateY(2px);
  }

  &:disabled {
    cursor: not-allowed;
    background-color: #333;
  }
`;

const Button = ({ children, disabled, loading, ...rest }) => {
  return (
    <StyledButton disabled={disabled} {...rest}>
      {loading ? loading : children}
    </StyledButton>
  );
}

export default Button;