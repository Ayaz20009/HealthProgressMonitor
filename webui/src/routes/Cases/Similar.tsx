import "../home/Home.css";
import { Col, Row } from "react-bootstrap";
import { H1 } from "@leafygreen-ui/typography";
import Layout from "../../components/Layout/Layout";
import { useState, useEffect } from "react";
import { app } from "../../realmApp/realmApp";
import * as Realm from "realm-web";
//
import TextInput from "@leafygreen-ui/text-input";
import Callout from "@leafygreen-ui/callout";
import Button from "@leafygreen-ui/button";
import Card from "@leafygreen-ui/card";
import { SearchInput, SearchResult } from "@leafygreen-ui/search-input";

export const SimilarCases = () => {
  const [user, setUser] = useState<any>();
  const [value, setValue] = useState("");
  const [isAccountSelected, setIsAccountSelected] = useState(false);
  const [accountInfo, setAccountInfo] = useState("");
  const [accountList, setAccountList] = useState([]);
  const [selectedOpp, setSelectedOpp] = useState("");
  const [oppsList, setOppsList] = useState([]);
  const [disableOpp, setDisableOpp] = useState(true);
  const [accountId, setAccountId] = useState("");

  useEffect(() => {
    //Runs only on the first render
    loginApiKey(process.env.REACT_APP_REALM_API_KEY); // add generated API key in .env file
  }, []);

  const loginApiKey = async (apiKey: any) => {
    // use an API Key credential to login to Realm
    const credentials = Realm.Credentials.apiKey(apiKey);

    // Authenticate the user
    setUser(await app.logIn(credentials));
  };

  const testing = async () => {
    if (user === undefined) return;

    const result = await user.functions.testFunction();
    console.log(result);
  };

  const searchAccount = async (event: any) => {
    if (isAccountSelected) {
      // Reset the flag once we've ignored one change.
      setIsAccountSelected(false);
      return;
    }

    const searchQuery = event.target.value;

    if (user === undefined) return;

    setAccountInfo(searchQuery);

    if (searchQuery.length < 3) {
      setAccountList([]);
      return;
    }

    let search = { searchTerm: searchQuery };

    const response = await user.functions.search_account(search);

    setAccountList(response.result);

    //clean the opp field
    setSelectedOpp("");
  };

  const selectAccount = async (acct: any) => {
    setIsAccountSelected(true);

    let search = { account_id: acct._id };

    const response = await user.functions.search_opp(search);

    setOppsList(response.result);
    setDisableOpp(false);

    setAccountInfo(acct.nm);
    setAccountId(acct._id);
  };

  return (
    <Layout>
      <div className="page-container">
        <Row className="content">
          <Col></Col>
          <Col xs={12} md={10} lg={10}>
            <div className="searchInput-container">
              <SearchInput
                id="accountName"
                className="fieldMargin"
                value={accountInfo}
                onChange={(event) => searchAccount(event)}
                aria-label="Account Name"
              >
                {accountList.map((acct: any, index) => {
                  return (
                    <SearchResult
                      onClick={() => selectAccount(acct)}
                      key={index}
                    >
                      {acct.nm} - {acct.owner}
                    </SearchResult>
                  );
                })}
              </SearchInput>
            </div>
            {/* <TextInput
              label="Patient Name"
              description=" "
              placeholder="your.email@example.com"
              onChange={(event) => {
                console.log(event.target.value);
              }}
              value={value}
            /> */}
            <Button
              className="button-container"
              darkMode={true}
              disabled={false}
            >
              Find similar cases
            </Button>
            {/* <Callout title="Title">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industrys standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </Callout> */}
            <Card className="card-styles" as="article">
              This is my card component
            </Card>
          </Col>
          <Col></Col>
        </Row>
      </div>
    </Layout>
  );
};
