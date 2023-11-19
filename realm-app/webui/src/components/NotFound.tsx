
import { useEffect } from 'react'
import {
  Col, Container, Row,
} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

interface Props {
}

export const NotFound = (props?: Props) => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/")
    }, 5 * 1000)
  }, [])

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <Container>
        <Row className="justify-content-center align-items-center px-3">
          <Col md={8} className="d-flex align-items-center justify-content-center p-5">
            <div className="text-center">
              <h2>😥</h2>
              <h2>Uh oh... looks like this page doesn't exist. You'll be redirected to the main page.</h2>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

