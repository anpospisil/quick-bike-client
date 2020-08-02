import React, { useState, MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Button, Form } from "react-bootstrap";
import Joyride, { STATUS } from "react-joyride";
// import geolib from "geolib"
import "./Lock.scss";
import lock from "../../img/lock.svg";
import bike from "../../img/bike.svg";
import unlock from "../../img/unlock.svg";
import { unlockBike, lockBike } from "../../store/bike/actions";
import { selectUser } from "../../store/user/selectors";
import { selectBikes } from "../../store/bike/selectors";
import { Bike } from "../../types/Bike";
// import { fetchCurrentReservation } from "../../store/user/actions"
// import { Reservation } from "../../types/Reservation"

export default function Lock() {
  const user = useSelector(selectUser);
  console.log("User BIKE", user);
  const { reservation } = user;
  const bikes = useSelector(selectBikes);
  const dispatch = useDispatch();
  // const geolib = require('geolib');

  const [code, setCode] = useState<number | undefined>(undefined);

  const userBike = bikes.find((bike: Bike) => bike.id === reservation.bikeId);

  console.log("USER BIKE 11111", userBike);

  // Working with W3C Geolocation API
// navigator.geolocation.getCurrentPosition(
//   (position) => {
//       console.log(
//           'You are ',
//           geolib.getDistance(position.coords, {
//               latitude: userBike.latitude,
//               longitude: userBike.longetude,
//           }),
//           'meters away from your bike'
//       );
//   },
//   () => {
//       alert('Position could not be determined.');
//   }
// );

  // const [tutorial2Passed, setTutorial2Passed] = useState(false);

  const steps = [
    {
      target: ".step1",
      title: "(◕ ˬ ◕✿)",
      content: `Welcome! I'm here to explain how to unlock your Quick Bike!`,
      disableBeacon: true
    },
    {
      target: ".step2",
      title: "(◕ っ ◕✿)",
      content:
        "Check your confirmation EMAIL to find a unique 6-digit lock code.",
    },
    {
      target: ".step3",
      title: "┗(◕ ワ ◕✿)",
      content: "Input the code HERE.",
    },
    {
      target: ".step4",
      title: "(◠‿◠✿)",
      content: "Tap to unlock and voila! You are ready to roll!",
    },
    {
      target: ".step5",
      title: "(◡‿◡✿)",
      content:
        "Your code will remain the same for the duration of your trip. Safe travels!",
    },
  ];
  function unlockHandler(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    dispatch(unlockBike(code));
    setCode(undefined);
  }

  function lockHandler(e: MouseEvent<HTMLButtonElement>) {
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
            // setTutorial2Passed(true);
          }
        }}
        showProgress
        showSkipButton
        spotlightClicks
        continuous
        styles={{
          options: {
            arrowColor: "#F5F1EE",
            backgroundColor: "#F5F1EE",
            overlayColor: "rgba(79, 26, 0, 0.4)",
            primaryColor: "#f0ad4e",
            textColor: "#000",
            width: 400,
            zIndex: 1100,
          },
          tooltip: {
            fontSize: 16,
            letterSpacing: 1.25
          },
        }}
      />
      {userBike.locked === true ? (
        <Card style={{ width: "100%" }}>
          <Card.Img
            className="step2 step5"
            src={bike}
            style={{ width: "100px", margin: "0 auto" }}
          />
          <Card.Text className="step1">
            <span className="selectedBike">{userBike.name}</span>
          </Card.Text>

          <Card.Img
            variant="top"
            style={{ width: "100px", margin: "0 auto" }}
            src={unlock}
          />
          <Card.Body>
            <Card.Text>Bike Locked!</Card.Text>
            <Form className="lockCode">
              <Form.Control
                className="step3"
                id="partitioned"
                type="number"
                maxLength={6}
                onChange={(e) => setCode(parseInt(e.target.value))}
              />

              <Button
                className="step4 unlock-btn"
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
