import React from 'react'

import { NavLink } from 'react-router-dom';

import { Container } from '../../hoc/layout/elements.jsx/elements';

import styled from 'styled-components';

import { connect } from 'react-redux'

const MainWrapper = styled.div`
  background-color: ${({ theme }) => theme.primary_color};
  height: 3.75rem;
  color: #fff;
`;

const NavItemsWrapper = styled.div`
  flex-grow: 1;
  margin: 0 2rem 0 2rem;
  padding: 0;
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: flex-end;

  a {
    text-decoration: none;
    margin-right: 0.75rem;
    color: inherit;
  }

  a.active {
    font-weight: 700;
  }

  a:last-child {
    margin-right: 0;
  }
`;

const Navbar = ({ loggedIn }) => {
  const PUBLIC = [
    {
      name: 'Sign in',
      url: '/signin'
    },
    {
      name: 'Sign up',
      url: '/signup'
    }
  ]

  const PRIVATE = [
    {
      name: 'Home',
      url: '/'
    },
    {
      name: 'Sign out',
      url: '/signout'
    }
  ]

  let nav_routes = loggedIn ? PRIVATE : PUBLIC;

  return (
    <MainWrapper>
      <Container>
        <NavItemsWrapper>
          {nav_routes.map((navItem, id) =>
            <NavLink key={id} to={navItem.url}>{navItem.name}</NavLink>
          )}
        </NavItemsWrapper>
      </Container>
    </MainWrapper>
  )
}

const mapStateToProps = ({ auth }) => ({
  loggedIn: auth.token !== null && auth.token.trim() ? true : false
})

export default connect(mapStateToProps)(Navbar);
