import React from "react";
import { useSelector } from "react-redux";
import { Card, Button } from "react-bootstrap";
import { selectUser } from "../../store/user/selectors";



export default function UserProfile() {
const user = useSelector(selectUser);
const {imageURL, name, email} = user
  return (

    <Card style={{ width: "100%" }}>
      <Card.Img
        variant="top"
        style={{width: "100px", borderRadius: "100px", margin: "0 auto"  }}
        src={imageURL}
      />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          {email}
        </Card.Text>
        <Button variant="warning">Trip History</Button>
      </Card.Body>
    </Card>
  );
}
