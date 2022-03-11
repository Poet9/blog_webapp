import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { clearUser } from '../features/user';
import { useDispatch } from 'react-redux';

export default function Logout() {
    const { logout } = useAuth0();
    const dispatch = useDispatch();
    const logoutFunc = () =>{
        logout({ returnTo: window.location.origin });
        dispatch(clearUser());
    }
  return (
    <button className='btn btn-primary my-2' onClick={logoutFunc}>Logout</button>
  )
}
