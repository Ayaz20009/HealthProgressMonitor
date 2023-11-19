/**
 * Webinar Card Component
 *
 * Description:
 * This component is responsible for rendering individual cards inside Webinar Modal in the Form Page. It makes use of the
 * Bootstrap grid system for layout and utilizes the Card component from the 'leafy' library.
 *
 * Usage:
 * This component is intended to be used within the WebinarModal.tsx file.
 *
 * Props:
 * - cardData (array): Card Data from the homePageData.json file
 * 
 * Author:
 *  - Ayaz Shah (ayaz.shah@mongodb.com)
 */

import Card from "@leafygreen-ui/card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import {
  H3,
  Body
} from "@leafygreen-ui/typography";
import "../Cards/Cards.css";
import { Container } from "react-bootstrap";

interface CardData {
  title: string;
  text: string;
  img: string;
  salesSegment: string[];
  cardLink: string;
  leadTime: string;
}

interface Props {
  cardData: CardData[];
}

function WebinarCards({ cardData }: Props) {
  const navigate = useNavigate();

  return (
    <>
      
        <Container>
          <Row>
          {cardData.map((req, index) => (
            <Col key={req.cardLink} xs={6} sm={6} md={6} lg={6}>
              <Card
                as="article"
                contentStyle="clickable"
                onClick={() => {
                  navigate(`/form/${req.cardLink}`);
                }}
              >
                <div>
                  <div className="embed-responsive embed-responsive-16by9">
                    <img
                      className="card-img-top embed-responsive-item"
                      src={require(`../../assets/${req.img}`)}
                      alt=""
                    />
                  </div>
                </div>
                <H3 className="title">{req.title}</H3>
                <Body className="body">{req.text}</Body>
              </Card>
            </Col>
            ))}
          </Row>
        </Container>
      
    </>
  );
}

export default WebinarCards;
