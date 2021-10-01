import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../../images/svg/logo.svg";
import { useSelector, useDispatch } from "react-redux";
import { Formik } from "formik";
import { useHistory, useLocation } from "react-router-dom";
import _actions from "../../../_actions";

const { userAction } = _actions;

const LoginPage = () => {
  const history = useHistory();
  const session = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();
  let user = localStorage.getItem("user");
  const [isLoading, setIsLoading] = useState(true);
  // reset login status
  useEffect(() => {
    if (user) {
      history.push("/admin");
    }
    setIsLoading(false);
  }, [session]);
  // useEffect(() => {
  //   dispatch(userAction.logout());
  // }, []);

  return !isLoading ? (
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
          const { from } = location.state || { from: { pathname: "/admin" } };
          dispatch(userAction.login({ email, password, from }));
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
  ) : (
    "Loading..."
  );
};

export default LoginPage;
