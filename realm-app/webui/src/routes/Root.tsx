import { Navigate, useLocation } from "react-router-dom";

export const Root = () => {
  let location = useLocation();

  return <Navigate to="/" state={{ from: location }} replace />;
};
