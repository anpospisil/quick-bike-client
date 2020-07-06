import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bikeId } from "../../types/Bike";
import { fetchAllBikes } from "../../store/bike/actions";
import { selectBikes } from "../../store/bike/selectors";
import { createReservation} from "../../store/reservation/actions";

import Map from "../../components/Map";
import { Container, Button, Form, Col } from "react-bootstrap";

interface BikeProps {
  id?: number;
  name?: string;
}

export default function Bikes() {
  const dispatch = useDispatch();
  const bikes = useSelector(selectBikes);
  const [bike, setBike] = useState();
  const [id, setId] = useState<bikeId>({id:1})

  console.log("This is bikes", bikes);
  useEffect(() => {
    dispatch(fetchAllBikes);
  }, [dispatch]);

  function submitHandler(e: any) {
    e.preventDefault();
    // @ts-ignore
    console.log("Bike ID", id)
    // dispatch(createReservation(id));
    setId({id:1});
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
                setId({id: parseInt(e.currentTarget.value)})
              }
            >
              {bikes.map((bike: any) => (
                <option key={bike.id} value={bike.id}>
                  {bike.name} - Lat {bike.latitude}, Long {bike.longitude}{" "}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form>
      </Container>
      <Form.Group className="mt-5">
      
        <Button variant="primary" type="submit" onClick={() => submitHandler}>
          Reserve Bike
        </Button>
      </Form.Group>

      <Map bikes={bikes} />
    </div>
  );
}
