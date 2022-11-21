import React, { useEffect, useState } from "react";
import { Row, Col } from "reactstrap";
import Home from "./pages/home/Home";
import Profile from "./pages/profile";
import Navbar from "./components/navbar/Navbar";
import "./app.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import NotFound from "./pages/notFound/NotFound";
import { ProtectedRoute } from "./components/router/ProtectedRouter";
import UserLayout from "./layout/UserLayout";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
function App() {
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    /* Loader from https://lateeflab.com/display-a-loading-spinner-while-dom-is-rendering-in-reactjs/ */
    const loaderElement = document.querySelector(".loader-container");
    if (loaderElement) {
      loaderElement.remove();
      setIsPageLoading(!isPageLoading);
    }
  }, [isPageLoading]);

  if (isPageLoading) {
    return null;
  }
  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <Row
        className="app m-0 bg-color-white w-100"
        style={{ minHeight: "100vh" }}
      >
        <Routes>
          <Route
            path="/"
            element={
              <UserLayout>
                <Home />
              </UserLayout>
            }
          />
          {/* <Route path="/profile" element={<Profile />} /> */}
          <Route
            path="/profile/:userId" //it will be /profile/:username
            element={
              <ProtectedRoute>
                <UserLayout>
                  <Profile />
                </UserLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <ProtectedRoute>
                <Register />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <ProtectedRoute>
                <Login />
              </ProtectedRoute>
            }
          />
          {/* <Route path="/books" element={<BookList />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Row>
    </>
  );
}

export default App;
