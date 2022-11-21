import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Loader from "./components/basic/Loader";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Suspense fallback={<Loader />}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Suspense>
  </Provider>
);
