import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Button, Form } from "react-bootstrap";
import { updateProfilePic } from "../../store/user/actions";
import "./UserProfile.scss";
import { selectUser } from "../../store/user/selectors";

export default function UserProfile() {
  const dispatch = useDispatch();
  const [profileImage, setProfileImage] = useState("");
  const [display, setDisplay] = useState(false);
  const user = useSelector(selectUser);

  const { imageURL, name, email } = user;

  function profilePicHandler() {
    dispatch(updateProfilePic(profileImage));
    setProfileImage("");
    setDisplay(false);
  }

  function displayHandler() {
    setDisplay(true);
  }

  return (
    <div>
      <h1 className="mt-5">My Profile</h1>
      <Card className="user-pr" style={{ width: "100%" }}>
        <Card.Img variant="top" className="profile-pic" src={imageURL} />
        <Button
          variant="outline-light"
          onClick={displayHandler}
          size="sm"
          className="display-btn"
        >
          Update Profile Picture
        </Button>
        {display ? (
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Input profile image URL here:</Form.Label>
              <Form.Control
                className="col-lg-2"
                value={profileImage}
                onChange={(e) => setProfileImage(e.target.value)}
                type="text"
                placeholder="image URL"
                required
              />
            </Form.Group>
            <Form.Group>
              <Button
                variant="warning"
                size="sm"
                className="col-lg-2"
                onClick={profilePicHandler}
              >
                Submit
              </Button>
            </Form.Group>
          </Form>
        ) : null}
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>{email}</Card.Text>
          {/* <Card.Text>
          Current Reservation:
          <ul>
            <li>Started at: {reservation?.startTime}</li>
            <li></li>
          </ul>
        </Card.Text> */}
        </Card.Body>
      </Card>
    </div>
  );
}
