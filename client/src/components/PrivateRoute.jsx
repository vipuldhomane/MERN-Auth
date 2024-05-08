import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
  const { currentUser } = useSelector((state) => state.user);
  // console.log(currentUser);
  // here in the this protected route render the outlet only when a certain condition is met
  return currentUser ? <Outlet /> : <Navigate to="/sign-in" />;
};
