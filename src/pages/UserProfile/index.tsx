import React from "react";
import { useSelector } from "react-redux";
import { Card } from "react-bootstrap";
import { selectUser } from "../../store/user/selectors";
import { selectReservation } from "../../store/reservation/selectors"



export default function UserProfile() {
const user = useSelector(selectUser)
const {imageURL, name, email} = user

const reservation = useSelector(selectReservation)
console.log("USER RES", reservation)

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
        <Card.Text>
          Current Trip:
            <ul><li>Started at: {reservation.startTime}</li></ul>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
