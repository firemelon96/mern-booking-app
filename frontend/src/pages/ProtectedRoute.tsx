import { ReactNode } from "react";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isLoggedIn } = useAppContext();
  const navigate = useNavigate();

  if (!isLoggedIn) navigate("/");

  return children;
};

export default ProtectedRoute;
