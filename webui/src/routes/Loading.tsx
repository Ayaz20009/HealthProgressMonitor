import { MongoDBLogoMark } from '@leafygreen-ui/logo';
import { Body, H3 } from '@leafygreen-ui/typography';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const Loading: React.FC = () => {
  return (
    <div className="bg-mongodb align-items-center pt-5">
    <Container className="bg-white login-container border pt-5 d-flex flex-row text-center ">
      <Col className="p-5">
        <MongoDBLogoMark height={40} />
        <Body className="login-title" baseFontSize={16} weight="medium">Health Progress Monitor</Body>
        <Row className="my-4 py-4 text-center">
          <H3>Loading...</H3>
        </Row>
      </Col>

    </Container>
  </div>
  );
};

export default Loading;