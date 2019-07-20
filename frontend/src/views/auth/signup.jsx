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
const SignupSchema = Yup.object().shape({
  first_name: Yup.string()
    .required('First name field is required!'),
  last_name: Yup.string()
    .required('Last name field is required!'),
  email: Yup.string()
    .email('Invalid email!')
    .required('The Email field is required!'),
  password: Yup.string()
    .required('The Password field is required!  ')
})

const Signup = ({ signUp, loading, error, cleanUp, loggedIn }) => {
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
          <title>Raj Shah | Sign up</title>
        </Helmet>
        <Formik
          initialValues={{
            first_name: '',
            last_name: '',
            email: '',
            password: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={async (values, { setSubmitting }) => {
            await signUp(values);
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
                <Heading size="h1" bold>Sign up</Heading>
                <Heading size="h4" bold>Fill in your details to login into your account</Heading>

                <Field
                  type="text"
                  name="first_name"
                  placeholder="First name"
                  touched={touched}
                  component={Input}
                  onChange={handleChange}
                  value={values.first_name}
                  onBlur={handleBlur}
                />

                <Field
                  type="text"
                  name="last_name"
                  placeholder="Last name"
                  touched={touched}
                  component={Input}
                  onChange={handleChange}
                  value={values.last_name}
                  onBlur={handleBlur}
                />

                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  touched={touched}
                  component={Input}
                  onChange={handleChange}
                  value={values.email}
                  onBlur={handleBlur}
                />

                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  touched={touched}
                  component={Input}
                  onChange={handleChange}
                  value={values.password}
                  onBlur={handleBlur}
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
  signUp: actions.signUp,
  cleanUp: actions.clean,
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);