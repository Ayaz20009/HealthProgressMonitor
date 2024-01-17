import "../home/Home.css";
import { Col, Row } from "react-bootstrap";
import { H1 } from "@leafygreen-ui/typography";
import Layout from "../../components/Layout/Layout";
import { useState, useEffect } from "react";
import { app } from "../../realmApp/realmApp";
import * as Realm from "realm-web";
import axios from "axios";

import Toast from "@leafygreen-ui/toast";
import { H2, H3, Body } from "@leafygreen-ui/typography";
//
import TextInput from "@leafygreen-ui/text-input";
import Callout from "@leafygreen-ui/callout";
import Button from "@leafygreen-ui/button";
import Card from "@leafygreen-ui/card";
import { SearchInput, SearchResult } from "@leafygreen-ui/search-input";
//
import Chart from "../../components/Charts/Chart";

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
  const [successToastOpen, setSuccessToastOpen] = useState(false);
  const [progressToastOpen, setProgressToastOpen] = useState(false);
  const [checkupsList, setCheckupsList] = useState([]);

  const [patientList, setPatientList] = useState([]);
  const [patientInfo, setPatientInfo] = useState("");

  const [isPatientSelected, setIsPatientSelected] = useState(false);
  const [summary, setSummary] = useState("");

  // CHARTS stuff //
  // const url = "https://charts.mongodb.com/charts-hackathon-fy24-wkkws";
  // const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState("");
  const [filterPatient, setFilterPatient] = useState({});

  useEffect(() => {
    if (selectedPatient !== "") {
      setFilterPatient({ patient: selectedPatient });
    }
  }, [selectedPatient]);

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
    console.log(response);
  };

  const findAllPatients = async () => {
    const response = await user.functions.findAllPatients();
    setPatientList(response);
  };

  useEffect(() => {
    findAllPatients();
    return;
  }, []);

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
          <Col xs={12} md={10} lg={10}></Col>
          <Col></Col>
        </Row>
        <Row className="content">
          <Col></Col>
          <Col xs={12} md={10} lg={10}>
            {/* <iframe
              className="embedded-chart"
              width="640"
              height="480"
              src="https://charts.mongodb.com/charts-hackathon-fy24-wkkws/embed/charts?id=65a8019c-feab-4394-8193-982f39323a91&maxDataAge=3600&theme=light&autoRefresh=true"
            ></iframe> */}
            {/* <div className="form">
              {!patientList
                ? "Loading patient list"
                : patientList.map((p) => (
                    <div className="elem" key={p}>
                      <input
                        type="radio"
                        name="patient"
                        value={p}
                        onChange={() => setSelectedPatient(p)}
                        checked={p === selectedPatient}
                      />
                      <label htmlFor={p} title={p}>
                        {p}
                      </label>
                    </div>
                  ))}
            </div> */}
            <div className="charts">
              <Chart
                height={"600px"}
                width={"800px"}
                filter={filterPatient}
                chartId={"65a8019c-feab-4394-8193-982f39323a91"}
              />
            </div>
            <Card as="article" contentStyle="clickable">
              <H3 className="title">Summary of the last visits for </H3>
              <Body className="body">{summary}</Body>
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
