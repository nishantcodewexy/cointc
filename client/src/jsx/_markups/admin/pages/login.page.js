// import React, { useEffect } from "react";
import { Formik } from "formik";
import logo from "../../../../images/svg/logo.svg";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import _actions from "../../../_actions";

// CONSTANTS
import { SERVICE } from "../../../_constants";

const { user: userAction } = _actions;

const LoginPage = ({ services, useService }) => {
  const dispatch = useDispatch();
  // const location = useLocation();
  const { account } = services;

  const { dispatchRequest } = useService({
    [SERVICE?.LOGIN]: account?.login,
  });

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

        if (!values.password) {
          errors.password = "Password is required";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        const { email, password } = values;
        setSubmitting(true);
        
        try {
          let request = async () =>
            await dispatchRequest({
              type: SERVICE?.LOGIN,
              payload: {
                email,
                password,
                access_level: 3,
              },
              toast: { error: notifyError },
            });
          dispatch(userAction.login(request));
        } catch (error) {
          console.error(error);
        } finally {
          setSubmitting(false);
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
        <>
          {/* {alert.message && (
        <div className={`alert ${alert.type}`}>{alert.message}</div>
      )} */}
          <div className="authentication flex flex-column align-items-center justify-content-center vh-100">
            <div className="container h-100">
              <div className="row justify-content-center h-100 align-items-center">
                <div className="col-lg-6 col-sm-11">
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
                              <small className="text-danger">
                                {errors.email && touched.email && errors.email}
                              </small>
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
                              <small className="text-danger">
                                {errors.password &&
                                  touched.password &&
                                  errors.password}
                              </small>
                            </div>
                            <div className="form-row d-flex justify-content-between mt-4 mb-2"></div>
                            <div className="text-center">
                              <button
                                disabled={isSubmitting}
                                type="submit"
                                className="btn btn-primary btn-block"
                              >
                                {!isSubmitting ? "Login" : "Submitting..."}
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
        </>
      )}
    </Formik>
  );
};


function notifyError(error) {
  toast.error(error || "Request Error!", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
}

export default LoginPage;

LoginPage.displayName = "LoginPage";
