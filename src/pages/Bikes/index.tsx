import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBikes } from "../../store/bike/actions";
import { selectBikes } from "../../store/bike/selectors";
import { createReservation } from "../../store/reservation/actions";
import { endReservation } from "../../store/reservation/actions";
import { Bike } from "../../types/Bike";

import Map from "../../components/Map";
import { Container, Button, Form, Col } from "react-bootstrap";

export default function Bikes() {
  const dispatch = useDispatch();
  const bikes = useSelector(selectBikes);

  const [selectedBike, setSelectedBike] = useState<Bike | undefined>(undefined);
  // const [reserved, setReserved] = useState(false)
  console.log("THIS is selectedBike", selectedBike);
  console.log("This is bikes", bikes);
  useEffect(() => {
    dispatch(fetchAllBikes);
  }, [dispatch]);

  function submitHandler(e: any) {
    e.preventDefault();
    if (selectedBike) {
      dispatch(createReservation(selectedBike.id));
    }
  }

  function endHandler(e: any) {
    e.preventDefault();
      dispatch(endReservation())
  }

  const fbikes = bikes.filter((bike:Bike): Bike | undefined => {
    if(bike.reserved !== true) {
      return bike
    } else {
      return undefined
    }
  }
  )
  console.log("RESSS", fbikes)

  return (
    <div>
      
      <Container>
        <Form as={Col} md={{ span: 6, offset: 3 }} className="mt-5">
          <h1 className="mt-5 mb-5">Reserve a Bike</h1>
          <Map bikes={fbikes} setSelectedBike={setSelectedBike} />
          <Form.Group className="mt-5">
            <Button variant="warning" type="button" style={{marginRight:"5px"}} onClick={submitHandler}>
              Reserve Bike
            </Button>
            <Button variant="warning" type="button" onClick={endHandler}>
              End Reservation
            </Button>
          </Form.Group>
        </Form>
      </Container>

      
    </div>
  );
}
