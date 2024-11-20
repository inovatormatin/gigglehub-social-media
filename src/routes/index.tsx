import React from "react";
import { Navigate, useRoutes, RouteObject } from "react-router-dom";
import { FeedPage, LoginPage, SignupPage } from "../pages";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const Router: React.FC = () => {
  let appTokken = cookies.get("_0_1t");
  const routes: RouteObject[] = [
    { path: "/", element: <Navigate to={appTokken ? "/feed" : "/signin"} replace /> },
    { path: "/feed", element: appTokken ? <FeedPage /> : <Navigate to="/signin" replace /> },
    { path: "/signin", element: appTokken ? <Navigate to="/feed" replace /> : <LoginPage /> },
    { path: "/signup", element: appTokken ? <Navigate to="/feed" replace /> : <SignupPage /> },
    { path: "*", element: <Navigate to="/404" replace /> },
  ];

  return useRoutes(routes);
};

export default Router;
