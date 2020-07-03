import React, { useState, useEffect } from "react";
import { fetchAllBikes} from "../../store/bike/actions"
import { useDispatch, useSelector } from "react-redux"

import Map from "../../components/Map"
import { selectBikes } from "../../store/bike/selectors"
import { Container, Button, Form, Col } from "react-bootstrap";

interface BikeProps {
  id?: number;
  name?: string;
}

export default function Bikes() {
  const dispatch = useDispatch();
  const bikes  = useSelector(selectBikes)
    const [bike, setBike] = useState()

  console.log("This is bikes", bikes)
    useEffect(() => {
        dispatch(fetchAllBikes);
      }, [dispatch]);

      
      // const bikeHandler = (event) => {
      //   event.preventDefault();  
      //   console.log("RESERVATION!", bike);
      //   dispatch(reserveBike(bike));
      // };
      

    return (
        <div>
            <Container>
      <Form as={Col} md={{ span: 6, offset: 3 }} className="mt-5">
        <h1 className="mt-5 mb-5">Reserve a Bike</h1>
        <Form.Group controlId="formBike">
          <Form.Label>Bikes</Form.Label>
          <Form.Control as="select">
            {bikes.map((bike:any) => (
              <option>{bike.name} - Lat {bike.latitude}, Long {bike.longitude} </option>
            ))}
          </Form.Control>
        </Form.Group>
        </Form>
        </Container>
        <Form.Group className="mt-5">
          <Button variant="primary" type="submit">
          Bike Desu~
          </Button>
        </Form.Group>

        <Map bikes={bikes}/>
        </div>
    )
}