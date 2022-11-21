import { useEffect, useState } from "react";
import "./login.css";
import { Row, Col } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
const Login = () => {
  const navigate = useNavigate();
  const [isFocusedOn, setIsFocusedOn] = useState(0);

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
      <Col
        sm="12"
        md="6"
        className="p-0 bg-white px-2 px-md-5 h-100 flex-center flex-column"
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
            <span className="fw-600">Username</span>
            <input
              name="username"
              className={`login-input w-100 d-flex justify-content-center p-2 bg-color-white rounded-3 border ${
                isFocusedOn === 2 && "expand-input"
              }`}
              onFocus={() => setIsFocusedOn(2)}
              onBlur={() => setIsFocusedOn(0)}
              placeholder="Be creative just like 'CatBoi_69'"
            />
          </div>
        </div>

        <div className="w-100 p-0 m-0 mt-3 d-flex justify-content-center">
          <div className="w-75 p-0 d-flex flex-column align-items-start mt-1">
            <span className="fw-600">Password</span>
            <input
              name="password"
              type="password"
              className={`login-input w-100 d-flex justify-content-center p-2 bg-color-white rounded-3 border ${
                isFocusedOn === 3 && "expand-input"
              }`}
              onFocus={() => setIsFocusedOn(3)}
              onBlur={() => setIsFocusedOn(0)}
              placeholder="+6 Characters"
            />
          </div>
        </div>

        <button className="w-75 login-btn py-2 border-0 color-white rounded-2 bg-color-green mt-5">
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
    </Row>
  );
};

export default Login;
