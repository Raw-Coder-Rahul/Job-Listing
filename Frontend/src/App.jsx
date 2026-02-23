import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./components/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./components/Layout";

const appRouter = createBrowserRouter([
  { path: "/", element: <Layout><Home /></Layout> },
  { path: "/login", element: <Layout><Login /></Layout> },
  { path: "/register", element: <Layout><Register /></Layout> },
]);

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;