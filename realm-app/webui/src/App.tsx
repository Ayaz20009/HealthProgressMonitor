import { Route, Routes, useNavigate } from "react-router-dom";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { Login } from "./routes/login/Login";
import { NotFound } from "./components/NotFound";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { LoginCallback, Security } from "@okta/okta-react";
import Loading from "./routes/Loading";
import { HomeComponent } from "./routes/home/Home";
import { FormComponent } from "./routes/forms/form";
import { Logout } from "./routes/logout/Logout";
import { oktaConfig } from "./lib/oktaConfig";

// Google Analytics
import ReactGA from "react-ga4";
ReactGA.initialize("G-SFYY204LWB");

export const App = () => {
  const oktaAuth = new OktaAuth(oktaConfig);

  const navigate = useNavigate();
  const restoreOriginalUri = (_oktaAuth, originalUri) => {
    navigate(toRelativeUrl("/", window.location.origin));
  };

  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/login/callback"
          element={<LoginCallback loadingElement={<Loading />} />}
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomeComponent isProtected={true} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/form/:card"
          element={
            <ProtectedRoute>
              <FormComponent isProtected={true} />
            </ProtectedRoute>
          }
        />
        <Route path="/loading" element={<Loading />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Security>
  );
};

export default App;
