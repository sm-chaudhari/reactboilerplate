import React from 'react';
import styled, { css } from "styled-components";

const baseStyle = css`
  color: ${({ color, theme }) => (color === 'white' ? '#fff' : theme.primary_color)};
  font-weight: ${({ bold }) => (bold ? '700' : '300')};
  margin-top: 0;
  margin-bottom: ${(({ noMargin }) => (noMargin ? '0rem' : '1rem'))};
`;

const Heading1 = styled.h1`
  font-size: 2rem;
  ${baseStyle} 
`;

const Heading2 = styled.h2`
  font-size: 1.8rem;
  ${baseStyle} 
`;

const Heading3 = styled.h3`
  font-size: 1.5rem;
  ${baseStyle} 
`;

const Heading4 = styled.h4`
  font-size: 1.3rem;
  ${baseStyle} 
`;

const Heading = ({ children, color, noMargin, size, bold }) => {

  switch (size) {
    case 'h1':
      return (
        <Heading1 color={color} noMargin={noMargin} bold={bold}>
          {children}
        </Heading1>
      );
    case 'h2':
      return (
        <Heading2 color={color} noMargin={noMargin} bold={bold}>
          {children}
        </Heading2>
      );
    case 'h3':
      return (
        <Heading3 color={color} noMargin={noMargin} bold={bold}>
          {children}
        </Heading3>
      );
    case 'h4':
      return (
        <Heading4 color={color} noMargin={noMargin} bold={bold}>
          {children}
        </Heading4>
      );

    default:
      return (
        <Heading4 color={color} noMargin={noMargin} bold={bold}>
          {children}
        </Heading4>
      );
  }
}

export default Heading;