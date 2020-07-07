import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBikes } from "../../store/bike/actions";
import { selectBikes } from "../../store/bike/selectors";
import { createReservation} from "../../store/reservation/actions";
import { Bike } from "../../types/Bike"

import Map from "../../components/Map";
import { Container, Button, Form, Col } from "react-bootstrap";

export default function Bikes() {
  const dispatch = useDispatch();
  const bikes = useSelector(selectBikes);
  const [id, setId] = useState<number>(1)
  const [selectedBike, setSelectedBike] = useState<Bike | undefined>(undefined)
  console.log("THIS is selectedBike", selectedBike)
  console.log("This is bikes", bikes);
  useEffect(() => {
    dispatch(fetchAllBikes);
  }, [dispatch]);

  function submitHandler(e: any) {
    e.preventDefault();
    if (selectedBike){
    dispatch(createReservation(selectedBike.id));
    }
  }

  return (
    <div>
      <Container>
        <Form as={Col} md={{ span: 6, offset: 3 }} className="mt-5">
          <h1 className="mt-5 mb-5">Reserve a Bike</h1>
          <Form.Group controlId="formBike">
            <Form.Label>Bikes</Form.Label>
            <Form.Control
              as="select"
              // @ts-ignore
              value={id}
              // @ts-ignore
              onChange={(e: React.FormEvent<HTMLSelectElement>) =>
                setId(parseInt(e.currentTarget.value))
              }
            >
              {bikes.map((bike: any) => (
                <option key={bike.id} value={bike.id}>
                  {bike.name} - Lat {bike.latitude}, Long {bike.longitude}{" "}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group className="mt-5">
      
        <Button variant="primary" type="button" onClick={submitHandler}>
          Reserve Bike
        </Button>
      </Form.Group>
        </Form>
      </Container>
      

      <Map bikes={bikes} setSelectedBike={setSelectedBike} />
    </div>
  );
}
