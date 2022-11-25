import { useEffect, useState } from "react";
import "./register.css";
import { Row, Col } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, resetRegistered } from "../../redux/slices/authSlice";
import { BiError } from "react-icons/bi";
const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isFocusedOn, setIsFocusedOn] = useState(0);
  const isRegistered = useSelector((state) => state.auth.isRegistered);

  useEffect(() => {
    setTimeout(() => {
      if (isRegistered.length >= 3) {
        //is successfull
        navigate("/login");
        dispatch(resetRegistered());
      }
    }, 0);
  }, [isRegistered]);

  const requiredError = (text) => (
    <p className="m-0 d-flex align-items-bottom w-100 text-start text-danger fs-7 fw-bold">
      <BiError className="fs-5 p-0" /> {text}
    </p>
  );
  const RegisterSchema = Yup.object().shape({
    email: Yup.string()
      .email(requiredError("Invalid email"))
      .required(requiredError("This field is required")),
    username: Yup.string()
      .min(3, requiredError("Your username is too short"))
      .max(20, requiredError("Your username is too long"))
      .required(requiredError("This field is required")),
    password: Yup.string()
      .min(6, requiredError("Your password is too short"))
      .max(15, requiredError("Your password is too long"))
      .required(requiredError("This field is required")),
  });

  return (
    <Row className="m-0 p-0 text-center">
      <Col
        sm="0"
        md="7"
        className="d-none d-md-flex h-100 h-100 flex-center flex-column gap-3"
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
          src={process.env.PUBLIC_URL + "/assets/svg/registerundraw.svg"}
          alt="register"
          width={400}
        />
      </Col>

      <Formik
        initialValues={{ email: "", username: "", password: "" }}
        validationSchema={RegisterSchema}
        // validate={(values) => {
        //   const errors = {};
        //   if (!values.email) {
        //     errors.email = (
        //       <p className="m-0 d-flex align-items-center w-100 text-start text-danger fs-7 fw-bold">
        //         <BiError className="fs-5" /> This Field Is Required
        //       </p>
        //     );
        //   } else if (
        //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        //   ) {
        //     errors.email = "Invalid email address";
        //   }
        //   return errors;
        // }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          dispatch(
            registerUser({
              email: values.email,
              username: values.username,
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
            md="5"
            className="p-0 bg-white px-2 px-md-5 h-100 flex-center flex-column h-100"
            tag="form"
            onSubmit={handleSubmit}
          >
            <div className="w-100 fs-3 fw-bold mt-3">
              Sign Up to SociableCat
            </div>
            <div className="w-100 mt-1">
              <span className="fs-7 text-secondary">
                Do you have an account?{" "}
              </span>
              <span
                className="fs-7 hvr-underline color-bronze fw-600 pointer"
                onClick={() => navigate("/login")}
              >
                Login
              </span>
            </div>
            <div className="w-100 p-0 m-0 mt-5 d-flex justify-content-center">
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
                <span className="fw-600">Username</span>
                <input
                  type="text"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  className={`w-100 d-flex justify-content-center register-input p-2 bg-color-white rounded-3 border ${
                    isFocusedOn === 2 && "expand-input"
                  }`}
                  onFocus={() => setIsFocusedOn(2)}
                  onBlur={() => setIsFocusedOn(0)}
                  placeholder="Be creative just like 'CatBoi_69'"
                />
                {errors.username && touched.username && errors.username}
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
              className="w-75 register-btn py-2 border-0 color-white rounded-2 bg-color-green mt-5"
            >
              Create an Account
            </button>
            <button
              className="w-75 py-2 text-dark border rounded-2 bg-color- mt-4"
              disabled
              title="Coming soon!"
            >
              <FcGoogle className="fs-4 rounded-circle" /> Sign up with Google
            </button>
          </Col>
        )}
      </Formik>
    </Row>
  );
};

export default Register;
