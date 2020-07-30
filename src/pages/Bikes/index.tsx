import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBikes } from "../../store/bike/actions";
import { selectBikes } from "../../store/bike/selectors";
import { selectUser } from "../../store/user/selectors";
import {
  createReservation,
  endReservation,
  sendEmail,
} from "../../store/reservation/actions";
import { Bike } from "../../types/Bike";

import Map from "../../components/Map";
import { Container, Button, Form, Col } from "react-bootstrap";

export default function Bikes() {
  const dispatch = useDispatch();
  const bikes = useSelector(selectBikes);
  const user = useSelector(selectUser);

  const [selectedBike, setSelectedBike] = useState<Bike | undefined>(undefined);
  const [msg, setMsg] = useState<string | undefined>("");
  console.log("THIS is selectedBike", selectedBike);
  console.log("This is bikes", bikes);

  useEffect(() => {
    dispatch(fetchAllBikes);
  }, [dispatch]);

  const userReservation = user.reservation;

  console.log("USER RESERVATIONS", userReservation);

  function submitHandler(e: any) {
    e.preventDefault();
    if (selectedBike) {
      dispatch(createReservation(selectedBike.id));
      dispatch(sendEmail(selectedBike.name))
    }
    setMsg("Reserved. Safe travels!");
    setSelectedBike(undefined);
  }

  function endHandler(e: any) {
    e.preventDefault();
    dispatch(endReservation());
    setMsg("Reservation ended. Till next time!");
  }

  const fbikes = bikes.filter((bike: Bike) => {
    return bike.reserved === false;
  });

  return (
    <div>
      <Container>
        <Form as={Col} md={{ span: 6, offset: 3 }} className="mt-5">
          <h1 className="mt-5 mb-5">Reserve a Bike</h1>
          <Map bikes={fbikes} setSelectedBike={setSelectedBike} />
          {userReservation === null ? (
            <p>Selected bike: {selectedBike?.name}</p>
          ) : null}
          <Form.Group className="mt-5">
            {userReservation === null ? (
              <Button variant="warning" type="button" onClick={submitHandler}>
                Reserve Bike
              </Button>
            ) : (
              <Button variant="warning" type="button" onClick={endHandler}>
                End Reservation
              </Button>
            )}
          </Form.Group>
        </Form>
      </Container>
      {userReservation !== null ? <p>{msg}</p> : null}
    </div>
  );
}
