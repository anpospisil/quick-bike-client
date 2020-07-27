import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Button, Form } from "react-bootstrap";
import Joyride, { STATUS } from "react-joyride";
import "./Lock.scss";
import lock from "../../img/lock.svg";
import bike from "../../img/bike.svg";
import unlock from "../../img/unlock.svg";
import { unlockBike, lockBike } from "../../store/bike/actions";
import { selectUser } from "../../store/user/selectors";
import { selectBikes } from "../../store/bike/selectors";
// import { fetchCurrentReservation } from "../../store/user/actions"
// import { Reservation } from "../../types/Reservation"

export default function Lock() {
  const user = useSelector(selectUser);
  console.log("User BIKE", user);
  const { reservation } = user;
  const bikes = useSelector(selectBikes);
  const dispatch = useDispatch();

  const [ code, setCode] = useState<number>(0)

  const userBike = bikes.find(
    (bike: any) => bike.id === reservation.reservation.bikeId
  );

  console.log("USER BIKE 11111", userBike);

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getPosition);
  }
  function getPosition(position: any) {
    console.log(
      "current location",
      position.coords.latitude,
      position.coords.longitude
    );
  }

  const [tutorial2Passed, setTutorial2Passed] = useState(false);

  const steps = [
    {
      target: ".step1",
      title: "(◕ ˬ ◕✿)",
      content: `Welcome! I'm here to explain how to unlock your Quick Bike!`,
    },
    {
      target: ".step2",
      title: "(◕ っ ◕✿)",
      content:
        "Check the digital display attached to the seat post. You will find a unique 6-digit code generated upon reserving",
    },
    {
      target: ".step3",
      title: "┗(◕ ワ ◕✿)",
      content: "Input this special code HERE.",
    },
    {
      target: ".step4",
      title: "(◠‿◠✿)",
      content: "Tap to unlock and voila! You are ready to go!",
    },
    {
      target: ".step5",
      title: "(◡‿◡✿)",
      content:
        "Your code will remain the same for the duration of your trip. Safe travels!",
    },
  ];
  function unlockHandler(e: any) {
    e.preventDefault();
    dispatch(unlockBike( code ));
    setCode(0)
  }

  function lockHandler(e: any) {
    e.preventDefault();
    dispatch(lockBike());
  }

  return (
    <div>
      <Joyride
        steps={steps}
        callback={({ status }) => {
          if (
            ([STATUS.FINISHED, STATUS.SKIPPED] as string[]).includes(status)
          ) {
            window.localStorage.setItem("tutorial2Passed", "true");
            setTutorial2Passed(true);
          }
        }}
        showProgress
        showSkipButton
        spotlightClicks
        continuous
        styles={{
          options: {
            zIndex: 1100,
          },
        }}
      />
      {userBike.locked === true ? (
        <Card style={{ width: "100%" }}>
          <Card.Text className="step1">
            You have reserved: CLAUDETTE @ CLAUDETTES LOCATION
          </Card.Text>
          <Card.Img
            className="step2 step5"
            src={bike}
            style={{ width: "100px", margin: "0 auto" }}
          />
          <Card.Img
            variant="top"
            style={{ width: "100px", margin: "0 auto" }}
            src={unlock}
          />
          <Card.Body>
            <Card.Text>Bike Locked!</Card.Text>
            <Form className="text-center">
              <Form.Control
                className="step3"
                id="partitioned"
                type="number"
                maxLength={6}
                onChange={e => setCode(parseInt(e.target.value))}
              />

              <Button
                className="step4"
                variant="warning"
                type="submit"
                onClick={unlockHandler}
              >
                Unlock Bike
              </Button>
            </Form>
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
            <Button variant="warning" onClick={lockHandler}>
              Lock Bike
            </Button>
          </Card.Body>
        </Card>
      )}
    </div>
  );
}
