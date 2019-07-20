import React, { useEffect } from 'react'

import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

import { Formik, Field } from 'formik';

import * as Yup from 'yup';

import { Helmet } from "react-helmet";

// UI components
import Input from '../../components/UI/Forms/Input';
import Heading from '../../components/UI/Heading/Heading';
import Button from '../../components/UI/Forms/Button';

// Redux
import * as actions from '../../store/actions/auth';

import { toastError } from '../../utils';

import { StyledWrapper, StyledForm } from '../../hoc/layout/elements.jsx/elements';

// validation schema
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email!')
    .required('The Email field is required!'),
  password: Yup.string()
    .required('The Password field is required!  ')
})

const Signin = ({ logIn, loading, error, cleanUp, loggedIn }) => {
  useEffect(() => {
    return () => {
      cleanUp()
    };
  }, [cleanUp]);

  if (error) {
    toastError(error)
    cleanUp()
  }

  return (
    loggedIn ?
      <Redirect to="/" />
      :
      <StyledWrapper>
        <Helmet>
          <title>Raj Shah | Sign in</title>
        </Helmet>
        <Formik
          initialValues={{
            email: '',
            password: ''
          }}
          validationSchema={LoginSchema}
          onSubmit={async (values, { setSubmitting }) => {
            await logIn(values);
            setSubmitting(false);
          }}
        >
          {({
            isSubmitting,
            isValid,
            handleSubmit,
            values,
            touched,
            handleChange,
            handleBlur
          }) => (
              <StyledForm method="POST" onSubmit={handleSubmit}>
                <Heading size="h1" bold>Sign in</Heading>
                <Heading size="h4" bold>Fill in your details to login into your account</Heading>

                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  touched={touched}
                  component={Input}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />

                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  touched={touched}
                  component={Input}
                  onBlur={handleBlur}
                  value={values.password}
                />

                <Button disabled={!isValid || isSubmitting} loading={loading ? "Signing in..." : null} type="submit">
                  Sign in
                </Button>

              </StyledForm>
            )}
        </Formik>
      </StyledWrapper>
  );
}

const mapStateToProps = ({ auth }) => ({
  loading: auth.loading,
  error: auth.error,
  loggedIn: auth.token !== null && auth.token.trim() ? true : false
})

const mapDispatchToProps = {
  logIn: actions.logIn,
  cleanUp: actions.clean,
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin);