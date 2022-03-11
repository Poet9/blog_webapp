import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";

export default function Login() {
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    if(isAuthenticated){
        console.log("yawed rak connecter ya si zabi", isAuthenticated)
    }
    return <button onClick={() => loginWithRedirect()} 
                className='btn btn-primary text-light me-2'
            >Sign in</button>
}
