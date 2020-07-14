import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Button } from "react-bootstrap";
import lock from "../../img/lock.svg";
import unlock from "../../img/unlock.svg";
import { toggleBikeLock} from "../../store/bike/actions"
import { selectReservation } from "../../store/reservation/selectors";
// import { Reservation } from "../../types/Reservation"

export default function Lock() {
  const reservation = useSelector(selectReservation);
  const dispatch = useDispatch();
  const { locked } = reservation

  function lockHandler(e: any) {
    e.preventDefault();
      dispatch(toggleBikeLock(locked))
  }

  return (
    <div>
      {locked === true ? (
        <Card style={{ width: "100%" }}>
          <Card.Img
            variant="top"
            style={{ width: "100px", margin: "0 auto" }}
            src={unlock}
          />
          <Card.Body>
            <Card.Text>Bike Locked!</Card.Text>
            <Button variant="warning" onClick={lockHandler}>Unlock Bike</Button>
          </Card.Body>
        </Card>
      ) : (
        <Card style={{ width: "100%" }}>
          <Card.Img
            variant="top"
            style={{ width: "100px", margin: "0 auto" }}
            src={lock}
          />
          <Card.Body>
            <Card.Text>Bike Unlocked!</Card.Text>
            <Button variant="warning" onClick={lockHandler}>Lock Bike</Button>
          </Card.Body>
        </Card>
      )}
    </div>
  );
}
