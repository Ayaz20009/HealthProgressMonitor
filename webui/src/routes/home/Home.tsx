import "../home/Home.css";
import { Col, Row } from "react-bootstrap";
import { H1 } from "@leafygreen-ui/typography";
import Layout from "../../components/Layout/Layout";
import { useState, useEffect } from "react";
import { app } from "../../realmApp/realmApp";
import * as Realm from "realm-web";

import { H2, H3, Body } from "@leafygreen-ui/typography";
//
import TextInput from "@leafygreen-ui/text-input";
import Callout from "@leafygreen-ui/callout";
import Button from "@leafygreen-ui/button";
import Card from "@leafygreen-ui/card";
import { SearchInput, SearchResult } from "@leafygreen-ui/search-input";

export const HomeComponent = () => {
  const [user, setUser] = useState<any>();
  const [value, setValue] = useState("");
  const [isAccountSelected, setIsAccountSelected] = useState(false);
  const [accountInfo, setAccountInfo] = useState("");
  const [accountList, setAccountList] = useState([]);
  const [selectedOpp, setSelectedOpp] = useState("");
  const [oppsList, setOppsList] = useState([]);
  const [disableOpp, setDisableOpp] = useState(true);
  const [accountId, setAccountId] = useState("");

  const [checkupsList, setCheckupsList] = useState([]);

  const [patientList, setPatientList] = useState([]);

  const [patientInfo, setPatientInfo] = useState("");

  const [isPatientSelected, setIsPatientSelected] = useState(false);
  const [summary, setSummary] = useState("");


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

  const searchPatient = async (event: any) => {
    if (isPatientSelected) {
      // Reset the flag once we've ignored one change.
      setIsPatientSelected(false);
      return;
    }

    const searchQuery = event.target.value;

    if (user === undefined) return;

    setPatientInfo(searchQuery);

    if (searchQuery.length < 3) {
      setPatientList([]);
      return;
    }

    let search = { searchTerm: searchQuery };

    const response = await user.functions.search_patient_name_auto(search);

    setPatientList(response.result);

  };

  const selectPatient = async (patient: any) => {
    setIsPatientSelected(true);
    console.log(patient);
    
    setPatientInfo(patient.name)
    let patient_id = patient.patient_id;

    const response = await user.functions.create_summary(patient_id);
    setSummary(response)
    console.log(response);
    
  };

  return (
    <Layout>
      <div className="page-container">
        <Row className="content">
          <Col></Col>
          <Col xs={12} md={10} lg={10}>
          <SearchInput
                id="patientName"
                className="fieldMargin"
                value={patientInfo}
                onChange={(event) => searchPatient(event)}
                aria-label="Patient Name"
              >
                {patientList.map((patient: any, index) => {
                  return (
                    <SearchResult
                      onClick={() => selectPatient(patient)}
                      // onClick={() => alert({ acct })}
                      key={index}
                    >
                      {patient.name} - {patient.patient_id}
                    </SearchResult>
                  );
                })}
              </SearchInput>
          </Col>
          <Col></Col>
        </Row>
        <Row className="content">
          <Col></Col>
          <Col xs={12} md={10} lg={10}>
          </Col>
          <Col></Col>
        </Row>
        <Row className="content">
          <Col></Col>
          <Col xs={12} md={10} lg={10}>
              <Card as="article" contentStyle="clickable">
          
              <H3 className="title">Summary of the last visits for </H3>
              <Body className="body">{summary}</Body>
            </Card>
          </Col>
          <Col></Col>
        </Row>
      </div>
    </Layout>
  );
};
