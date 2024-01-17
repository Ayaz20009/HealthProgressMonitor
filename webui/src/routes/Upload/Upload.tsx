import "../Upload/Upload.css";
import Layout from "../../components/Layout/Layout";
import CasesCard from "../../components/Card/CasesCard/CasesCard";
import { H1 } from "@leafygreen-ui/typography";
import { useCallback, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import FileUpload from "../../components/FileUpload/FileUpload";
import { useDropzone } from "react-dropzone";

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
    if (user === undefined) return;
    setCasesCards([])


    const result = await user.functions.similarityCheck(notesValue);
    setCasesCards(result)
    console.log(result);
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    if (typeof acceptedFiles === undefined) return;

    console.log(acceptedFiles);
    setFile(acceptedFiles);

    // const url = `https://us-east4.gcp.data.mongodb-api.com/app/testing-yeyvp/endpoint/uploadingfile`;
    const fd = new FormData();
    fd.append("file", acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Layout>
      <div className="page-container">
        <Row className="mt-5">
            <Col>
                <TextArea
                    className="fieldMargin"
                    baseFontSize={13}
                    label="Notes"
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
    </div>
    </Layout>
  );
};
