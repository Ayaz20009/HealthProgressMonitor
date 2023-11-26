/**
 * Home Page Component
 *
 * Description:
 * This component serves as the main page that users see after logging into the application. It features a
 * search bar (imported from the 'leafy' library) that allows users to search for cards. Below the search
 * bar, the component renders a collection of cards for all the services provided by CenSoS team.
 *
 * The Home component is associated with a specific route, allowing users to navigate directly to this
 * page after a successful login.
 *
 * Components Used:
 * - SearchBar from the 'leafy' library: Renders a search bar at the top of the page.
 * - CardComponent: Used to render individual cards for each item.
 *
 * Author:
 *  - Ayaz Shah (ayaz.shah@mongodb.com)
 */

import "../earrCalculator/earrCalculator.css";
import Layout from "../../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import { H1, Body, Label, Link } from "@leafygreen-ui/typography";


interface Props {
  isProtected: boolean;
}

export const EarrCalculator = ({ isProtected }: Props) => {

  const navigate = useNavigate();

  return (
    <Layout>
      <div>
      <Row className="form-hero-image">
          <Col>
            <H1 className="form-hero-text">EARR Calculator</H1>
          </Col>
        </Row>
        <Row className="navigationRow">
          <Col></Col>
          <Col xs={12} md={10} lg={10}>
            <Body className="navigationStyle">
              <a className="navigationRefStyle" href="/">
                Home
              </a>
              <span> &#62; </span> EARR Calculator
            </Body>
          </Col>
          <Col></Col>
        </Row>
        
      </div>
    </Layout>
  );
};
