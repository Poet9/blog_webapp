import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import { setUser, clearUser } from '../features/user';
import { useAuth0 } from '@auth0/auth0-react';
import backIcon from '../icons/arrow-left.svg';

/***** fetch user image  ******/
// user component
export default function ActiveUser() {
    //set user data
    const { user, isAuthenticated } = useAuth0();
    const dispatch = useDispatch();
    useEffect(() => {
        if(isAuthenticated){
          dispatch(setUser(user));
        }
    }, [isAuthenticated, dispatch, user]);

    // edit/submitting user states
    const [userEditing, setUserEditing] = useState(false);
    const [submitEditing, setSubmitEditing] = useState(false);
    const submitEditingFunc = (e)=>{ // edit user info handler
      e.preventDefault();
      setSubmitEditing(true);
    }
    // showing hidding editing
    const isUserEditingFunc = () =>{
      if(!user) return <></>;
      if(!userEditing){
        return <>
          <input type="email" className="form-control my-2" value={user.email} readOnly />
          <input type="text" className="form-control my-2" value={user.nickname} readOnly />
          <div className='d-flex py-3 flex-row-reverse'>
            <button onClick={()=>setUserEditing(true)} className="btn mx-2 btn-info px-5">Edit</button>
            <button onClick={()=>setUserEditing(true)} className="btn mx-2 btn-danger px-5">Delete account</button>
            <button className="btn mx-2 btn-primary px-5" title='logout from all open sessions'>logout all</button>
          </div>
        </>
      }
      return <form onSubmit={submitEditingFunc}>
          <img src={backIcon} alt="" width="30px" 
            style={{float: "left", marginBottom: "5px", cursor: "pointer"}} 
            onClick={()=> !submitEditing &&setUserEditing(false)}
          />
          <input type="email" id='userEmailInput' className="form-control my-2" placeholder='Enter Email' />
          <input type="text" id='userUsernameInput' className="form-control my-2" placeholder='Enter nickname' />
          <div className='d-flex flex-wrap my-3 ' style={{height: "50px"}}>
            <input type="password" className="form-control w-75 h-100" id="PasswordInputUserMe" placeholder="Password" required />
            <button className='btn btn-primary  w-25 h-100'  type='submit' >
              {submitEditing?  <Spinner animation="border"  role="status"></Spinner>:  "Submit"}
            </button> 
          </div>
        </form>
    }
    
  return (
    <div className='bg-dark text-light text-center' style={{height: "100vh", overflow: "scroll"}}>
        <div className='col-xl-6 col-lg-7 col-md-9 col-sm-11 d-inline-block pt-5'>
          <div className='d-flex py-3'>
            <img src={user?.picture} alt="" width="150px" height="150px" style={{borderRadius: "50%"}}/>
            <span className='display-3 p-4'>{user?.nickname}</span>
          </div>
          {isUserEditingFunc()}
        </div>
    </div>
  )
}
