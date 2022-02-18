import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { setUser, clearUser } from '../features/user';
import requestTemplate from '../utilities/requestTemplate';
import defaultUserImg from '../img/avatardefault.png';
const fetchUserData = async (navigate, setUserData, dispatch) =>{
    requestTemplate(`users/1`)
    .then((res) => {
      if(res.status !== 200){throw new Error("User not found");}
      return res.json();
    }).then((data)=> setUserData({...data}))
    .catch(e => {
        dispatch(clearUser());// set user to empty
        navigate('/');
        console.log("error fetching user: ", e.message)
    });
  }
/***** fetch user image  ******/
// user component
export default function ActiveUser() {
    const dispatch = useDispatch();
    const [userData, setUserData] = useState({}); //set user data
    const navigate = useNavigate(); // to redirect if user is not logged in
    useEffect(() => {
        // you'll fetch user data
        fetchUserData(navigate, setUserData, dispatch);
    }, []);

    // edit/submitting user states
    const [userEditing, setUserEditing] = useState(false);
    const [submitEditing, setSubmitEditing] = useState(false);
    const submitEditingFunc = (e)=>{ // edit user info handler
      e.preventDefault();
      setSubmitEditing(true);
    }
    // showing hidding editing
    const isUserEditingFunc = () =>{
      if(!userEditing){
        return <>
          <input type="tel" className="form-control my-2" value={userData.email} readOnly />
          <input type="text" className="form-control my-2" value={userData.username} readOnly />
          <div className='d-flex py-3 flex-row-reverse'>
            <button onClick={()=>setUserEditing(true)} className="btn mx-2 btn-info px-5">Edit</button>
            <button onClick={()=>setUserEditing(true)} className="btn mx-2 btn-danger px-5">Delete account</button>
            <button className="btn mx-2 btn-primary px-5" title='logout from all open sessions'>logout all</button>
          </div>
        </>
      }
      return <form onSubmit={submitEditingFunc}>
          <input type="email" id='userEmailInput' className="form-control my-2" placeholder='Enter Email' />
          <input type="text" id='userUsernameInput' className="form-control my-2" placeholder='Enter username' />
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
            <img src={defaultUserImg} alt="" width="150px" height="150px" style={{borderRadius: "50%"}}/>
            <span className='display-3 p-4'>{userData.username}</span>
          </div>
          {isUserEditingFunc()}
        </div>
    </div>
  )
}
