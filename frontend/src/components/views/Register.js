import { useCallback, useEffect, useState } from "react";
import * as React from "react";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import Form from "../../utilities/Forms";
import { useHistory } from "react-router-dom";
// import axios from "axios";
import { toast } from "react-toastify";
import axios from "../../services/api.service";

import {useFormik } from "formik";

const Register = () => {
  const [] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validate, setValidate] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const UserSchema = Yup.object().shape({
    fullname: Yup.string().required("Required !"),
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
    roles: Yup.array().of(Yup.string()),
  });

  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
      roles: [],
    },
    validationSchema: UserSchema,
    onSubmit: (data) => {
      axios
        .post("/api/user/addUser", data)
        .then((res) => {
          toast.success(`User created successfully`);
          formik.resetForm();
        })
        .catch((err) => {
          toast.error("Something went wrong. Please try again later !");
          formik.setSubmitting(false);
        });
    },
  });

  const validateRegister = () => {
    let isValid = true;

    let validator = Form.validator({
      name: {
        value: name,
        isRequired: true,
      },
      email: {
        value: email,
        isRequired: true,
        isEmail: true,
      },
      password: {
        value: password,
        isRequired: true,
        minLength: 6,
      },
    });

    if (validator !== null) {
      setValidate({
        validate: validator.errors,
      });

      isValid = false;
    }
    return isValid;
  };

  const register = (e) => {
    e.preventDefault();

    const validate = validateRegister();

    if (validate) {
      setValidate({});
      setName("");
      setEmail("");
      setPassword("");
      alert("Successfully Register User");
    }
  };

  const togglePassword = (e) => {
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };

  const history = useHistory();

  const routeChange = () => {
    const validate = validateRegister();
    if (validate) {
      let path = `/login`;
      history.push(path);
    }
  };

  return (
    <div className="row g-0 auth-wrapper">
      <div className="col-12 col-md-5 col-lg-6 h-100 auth-background-col">
        <div className="auth-background-holder"></div>
        <div className="auth-background-mask"></div>
      </div>

      <div className="col-12 col-md-7 col-lg-6 auth-main-col text-center">
        <div className="d-flex flex-column align-content-end">
          <div className="auth-body mx-auto">
            <p>Create your Account</p>
            <div className="auth-form-container text-start">
              <form
                className="auth-form"
                
                method="POST"
                onSubmit={formik.handleSubmit}
                autoComplete={"off"}
              >
                <div className="name mb-3">
                  <input
                    type="text"
                    className={`form-control ${
                      validate.validate && validate.validate.name
                        ? "is-invalid "
                        : ""
                    }`}
                    id="name"
                    name="name"
                    value={name}
                    placeholder="Name"
                    {...formik.getFieldProps("fullname")}
                    error={
                      formik.touched.fullname && Boolean(formik.errors.fullname)
                    }
                    helperText={
                      formik.touched.fullname && formik.errors.fullname
                    }
                    // onChange={(e) => setName(e.target.value)}
                  />

                  <div
                    className={`invalid-feedback text-start ${
                      validate.validate && validate.validate.name
                        ? "d-block"
                        : "d-none"
                    }`}
                  >
                    {validate.validate && validate.validate.name
                      ? validate.validate.name[0]
                      : ""}
                  </div>
                </div>

                <div className="email mb-3">
                  <input
                    type="email"
                    className={`form-control ${
                      validate.validate && validate.validate.email
                        ? "is-invalid "
                        : ""
                    }`}
                    id="email"
                    name="email"
                    value={email}
                    placeholder="Email"
                    {...formik.getFieldProps("email")}
                    error={
                      formik.touched.email && Boolean(formik.errors.email)
                    }
                    helperText={
                      formik.touched.email && formik.errors.email
                    }

                    
                    // onChange={(e) => setEmail(e.target.value)}
                  />

                  <div
                    className={`invalid-feedback text-start ${
                      validate.validate && validate.validate.email
                        ? "d-block"
                        : "d-none"
                    }`}
                  >
                    {validate.validate && validate.validate.email
                      ? validate.validate.email[0]
                      : ""}
                  </div>
                </div>

                <div className="password mb-3">
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      className={`form-control ${
                        validate.validate && validate.validate.password
                          ? "is-invalid "
                          : ""
                      }`}
                      name="password"
                      id="password"
                      value={password}
                      placeholder="Password"
                      {...formik.getFieldProps("password")}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                      // onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                      type="button"
                      className="btn btn-outline-primary btn-sm"
                      onClick={(e) => togglePassword(e)}
                    >
                      <i
                        className={
                          showPassword ? "far fa-eye" : "far fa-eye-slash"
                        }
                      ></i>{" "}
                    </button>

                    <div
                      className={`invalid-feedback text-start ${
                        validate.validate && validate.validate.password
                          ? "d-block"
                          : "d-none"
                      }`}
                    >
                      {validate.validate && validate.validate.password
                        ? validate.validate.password[0]
                        : ""}
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-primary w-100 theme-btn mx-auto"
                    onClick={routeChange}
                  >
                    Sign Up
                  </button>
                </div>
              </form>

              <hr />
              <div className="auth-option text-center pt-2">
                Have an account?{" "}
                <Link className="text-link" to="/login">
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
