import "../home/Home.css";
import { Col, Row } from "react-bootstrap";
import { H1 } from "@leafygreen-ui/typography";
import Layout from "../../components/Layout/Layout";

export const HomeComponent = () => {
  return (
    <Layout>
      <div>
        <Row className="hero-image">
          <Col>
            <div className="hero-items">
              <H1 className="hero-text">Health Progress Monitor</H1>
            </div>
          </Col>
        </Row>

      </div>
    </Layout>
  );
};
