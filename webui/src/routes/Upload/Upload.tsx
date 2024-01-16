import "../Upload/Upload.css";
import Layout from "../../components/Layout/Layout";
import { H1 } from "@leafygreen-ui/typography";
import { useCallback } from "react";
import { Col, Row } from "react-bootstrap";
import FileUpload from "../../components/FileUpload/FileUpload";
import { useDropzone } from "react-dropzone";

export const Upload = () => {
  const onDrop = useCallback((acceptedFiles) => {
    if (typeof acceptedFiles === undefined) return;

    console.log(acceptedFiles);

    const url = `https://us-east4.gcp.data.mongodb-api.com/app/testing-yeyvp/endpoint/uploadingfile`;
    const fd = new FormData();
    fd.append("file", acceptedFiles);

    fetch(url, {
      method: "POST",
      body: fd,
      headers: {
        "x-api-key": process.env.REACT_APP_REALM_API_KEY,
      },
    })
      .then((response) => console.log(response))
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error uploading the file:", error);
      });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Layout>
      <div className="page-container">
        <Row className="mt-5">
          <Col>
            <FileUpload onDrop={onDrop} />
          </Col>
        </Row>
      </div>
    </Layout>
  );
};
