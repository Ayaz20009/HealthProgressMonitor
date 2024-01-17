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
import PatientCard from "../../components/Card/PatientCard";

export const PatientOverview = () => {
  const [user, setUser] = useState<any>();
  const [value, setValue] = useState("");
  const [isAccountSelected, setIsAccountSelected] = useState(false);
  const [isPatientSelected, setIsPatientSelected] = useState(false);
  // const [accountInfo, setAccountInfo] = useState("");
  const [patientInfo, setPatientInfo] = useState("");
  const [accountList, setAccountList] = useState([]);
  const [patientList, setPatientList] = useState([]);
  const [selectedOpp, setSelectedOpp] = useState("");
  const [selectedCheckup, setSelectedCheckup] = useState("");
  const [oppsList, setOppsList] = useState([]);
  const [checkupsList, setCheckupsList] = useState([]);
  const [disableOpp, setDisableOpp] = useState(true);
  const [disableCheckup, setDisableCheckup] = useState(true);
  const [accountId, setAccountId] = useState("");
  const [patientId, setPatientId] = useState("");

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

    //clean the opp field
    setSelectedCheckup("");
  };

  const selectPatient = async (patient: any) => {
    setIsPatientSelected(true);
    let search = patient.patient_id;

    const response = await user.functions.search_checkups_by_patient_id(search);
    setCheckupsList(response.result);
    setDisableCheckup(false);
    setPatientInfo(patient);
    setPatientId(patient.patient_id);
  };

  const createSummaryByPatientId = async (patient: any) => {
    setIsPatientSelected(true);
    let search = patient.patient_id;

    const response = await user.functions.create_summary(search);
    setCheckupsList(response.result);
    setDisableCheckup(false);
    setPatientInfo(patient);
    setPatientId(patient.patient_id);
  };

  return (
    <Layout>
      <div className="page-container">
        <Row className="content">
          <Col></Col>
          <Col xs={12} md={10} lg={10}>
            <div className="searchInput-container">
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
              <pre>{JSON.stringify(patientInfo)}</pre>
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
              Generate patient synopsis
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

            {/* <PatientCard name={patientInfo} /> */}
          </Col>
          <Col></Col>
        </Row>
      </div>
    </Layout>
  );
};
