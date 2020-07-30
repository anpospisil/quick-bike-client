import React, { useState } from "react";import { useDispatch, useSelector } from "react-redux";
import { Card, Button, Form } from "react-bootstrap";
import { updateProfilePic} from "../../store/user/actions"
import "./UserProfile.scss";
import { selectUser } from "../../store/user/selectors";


export default function UserProfile() {
  const dispatch = useDispatch()
  const [profileImage, setProfileImage] = useState("");
  const [display, setDisplay] = useState(false);
  const user = useSelector(selectUser);



  const { imageURL, name, email, reservation } = user;

  function profilePicHandler(){
    dispatch(updateProfilePic(profileImage))
    setProfileImage("")
    setDisplay(false)
  }

  function displayHandler(){
    setDisplay(true)
  }


  return (
    <Card style={{ width: "100%" }} className="text-center">
      <Card.Img
        variant="top"
        style={{ width: "100px", height:"100px", borderRadius: "50%", margin: "0 auto" }}
        src={imageURL}
      />
      <Button variant="outline-light" onClick={displayHandler} >Update Profile Picture </Button>
      {display ? 
      <Form>
      <Form.Group controlId="formBasicEmail">
          <Form.Label>Input profile image URL here:</Form.Label>
          <Form.Control
            value={profileImage}
            onChange={e => setProfileImage(e.target.value)}
            type="text"
            placeholder="image URL"
            required
          />
        </Form.Group>
      <Form.Group>
      <Button variant="warning" size="sm" className="col-lg-2" onClick={profilePicHandler}>Submit</Button>
      </Form.Group>
      </Form>
      : null}
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{email}</Card.Text>
        <Card.Text>
          Current Reservation:
          <ul>
            <li>Started at: {reservation?.startTime}</li>
            <li></li>
          </ul>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
