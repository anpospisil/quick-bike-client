import React from "react";
import { Card, Row, Col, Container } from "react-bootstrap";
import { Link }  from "react-router-dom"
import blob from "../../img/blob.svg";
import blob2 from "../../img/blob2.svg";
import blob3 from "../../img/blob3.svg";
import blob4 from "../../img/blob4.svg";
import register from "../../img/register.svg";
import map from "../../img/map.svg";
import lock from "../../img/lock.svg";
import bike from "../../img/bike.svg";
import "./About.scss";

export default function About() {
  return (
    <div>
      <h1 className="mt-5">What is QB?</h1>
      <Container>
        <Row className="align-items-center">
          <Col className="col-lg-6 col-sm-12 col-12">
            <Card className="h-100">
              <Card.Img className="bg-img" src={blob} alt="Card image" />
              <Card.ImgOverlay>
                <Card.Img className="cardIcon" src={register} />
                <Card.Title className="cardText">1. <Link to={"/signup"}>Register</Link> / <Link to={"/login"}>Log In</Link></Card.Title>
                <Card.Text className="cardText">Register or Login!</Card.Text>
              </Card.ImgOverlay>
            </Card>
          </Col>
          <Col className="col-lg-6 col-sm-12 col-12">
            <Card className="h-100">
              <Card.Img className="bg-img" src={blob2} alt="Card image" />
              <Card.ImgOverlay>
                <Card.Img className="cardIcon" src={map} />
                <Card.Title className="cardText">2. Reserve Bike</Card.Title>
                <Card.Text className="cardText">Pick a bike from the <Link to={"/"}>map</Link>.</Card.Text>
              </Card.ImgOverlay>
            </Card>
          </Col>
          <Col className="col-lg-6 col-sm-12 col-12">
            <Card className="h-100">
              <Card.Img className="bg-img" src={blob3} alt="Card image" />
              <Card.ImgOverlay>
                <Card.Img className="cardIcon" src={lock} />
                <Card.Title className="cardText">3. Unlock</Card.Title>
                <Card.Text className="cardText">Unlock your bike by inputting a 6 digit code.</Card.Text>
              </Card.ImgOverlay>
            </Card>
          </Col>
          <Col className="col-lg-6 col-sm-12 col-12">
            <Card className="h-100">
              <Card.Img className="bg-img" src={blob4} alt="Card image" />
              <Card.ImgOverlay>
                <Card.Img className="cardIcon" src={bike} />
                <Card.Title className="cardText">4. Ride</Card.Title>
                <Card.Text className="cardText">You're all set! Please return the bike to the QB location you found it.</Card.Text>
              </Card.ImgOverlay>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
