import { useEffect } from "react";
import * as Realm from "realm-web";
import { useOktaAuth } from "@okta/okta-react";

const AuthPage = () => {
  useEffect(() => {
    Realm.handleAuthRedirect();
  }, []);

  return <></>;
};

export default AuthPage;
