import React from 'react';

import styled from 'styled-components';

import Navbar from '../../components/Navigation/Navbar';

const MainWrapper = styled.div`
  width:100%;
  min-height: calc(100vh - 3.75rem);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Layout = ({ children }) => {
 return (
    <>
      <Navbar />
      <MainWrapper>
        {children}
      </MainWrapper>
    </>
  );
}

export default Layout;