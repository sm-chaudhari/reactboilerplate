import React from 'react';

import { connect } from 'react-redux';

import * as actions from '../../store/actions/auth/authActions'

const Signout = ({ signOut }) => {
  signOut();
  return <></>;
}

const mapDispatchToProps = {
  signOut: actions.signOut
}


export default connect(null, mapDispatchToProps)(Signout);