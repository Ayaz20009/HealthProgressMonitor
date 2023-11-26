/**
 * Card Component
 *
 * Description:
 * This component is responsible for rendering individual cards on the home page. It makes use of the
 * Bootstrap grid system for layout and utilizes the Card component from the 'leafy' library.
 *
 * Usage:
 * This component is intended to be used within the home.tsx file.
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
import Badge from "@leafygreen-ui/badge";
import { H2, H3, Body } from "@leafygreen-ui/typography";
import "../Cards/Cards.css";

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


function Cards({ cardData }: Props) {
  const navigate = useNavigate();

  return (
    <>
      {cardData.map((req, index) => (
        <Col key={req.cardLink} xs={12} sm={6} md={4} lg={2}>
          <Card
            as="article"
            contentStyle="clickable"
            onClick={() => {
              if (req.cardLink === "securityQuest") {
                window.open(
                  "https://docs.google.com/document/d/1pn1x5w5tauDp5WhHcLSa3TFyp9Lgt_iJpFkmriprSvw",
                  "_blank"
                );
              } else {
                navigate(`/${req.cardLink}`);
              }
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
            <Row>
              <Col>
                <Badge variant="yellow" className="my-badge">
                  Lead time: {req.leadTime}
                </Badge>
              </Col>
            </Row>
          </Card>
        </Col>
      ))}
    </>
  );
}

export default Cards;
