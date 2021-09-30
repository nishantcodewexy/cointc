import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../../../images/svg/logo.svg";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { Formik } from "formik";
import { useHistory } from "react-router-dom";
import axios from "axios";
import _actions from "../../../_actions";

const { userAction } = _actions;

const LoginPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();

  // reset login status
  useEffect(() => {
    dispatch(userAction.logout());
  }, []);

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validate={(values) => {
        const errors = {};

        if (!values.email) {
          errors.email = "Email is required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        const { email, password } = values;
        try {
          axios
            .post("http://localhost:8080/admin/user/authenticate", {
              email,
              password,
            })
            .then(({ data }) => {
              // sessionDispatcher(setToken(data.access_token));
              // state.metadata = data.profile;
              const { from } = location.state || { from: { pathname: "/" } };
              dispatch(userAction.login({email, password, from}));

              history.push("/admin");
            });
        } catch (error) {
          console.error(error);
        }
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <div className="authentication flex flex-column align-items-center justify-content-center vh-100">
          <div className="container h-100">
            <div className="row justify-content-center h-100 align-items-center">
              <div className="col-md-6">
                <div className="authincation-content">
                  <div className="row no-gutters">
                    <div className="col-xl-12">
                      <div className="auth-form">
                        <div className="text-center mb-3">
                          <Link to="/">
                            <img src={logo} alt="" />
                          </Link>
                        </div>
                        <h4 className="text-center mb-4 ">Admin login</h4>
                        <form onSubmit={handleSubmit}>
                          <div className="form-group">
                            <label className="mb-1 ">
                              <strong>Email</strong>
                            </label>
                            <input
                              required
                              type="email"
                              name="email"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.email}
                              className="form-control"
                              placeholder="Email address"
                            />
                            {errors.email && touched.email && errors.email}
                          </div>
                          <div className="form-group">
                            <label className="mb-1 ">
                              <strong>Password</strong>
                            </label>
                            <input
                              type="password"
                              name="password"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.password}
                              className="form-control"
                              placeholder="password"
                            />
                            {errors.password &&
                              touched.password &&
                              errors.password}
                          </div>
                          <div className="form-row d-flex justify-content-between mt-4 mb-2"></div>
                          <div className="text-center">
                            <button
                              disabled={isSubmitting}
                              type="submit"
                              className="btn btn-primary btn-block"
                            >
                              Login
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default LoginPage;
