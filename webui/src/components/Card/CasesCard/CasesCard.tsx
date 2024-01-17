import Card from "@leafygreen-ui/card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { H2, H3, Body } from "@leafygreen-ui/typography";

interface CardData {
  doctor_notes: string;
}

interface Props {
  cardData: CardData[];
}

export default function CasesCard({ cardData }: Props) {
  // const { name, patient_id } = props;

  return (
    <>
    <Row className="g-2 mt-2">
      {cardData.map((req, index) => (
        <Col key={index} xs={12} sm={6} md={4} lg={2}>
          <Card as="article" contentStyle="clickable">
            <Body className="body">{req.doctor_notes}</Body>
          </Card>
        </Col>
      ))}
    </Row>
  </>
  );
}
