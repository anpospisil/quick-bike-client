import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Button } from "react-bootstrap";
import {fetchUserReservations} from "../../store/reservation/actions"
import { selectUser } from "../../store/user/selectors";
import { selectUserReservations } from "../../store/reservation/selectors";


export default function UserProfile() {
  const dispatch=useDispatch()
  const user = useSelector(selectUser);
  const reservations = useSelector(selectUserReservations);

const {imageURL, name, email} = user


function tripHandler(e: any) {
  e.preventDefault();
    dispatch(fetchUserReservations);
}

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
        <Card.Title>Trip History</Card.Title>
        <Card.Text>{reservations}</Card.Text>
        <Button variant="warning" onClick={tripHandler}>Trip History</Button>
      </Card.Body>
    </Card>
  );
}
