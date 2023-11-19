import { useLocation } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
import { useEffect } from "react";
import Loading from "./Loading";

export const ProtectedRoute = ({ children }) => {
  let location = useLocation();
  const { authState, oktaAuth } = useOktaAuth();

  useEffect(() => {
    async function authenticate() {
      if (!authState) return;

      if (!authState.isAuthenticated) {
        await oktaAuth.signInWithRedirect();
      }
    }

    authenticate();
  }, [authState, oktaAuth]);

  if (!authState?.isAuthenticated) {
    return <Loading />;
  } else {
    return children;
  }
};

export default ProtectedRoute;
