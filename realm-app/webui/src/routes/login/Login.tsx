import { FcGoogle } from "react-icons/fc";
import { Container, Navbar } from "react-bootstrap";
import Button from "@leafygreen-ui/button";
import "../login/Login.css";
import { H1, Body } from "@leafygreen-ui/typography";

import { useOktaAuth } from "@okta/okta-react";
import { MongoDBLogo } from "@leafygreen-ui/logo";

export const Login = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const login = () => oktaAuth.signInWithRedirect({ originalUri: "/" });

  if (!authState) {
    return <div>Loading authentication...</div>;
  } else if (!authState.isAuthenticated) {
    return (
      <>
        <Navbar>
          <Navbar.Brand>
            <MongoDBLogo className="mongoLogoStyle" />
          </Navbar.Brand>
        </Navbar>

        <Container
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "80vh" }}
        >
          <div className="w-100 text-center">
            <H1 className="mainText">CenSoS Intake Form</H1>
            <Body className="bodyFontStyle">
              Sign in with your MongoDB Gmail
            </Body>
            <Button onClick={login} className="buttonStyle w-50 mt-4">
              <FcGoogle size={25} className="mr-2" /> Sign in with Google
            </Button>
          </div>
        </Container>
      </>
    );
  } else {
    return (
      <>
        <Navbar>
          <Navbar.Brand>
            <MongoDBLogo className="mongoLogoStyle" />
          </Navbar.Brand>
        </Navbar>

        <Container
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "80vh" }}
        >
          <div className="w-100 text-center">
            <H1 className="mainText">CenSoS Intake Form</H1>
            <Body className="bodyFontStyle">You're Authenticated</Body>
          </div>
        </Container>
      </>
    );
  }
};
