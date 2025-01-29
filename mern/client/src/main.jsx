import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Record from "./components/Record";
import RecordList from "./components/RecordList";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // App.jsx should contain <Outlet />
    children: [
      {
        index: true, // This means "/" will render RecordList
        element: <RecordList />,
      },
      {
        path: "edit/:id", // Automatically nested under "/"
        element: <Record />,
      },
      {
        path: "create", // Automatically nested under "/"
        element: <Record />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
