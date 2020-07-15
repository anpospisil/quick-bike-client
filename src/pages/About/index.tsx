import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import blob from "../../img/blob.svg";
import lock from "../../img/lock.svg";
import "./About.css";

export default function About() {
  return (
    <div>
      <Row className="align-items-center">
        <Col className="col-lg-3">
          <Card className="text-white text-center">
            <Card.Img src={blob} alt="Card image" />
            <Card.ImgOverlay>
                <Card.Img className="cardIcon" src={lock}/>
              <Card.Title className="cardText" > Card title</Card.Title>
              <Card.Text className="cardText">
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </Card.Text>
              <Card.Text>Last updated 3 mins ago</Card.Text>
            </Card.ImgOverlay>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
