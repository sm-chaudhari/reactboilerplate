import React from 'react';

import { Route, Redirect } from 'react-router-dom';

import { connect } from 'react-redux'

const PrivateRoute = ({ component: Component, token, ...rest }) => {
  const isLogin = token !== null && token.trim() ? true : false;
  
  return (
    <Route {...rest} render={props => (
      isLogin ?
        <Component {...props} />
        :
        <Redirect to="/signin" />
    )} />
  );
};

const mapStateToProps = (state) => ({
  token: state.auth.token
})

export default connect(mapStateToProps)(PrivateRoute);