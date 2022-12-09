import { useEffect, useState } from "react";
import "./login.css";
import { Row, Col } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { FcGoogle } from "react-icons/fc";
import { BiError } from "react-icons/bi";
import { loginUser } from "../../redux/slices/authSlice";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isFocusedOn, setIsFocusedOn] = useState(0);

  const { userToken } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userToken.length > 15) {
      navigate("/");
    }
  }, [userToken, navigate]);

  const requiredError = (text) => (
    <p className="m-0 d-flex align-items-bottom w-100 text-start text-danger fs-7 fw-bold">
      <BiError className="fs-5 p-0" /> {text}
    </p>
  );

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email(requiredError("Invalid email"))
      .required(requiredError("This field is required")),
    // username: Yup.string()
    //   .min(3, requiredError("Your username is too short"))
    //   .max(20, requiredError("Your username is too long"))
    //   .required(requiredError("This field is required")),
    password: Yup.string()
      .min(6, requiredError("Your password is too short"))
      .max(15, requiredError("Your password is too long"))
      .required(requiredError("This field is required")),
  });

  return (
    <Row className="m-0 p-0 text-center">
      <Col
        md="6"
        className="h-100 h-100 d-none d-md-flex justify-content-center align-items-center flex-column gap-3"
      >
        <div
          className="flex-align-center justify-content-center pointer"
          style={{ marginLeft: "-75px" }}
        >
          <span className="flex-center gap-1 align-items-center">
            <img
              src={process.env.PUBLIC_URL + "/assets/svg/just-cat.svg"}
              alt="Logo"
              width="70"
            />
            <span className="logo-part fw-bold fs-3">SociableCat</span>
          </span>
        </div>
        <img
          src={process.env.PUBLIC_URL + "/assets/svg/loginundraw.svg"}
          alt="register"
          width={550}
        />
      </Col>
      <Formik
        initialValues={{ email: "", username: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          dispatch(
            loginUser({
              email: values.email,
              password: values.password,
            })
          );
          // setSubmitting(false); İFFF
          // resetForm(); İFFF
          // navigate("/login"); İFFF
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <Col
            sm="12"
            md="6"
            className="p-0 bg-white px-2 px-md-5 h-100 flex-center flex-column"
            tag="form"
            onSubmit={handleSubmit}
          >
            <div className="w-100 fs-3 fw-bold mt-3">Login to SociableCat</div>
            <div className="w-100 mt-1">
              <span className="fs-7 text-secondary">
                {" "}
                You don't have an account?{" "}
              </span>
              <span
                className="fs-7 hvr-underline color-bronze fw-600 pointer"
                onClick={() => navigate("/register")}
              >
                Sign Up
              </span>
            </div>

            <div className="w-100 p-0 m-0 mt-3 d-flex justify-content-center">
              <div className="w-75 p-0 d-flex flex-column align-items-start mt-1">
                <span className="fw-600">Email</span>
                <input
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  className={`w-100 d-flex justify-content-center register-input p-2 bg-color-white rounded-3 border ${
                    isFocusedOn === 1 && "expand-input"
                  }`}
                  onFocus={() => setIsFocusedOn(1)}
                  onBlur={() => setIsFocusedOn(0)}
                  placeholder="name@example.com"
                />
                {errors.email && touched.email && errors.email}
              </div>
            </div>

            <div className="w-100 p-0 m-0 mt-3 d-flex justify-content-center">
              <div className="w-75 p-0 d-flex flex-column align-items-start mt-1">
                <span className="fw-600">Password</span>
                <input
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  className={`w-100 d-flex justify-content-center register-input p-2 bg-color-white rounded-3 border ${
                    isFocusedOn === 3 && "expand-input"
                  }`}
                  onFocus={() => setIsFocusedOn(3)}
                  onBlur={() => setIsFocusedOn(0)}
                  placeholder="+6 Characters"
                />
                {errors.password && touched.password && errors.password}
              </div>
            </div>

            <button
              type="submit"
              // disabled={isSubmitting}
              className="w-75 login-btn py-2 border-0 color-white rounded-2 bg-color-green mt-5"
            >
              Sign In
            </button>
            <button
              className="w-75 py-2 text-dark border rounded-2 bg-color- mt-4"
              disabled
              title="Coming soon!"
            >
              <FcGoogle className="fs-4 rounded-circle" /> Sign in with Google
            </button>
          </Col>
        )}
      </Formik>
    </Row>
  );
};

export default Login;
