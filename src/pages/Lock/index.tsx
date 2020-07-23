import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Button } from "react-bootstrap";
import Joyride, { STATUS } from "react-joyride";
import "./Lock.scss";
import lock from "../../img/lock.svg";
import bike from "../../img/bike.svg";
import unlock from "../../img/unlock.svg";
import { toggleBikeLock } from "../../store/bike/actions";
import { selectUser } from "../../store/user/selectors";
import { selectBikes } from "../../store/bike/selectors";
// import { fetchCurrentReservation } from "../../store/user/actions"
// import { Reservation } from "../../types/Reservation"

export default function Lock() {
  const user = useSelector(selectUser);
  console.log("User BIKE", user)
  const bikes = useSelector(selectBikes);
  const dispatch = useDispatch();
  const { reservation } = user

  // const userBike = bikes.find((bike:any) => bike.id === reservation.reservation.bikeId ? bike : null)
  
  
  // useEffect(() => {
  //   dispatch(fetchCurrentReservation);
  // }, [dispatch]);

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getPosition);
  }
  function getPosition(position:any) {
    console.log("current location", position.coords.latitude, position.coords.longitude);
  }

  // const { locked } = reservation;
  const [ tutorial2Passed, setTutorial2Passed] = useState(false)

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
  function lockHandler(e: any) {
    e.preventDefault();
    // dispatch(toggleBikeLock(locked));
  }

  return (
    <div>
      <Joyride
        steps={steps}
        callback={({ status }) => {
          if (([STATUS.FINISHED, STATUS.SKIPPED] as string[]).includes(status)) {
            window.localStorage.setItem('tutorial2Passed', 'true');
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
      {/* {locked !== true ? ( */}
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
            <Card.Text className="step3">
              <input id="partitioned" type="number" maxLength={6}></input>
            </Card.Text>

            <Button className="step4" variant="warning" onClick={lockHandler}>
              Unlock Bike
            </Button>
          </Card.Body>
        </Card>
      {/* ) : ( */}
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
      {/* )} */}
    </div>
  );
}
