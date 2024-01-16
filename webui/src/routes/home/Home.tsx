import "../home/Home.css";
import { Col, Row } from "react-bootstrap";
import { H1 } from "@leafygreen-ui/typography";
import Layout from "../../components/Layout/Layout";
import { useState, useEffect } from "react";
import { app } from "../../realmApp/realmApp";
import * as Realm from "realm-web";


export const HomeComponent = () => {

  const [user, setUser] = useState<any>();

  useEffect(() => {
    //Runs only on the first render
    loginApiKey(process.env.REACT_APP_REALM_API_KEY); // add generated API key in .env file
  }, []);

  const loginApiKey = async (apiKey: any) => {
    // use an API Key credential to login to Realm
    const credentials = Realm.Credentials.apiKey(apiKey);

    // Authenticate the user
    setUser(await app.logIn(credentials))
  }

  const testing = async () => {
    if (user === undefined) return;

    const result = await user.functions.testFunction();
    console.log(result);
  };

  return (
    <Layout>
      <div className="page-container">
        <Row className="content">
            {/* Other content goes here */}
        </Row>
    </div>
    </Layout>


  );
};
