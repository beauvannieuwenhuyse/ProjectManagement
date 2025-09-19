import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { Navigate } from "react-router-dom";

import ProjectsPage from "./pages/ProjectPage/ProjectsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage/ProjectDetailPage";

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/projects" /> },
  { path: "/projects", element: <ProjectsPage /> },
  { path: "/projects/:id", element: <ProjectDetailPage /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
