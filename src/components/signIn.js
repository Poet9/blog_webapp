import React, { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styles from './signIn.module.css';
import loadingIcon from "../icons/loader.svg";

export default function SignIn(props) {
    props.searchDisplay(false); // hiding search bar
    const user = useSelector(state => state.user.value);
    const navigate = useNavigate();
    useEffect(()=>{
        if(user.username?.length > 1) navigate("/");
    }, []);
    // if sign in button is clicked return the image loader
    const [signInButtonClicked, setSignInButtonClicked] = useState(false);
    // signing in 
    const signingInFunc = (e) => {
        e.preventDefault();
        setSignInButtonClicked(true);
        /**** add code for signing in/up logic  ******/
        if(e.target.lastChild.id === "signInBtnContainer"){
            /**** add code for signing in logic  ******/
        }
        else if(e.target.lastChild.id === "signUpSubmitBtn") {

        }
    };
    // activate sign up form function 
    const [activateSignUpForm, setActivateSignUpForm] = useState(false);
    const activateSignUpFormFunc= ()=>{
        if(activateSignUpForm){
            return <button id='signUpSubmitBtn' type="submit" className="btn btn-primary">
                {signInButtonClicked? <img className={styles.loadingIcon} src={loadingIcon} alt='' width="30px"/>: "Sign in"}
            </button>
        }
         return <div id='signInBtnContainer' className='d-flex flex-column'>
            <button id='signInSubmitBtn' type="submit" className="btn btn-primary ">
                {signInButtonClicked? <img className={styles.loadingIcon} src={loadingIcon} alt='' width="30px"/>: "Sign in"}
            </button>
            <button  onClick={()=>setActivateSignUpForm(true)} className="btn bg-light my-2">
                Sign up
            </button>
        </div>
    }
    return <div className={styles.signInPageMain}>
        <form onSubmit={signingInFunc} className={styles.signInForm+' col-xl-3 col-lg-4 col-md-8 d-flex flex-column mx-md-4 py-5 px-4'}>
        {activateSignUpForm && <input type="text" className="form-control my-2" id="signUpInputUsername" aria-describedby="usernameHelp" placeholder="Username" required />}
            <input type="email" className="form-control my-2" id="signInInputEmail" aria-describedby="emailHelp" placeholder="Email" required/>
            <input type="password" className="form-control my-2" id="signInInputPassword" placeholder="Password" required/>
            <div className="form-check">
                <input type="checkbox" className="form-check-input my-1" id="signInInputTerms" required/>
                <label className="form-check-label" for="exampleCheck1">
                    <small>I agree to 
                        <a href="#" target="_blank" rel="noopener noreferrer"> the terms of use</a> 
                    </small>
                </label>
            </div>
            {activateSignUpFormFunc()}
        </form>
    </div>;
}
