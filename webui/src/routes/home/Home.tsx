import "../home/Home.css";
import { Col, Row } from "react-bootstrap";
import Layout from "../../components/Layout/Layout";
import { useState, useEffect } from "react";
import { app } from "../../realmApp/realmApp";
import * as Realm from "realm-web";

import Toast from "@leafygreen-ui/toast";
import { H3, Body } from "@leafygreen-ui/typography";
//
// import TextInput from "@leafygreen-ui/text-input";
// import Callout from "@leafygreen-ui/callout";
// import Button from "@leafygreen-ui/button";
import Card from "@leafygreen-ui/card";
import { SearchInput, SearchResult } from "@leafygreen-ui/search-input";
import Button from "@leafygreen-ui/button";
import TextArea from "@leafygreen-ui/text-area";
//
import Chart from "../../components/Charts/Chart";
import CasesCard from "../../components/Card/CasesCard/CasesCard";

export const HomeComponent = () => {
  const [user, setUser] = useState<any>();
  const [value, setValue] = useState("");
  const [successToastOpen, setSuccessToastOpen] = useState(false);
  const [progressToastOpen, setProgressToastOpen] = useState(false);
  const [checkupsList, setCheckupsList] = useState([]);

  const [patientList, setPatientList] = useState([]);
  const [patientInfo, setPatientInfo] = useState("");

  const [isPatientSelected, setIsPatientSelected] = useState(false);
  const [summary, setSummary] = useState("");

  // Upload stuff
  const [file, setFile] = useState<any>();
  const [notesValue, setNotesValue] = useState("");
  const [casesCards, setCasesCards] = useState([]);
  const [similarSummary, setSimilarSummary] = useState([]);
  // const [successToastOpen, setSuccessToastOpen] = useState(false);
  // const [progressToastOpen, setProgressToastOpen] = useState(false);

  // CHARTS stuff //
  const [selectedPatient, setSelectedPatient] = useState("");
  const [filterPatient, setFilterPatient] = useState({});

  useEffect(() => {
    if (selectedPatient !== "") {
      setFilterPatient({ patient: selectedPatient });
    }
  }, [selectedPatient]);
  // End CHARTS stuff

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

    setPatientInfo(patient.name);
    let patient_id = patient.patient_id;
    setFilterPatient({ patient_id: patient_id });

    setSuccessToastOpen(false);
    setProgressToastOpen(true);

    const response = await user.functions.create_summary(patient_id);
    setSummary(response);
    setSuccessToastOpen(true);
    setProgressToastOpen(false);
  };

  const upload = async () => {
    setSuccessToastOpen(false);
    setProgressToastOpen(true);
    if (user === undefined) return;
    setCasesCards([]);

    const result = await user.functions.similarityCheck(notesValue);
    setCasesCards(result);
    console.log(notesValue);
    console.log(result);
    let doctorNotesArray = result.map((doc) => doc.doctor_notes);
    console.log(doctorNotesArray);
    let queryObj = {
      queryObj: notesValue,
      similarObjs: doctorNotesArray,
    };
    const similarDocsSummary =
      await user.functions.similaritiesBetweenDocuments(queryObj);
    setSimilarSummary(similarDocsSummary);
    setSuccessToastOpen(true);
    setProgressToastOpen(false);
    console.log(similarDocsSummary);
  };

  return (
    <Layout>
      <div className="page-container">
        <Row className="content">
          <Col></Col>
          <Col xs={12} md={10} lg={10}>
            <SearchInput
              id="patientName"
              className="searchInputStyle"
              size="large"
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
          <Col xs={12} md={10} lg={10}></Col>
          <Col></Col>
        </Row>
        <Row className="content">
          <Col></Col>
          <Col xs={12} md={10} lg={10}>
            <Row>
              <Col md={6}>
                <Chart
                  height={"600px"}
                  width={"100%"}
                  filter={filterPatient}
                  chartId={"65a8019c-feab-4394-8193-982f39323a91"}
                />
              </Col>

              <Col md={6}>
                <Chart
                  height={"600px"}
                  width={"100%"}
                  filter={filterPatient}
                  chartId={"65a821fa-2d96-48b7-8be4-d84ebac4cdfd"}
                />
              </Col>
            </Row>

            <Card className="summaryCard" as="article" contentStyle="clickable">
              <H3 className="title">
                Summary of all visits
              </H3>
              <Body className="body">{summary}</Body>
            </Card>

            <TextArea
              className="notes-input-hidden"
              baseFontSize={13}
              label="Notes / Input"
              description=""
              value={summary}
              onChange={(event) => setNotesValue(event.target.value)}
            />

            <Button
              className="button-container"
              darkMode={true}
              disabled={false}
              onClick={upload}
            >
              Find Similar Cases
            </Button>

            <CasesCard cardData={casesCards} />
          </Col>
          <Col></Col>
        </Row>

        <Row className="content">
          <Col></Col>
          <Col xs={12} md={10} lg={10}></Col>
          <Col></Col>
        </Row>
        <Row className="content">
          <Col></Col>
          <Col xs={12} md={10} lg={10}>
            <Card as="article" contentStyle="clickable">
              <H3 className="title">Talk track</H3>
              <Body className="body">{similarSummary}</Body>
            </Card>
          </Col>
          <Col></Col>
        </Row>

        <Toast
          variant="progress"
          title="Creating Summary of the patient's last visits"
          body="Sending your notes to our super computers"
          open={progressToastOpen}
          close={() => setProgressToastOpen(false)}
        />
        <Toast
          variant="success"
          title="Summary created successfully"
          body=""
          open={successToastOpen}
          close={() => setSuccessToastOpen(false)}
        />
      </div>
    </Layout>
  );
};
