import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { selectReservation } from "../../store/reservation/selectors";
import { Reservation } from "../../types/Reservation"
export default function index() {
  const reservation = useSelector(selectReservation);
  const dispatch = useDispatch();
  
  const [locked, setLock] = useState<Reservation | undefined>(reservation.locked)

  function lockHandler(e: any) {
    e.preventDefault();
      dispatch(toggleBikeLock(!))
  }

  return (
    <div>
      {reservation.locked === true ? (
        <Button onClick={lockHandler}>Unlock Bike</Button>
      ) : (
        <Button onClick={lockHandler}>Lock Bike</Button>
      )}
    </div>
  );
}
