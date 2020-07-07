import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../store/user/actions";
import Button from "react-bootstrap/Button";

export default function LoggedIn() {
  const dispatch = useDispatch()
  return (
    <>
      <Button onClick={() => dispatch(logOut())}>Logout</Button>
    </>
  );
}