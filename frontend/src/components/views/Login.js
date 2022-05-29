import { useState } from "react";
import * as Yup from 'yup';
import { Link , useHistory} from "react-router-dom";
import { useFormik, FormikProvider } from 'formik';
import Form from "../../utilities/Forms";
// import { useHistory } from "react-router-dom";
import { useSetRecoilState } from 'recoil';
// import Item from "./Item";
import { toast } from 'react-toastify';
import axios from "../../services/api.service";
import { currentUserState } from '../../services/auth.service';
import { LoadingButton } from '@mui/lab';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [validate, setValidate] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();
  const setCurrentUser = useSetRecoilState(currentUserState);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Email must be a valid email address").required("Email is required!"),
    password: Yup.string().required("Password is required!")
  })

  const formik = useFormik({
    initialValues: {
      email:'',
      password: ''
    },

    validationSchema: LoginSchema,
    onSubmit: (data) => {
      axios
        .post('/api/auth/login', data)
        .then((res) => {
          setCurrentUser(res.data.user);
          console.log(res.data.user);
          toast.success(`Welcome ${res.data.user.fullname}`);
          // const history = useHistory();

          if(res.data.user != null){
            let path = "/item-summary";
            history.push(path); 
            console.log("test")
            // navigate('/getItems');
          }
        })
        .catch((err)=> {
          toast.error("Incorrect email or Password");
          formik.setSubmitting(false);
        })
    }
  })

  const {errors, touched, isSubmitting, handleSubmit, getFieldProps} = formik;

  const validateLogin = () => {
    let isValid = true;

    let validator = Form.validator({
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

  // const authenticate = (e) => {
  //   e.preventDefault();

  //   const validate = validateLogin();

  //   if (validate) {
  //     setValidate({});
  //     setEmail("");
  //     setPassword("");
  //     alert("Successfully Login");
  //   }
  // };

  const togglePassword = (e) => {
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };

  // const history = useHistory();
  
  const onclickLogin = (event) => {
    event.preventDefault();

    const validate1 = validateLogin()
    if (validate1){
      let path = "/item-summary";
      history.push(path); 
      console.log("test")
    }
  }

  return (
    <FormikProvider value={formik}>
    <div className="row g-0 auth-wrapper">
      <div className="col-12 col-md-5 col-lg-6 h-100 auth-background-col">
        <div className="auth-background-holder"></div>
        <div className="auth-background-mask"></div>
      </div>

      <div className="col-12 col-md-7 col-lg-6 auth-main-col text-center">
        <div className="d-flex flex-column align-content-end">
          <div className="auth-body mx-auto">
            <p>Login to your account</p>
            <div className="auth-form-container text-start">
              <form
                className="auth-form"
                onSubmit={handleSubmit}
                autoComplete={"off"}
                noValidate
              >
                <div className="email mb-3">
                  <input
                    type="email"
                    autoComplete="username"
                    className={`form-control ${
                      validate.validate && validate.validate.email
                        ? "is-invalid "
                        : ""
                    }`}
                    id="email"
                    name="email"
                    value={email}
                    placeholder="Email"
                    {...getFieldProps('email')}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                    // onChange={(e) => setEmail(e.target.value)}
                  />

                  {/* <div
                    className={`invalid-feedback text-start ${
                      validate.validate && validate.validate.email
                        ? "d-block"
                        : "d-none"
                    }`}
                  >
                    {validate.validate && validate.validate.email
                      ? validate.validate.email[0]
                      : ""}
                  </div> */}
                </div>

                <div className="password mb-3">
                  <div className="input-group">
                    <input
                      autoComplete="current-password"
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
                      {...getFieldProps('password')}
                      error={Boolean(touched.password && errors.password)}
                      helperText={touched.password && errors.password}
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

                  {/* <div className="extra mt-3 row justify-content-between">
                    <div className="col-6">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="remember"
                          checked={remember}
                          onChange={(e) => setRemember(e.currentTarget.checked)}
                        />
                        <label className="form-check-label" htmlFor="remember">
                          Remember me
                        </label>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="forgot-password text-end">
                        <Link to="/forgot-password">Forgot password?</Link>
                      </div>
                    </div>
                  </div> */}
                </div>
                <div className="text-center">
                  <LoadingButton
                    type="submit"
                    // size="large"
                    className="btn btn-primary w-100 theme-btn mx-auto"
                    // onClick={onclickLogin}
                    variant="contained"
                    loading={isSubmitting}
                  >
                    Log In
                  </LoadingButton>
                </div>
              </form>

              <hr />
              <div className="auth-option text-center pt-2">
                No Account?{" "}
                <Link className="text-link" to="/register">
                  Sign up{" "}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </FormikProvider>
  );
};


export default Login;
