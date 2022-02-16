import React, { useEffect, useState } from 'react';
import { Col, Nav, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser, clearUser } from '../features/user';
import requestTemplate from '../utilities/requestTemplate';

const fetchUserData = async (navigate, setUserData, dispatch) =>{
    requestTemplate(`user/1`)
    .then((res) => res.json())
    .then((data)=> setUserData({data}))
    .catch(e => {
        dispatch(clearUser());// set user to empty
        navigate('/');
        console.log("error fetching blogs: ", e.message)
    });
  }
export default function ActiveUser() {
    const dispatch = useDispatch();
    const [userData, setUserData] = useState({}); //set user data
    const navigate = useNavigate(); // to redirect if user is not logged in
    useEffect(() => {
        // you'll fetch user data
        fetchUserData(navigate, setUserData, dispatch);
    }, [])
    
  return (
    <div className='bg-dark text-light h-100'>
        <Row >
        <Col xl={3}>
            <Nav >
                <Nav.Link>First </Nav.Link>
                <Nav.Link>Second </Nav.Link>
                <Nav.Link>Third </Nav.Link>
            </Nav>
        </Col>
        <Col xl={8}>
        </Col>
        </Row>
    </div>
  )
}
