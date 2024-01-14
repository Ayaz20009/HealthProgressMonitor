import "../home/Home.css";
import { Col, Row } from "react-bootstrap";
import { H1 } from "@leafygreen-ui/typography";
import FileUpload from "../../components/FileUpload/FileUpload";
import Layout from "../../components/Layout/Layout";
import { useState, useEffect, useCallback } from "react";
import { app } from "../../realmApp/realmApp";
import FormFooter from "@leafygreen-ui/form-footer";
import * as Realm from "realm-web";
import { SideNav, SideNavGroup, SideNavItem } from '@leafygreen-ui/side-nav';
import {useDropzone} from 'react-dropzone';

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

  const onDrop = useCallback(acceptedFiles => {

    if (typeof acceptedFiles === undefined) return;

    console.log(acceptedFiles)

    // const url = `https://api.cloudinary.com/v1_1/dpwzj4gks/upload`;
    // const fd = new FormData();
    // fd.append('upload_preset', "iwpddmlf");
    // fd.append('api_key', process.env.REACT_APP_CLOUDINARY_API_KEY); 
    // fd.append('file', acceptedFiles);
  
    // fetch(url, {
    //   method: 'POST',
    //   body: fd,
    // })
    //   .then((response) => console.log(response))
    //   .then((data) => {
    //     console.log(data)
    //   })
    //   .catch((error) => {
    //     console.error('Error uploading the file:', error);
    //   });
  }, [])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <Layout>
      <div className="page-container">
        <Row className="hero-image">
            <Col>
                <div className="hero-items">
                    <H1 className="hero-text">Health Progress Monitor</H1>
                </div>
            </Col>
        </Row>
        <Row className="content">
            {/* Other content goes here */}
        </Row>
        <Row className="footer-row">
            <Col>
              <FileUpload onDrop={onDrop}/>

              {/* <div {...getRootProps()}>
              <input {...getInputProps()} />
              {
                isDragActive ?
                  <p>Drop the files here ...</p> :
                  <p>Drag 'n' drop some files here, or click to select files</p>
              }
            </div> */}
            </Col>
        </Row>
    </div>
    </Layout>


  );
};
