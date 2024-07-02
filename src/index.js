import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./redux/store";
import reportWebVitals from "./reportWebVitals";
import { CommunityProvider } from "./context/CommunityProvider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { NotFound } from "./components/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement : <NotFound/>
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <CommunityProvider>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </CommunityProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
