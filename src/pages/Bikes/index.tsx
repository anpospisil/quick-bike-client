import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBikes } from "../../store/bike/actions";
import { selectBikes } from "../../store/bike/selectors";
import { selectReservations } from "../../store/reservation/selectors";
import { selectUser } from "../../store/user/selectors";
import { createReservation, setBikeToReserved, endReservation } from "../../store/reservation/actions";
import { Bike } from "../../types/Bike";

import Map from "../../components/Map";
import { Container, Button, Form, Col } from "react-bootstrap";


export default function Bikes() {
  const dispatch = useDispatch();
  const bikes = useSelector(selectBikes);
  const user = useSelector(selectUser);
  const reservations = useSelector(selectReservations)

  const [selectedBike, setSelectedBike] = useState<Bike | undefined>(undefined);
  const [msg, setMsg] = useState<string |undefined>("")
  const [reserved, setReserved] = useState(false)
  console.log("THIS is selectedBike", selectedBike);
  console.log("This is bikes", bikes);

  useEffect(() => {
    dispatch(fetchAllBikes);
  }, [dispatch]);

  const userReservations = reservations.filter((reservation:any) => reservation.userId === user.id)

  const currentUserReservation = userReservations[userReservations.length - 1];

  console.log("USER RESERVATIONS",userReservations)

  function submitHandler(e: any) {
    e.preventDefault();
    if (selectedBike) {
      dispatch(createReservation(selectedBike.id));
      dispatch(setBikeToReserved(selectedBike.id))
    }
    setReserved(true)
    setMsg("Reserved. Safe travels!")
    setSelectedBike(undefined)
  }

  function endHandler(e: any) {
    e.preventDefault();
      dispatch(endReservation())
      setMsg("Reservation ended. Till next time!")
      setReserved(false)
      
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
         {currentUserReservation === false ? <p>Selected bike: {selectedBike?.name}</p> : null }
          <Form.Group className="mt-5">
          {reserved === false ? <Button variant="warning" type="button" style={{marginRight:"5px"}} onClick={submitHandler}>
              Reserve Bike
            </Button> : 
            <Button variant="warning" type="button" onClick={endHandler}>
              End Reservation
            </Button>
}
          </Form.Group>
        </Form>
      </Container>
      {reserved === true ? <p>{msg}</p> : null}


      
    </div>
  );
}
