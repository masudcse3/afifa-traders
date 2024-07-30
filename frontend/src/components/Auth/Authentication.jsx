/** @format */

import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
const Authentication = () => {
  const token = Cookies.get("jwt");
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default Authentication;
