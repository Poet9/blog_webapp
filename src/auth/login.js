import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { setUser } from "../features/user";
import { useDispatch } from "react-redux";

export default function Login() {
  const { loginWithRedirect, isAuthenticated, user } = useAuth0();
  // login function
  const dispatch = useDispatch();
  const loginFunc = () => {
    loginWithRedirect()
      .then((data) => dispatch(setUser(user)))
      .catch((e) => dispatch(setUser({})));
  };
  isAuthenticated && loginFunc(); //verify if he is logged in
  return (
    <button onClick={loginFunc} className="btn btn-primary text-light me-2">
      Sign in
    </button>
  );
}
