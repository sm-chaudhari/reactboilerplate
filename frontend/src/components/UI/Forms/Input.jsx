import React from 'react';

import styled from 'styled-components';

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  margin-bottom: 3.5rem;
  flex-direction: column;

  &:last-of-type {
    margin-bottom: 4.5rem;
  }
`;

const StyledInput = styled.input`
  padding: 1rem 2rem;
  width:100%;
  outline: none;
  font-weight: 500;
  font-size: 1.2rem;
  border-radius: 2rem; 
  box-sizing: border-box;
  border: none;
  box-shadow: ${({ theme }) => `0rem 0.5rem 3.5rem ${theme.shadow}`};

  &::placeholder {
    color: #ddd;
  }
`;

const Error = styled.div`
  color: ${({ theme }) => theme.error_color};
  visibility: ${({ show }) => (show ? 'visible' : 'hidden')};
  opacity: ${({ show }) => (show ? '1' : '0')};
  transform: translateY(${({ show }) => (show ? '20px' : '10px')});
  transition: all 0.1s;
  position: absolute;
  bottom: -0.25rem;
  left: 0;
  padding: 0rem 1rem;
  font-weight: 500;
  font-size: 1.2rem;
`;

const Input = ({ field, form: { touched, errors }, ...props }) => {
  return (
    <InputWrapper>
      <StyledInput {...field} {...props} />
      <Error show={errors[field.name] && touched[field.name]}>{errors[field.name]}</Error>
    </InputWrapper>
  );
}

export default Input;