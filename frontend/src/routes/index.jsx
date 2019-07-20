import React, { lazy, Suspense } from 'react';

import { Switch, Route } from "react-router-dom";

// Private route guard 
import PrivateRoute from '../components/PrivateRoute';

import Layout from '../hoc/layout/Layout';

import Loader from '../components/Loader/Loader';


import styled from 'styled-components';

// Public component
const Signin = lazy(() => import('../views/auth/signin'));
const Signup = lazy(() => import('../views/auth/signup'));
const Signout = lazy(() => import('../views/auth/signout'));

// Private route
const Home = lazy(() => import('../views/home'));

const PUBLIC_ROUTES = [
  {
    component: Signin,
    url: '/signin',
    exact: true
  },
  {
    component: Signup,
    url: '/signup',
    exact: true
  }
]

const PRIVATE_ROUTES = [
  {
    component: Home,
    url: '/',
    exact: true
  },
  {
    component: Signout,
    url: '/signout',
    exact: true
  }
]


const LoaderWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display:flex;
  align-items: center;
  justify-content: center;
`;

const Routes = () => {
  const render_public_route = [];
  const render_private_route = [];

  PUBLIC_ROUTES.map((route, key) =>
    render_public_route.push(<Route path={route.url} key={route.url + key} component={route.component} exact={route.exact} />)
  )

  PRIVATE_ROUTES.map((route, key) =>
    render_private_route.push(<PrivateRoute path={route.url} key={route.url + key} component={route.component} exact={route.exact} />)
  )

  return (
    <Switch>
      <Suspense fallback={<LoaderWrapper><Loader /></LoaderWrapper>}>
        <Layout>
          {render_public_route}
          {render_private_route}
        </Layout>
      </Suspense>
    </Switch>
  );
}

export default Routes;