import "../Upload/Upload.css";
import Layout from "../../components/Layout/Layout";
import CasesCard from "../../components/Card/CasesCard/CasesCard";
import { H1 } from "@leafygreen-ui/typography";
import { useCallback, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import FileUpload from "../../components/FileUpload/FileUpload";
import { useDropzone } from "react-dropzone";

import Card from "@leafygreen-ui/card";
import { H2, H3, Body } from "@leafygreen-ui/typography";

import Toast from "@leafygreen-ui/toast";
import Button from "@leafygreen-ui/button";

import TextArea from "@leafygreen-ui/text-area";

import FormFooter from "@leafygreen-ui/form-footer";

import { app } from "../../realmApp/realmApp";
import * as Realm from "realm-web";

export const Upload = () => {
  const [user, setUser] = useState<any>();
  const [file, setFile] = useState<any>();
  const [notesValue, setNotesValue] = useState("");
  const [casesCards, setCasesCards] = useState([]);
  const [similarSummary, setSimilarSummary] = useState([]);
  const [successToastOpen, setSuccessToastOpen] = useState(false);
  const [progressToastOpen, setProgressToastOpen] = useState(false);

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
        <Row className="mt-5">
          <Col>
            <TextArea
              className="fieldMargin"
              baseFontSize={13}
              label="Notes / Input"
              description=""
              value={notesValue}
              onChange={(event) => setNotesValue(event.target.value)}
            />
            {/* <FileUpload onDrop={onDrop} /> */}
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
