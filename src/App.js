import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import './App.css';
/******* react bootstrap components *******/
import { Navbar, Nav, Collapse, Container, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { useAuth0 } from '@auth0/auth0-react';
/********* components *********/
import About from './components/about';
import Explore from './components/explore';
import Help from './components/help';
import PageNoteFound from './components/pageNoteFound';
import requestTemplate from './utilities/requestTemplate';
import UserAcc from "./components/user";
import MyAcc from "./components/me";
import Blogpost from './components/blogpost';
import AuthLogin from './auth/login';
import AuthLogout from './auth/logout';
/*********** STORE  *******/
import { useDispatch, useSelector } from 'react-redux';
import { setBlogTitle } from "./features/filter";
import { setUser } from './features/user';
/********** icons ***********/
import searchIcon from './icons/search.svg';
import githubIcon from './icons/github.svg';
import linkedinIcon from './icons/linkedin.svg';
import logoIcon from './img/blog_logo.png';
export const UserContext = React.createContext({});

/****** request the posts *******/



//main component
function App() {
  // user fetching  
  const { user, isAuthenticated } = useAuth0();
  const dispatch = useDispatch();
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(setUser(user));
    }
  }, [dispatch, isAuthenticated, user])

  //Control apearance/disapearance of the search bar
  const [searchDisplay, setSearchDisplay] = useState(false);
  const searchDisplayFunc = () => { if (!searchDisplay) return 'd-none'; return 'd-flex'; }
  //searched blog 
  const searchingForBlogFunc = (e) => {
    e.preventDefault();
    dispatch(setBlogTitle(e.target.firstChild.value));
  }
  // suggesting blog titles while typing in search
  const blogsAvailable = useSelector(state => state.blogs.value);
  const blogTitleListFunc = () => {
    return <datalist id='blogTitlesList'>
      {blogsAvailable.map((blog, index) => <option key={index} value={blog.title} />)}
    </datalist>
  }
  // user object state
  const [userOptionsDisplay, setUserOptionsDisplay] = useState(false);
  //function for navbar display tha checks if user is logged in 
  const SignedInFunc = () => {
    if (user?.nickname.length > 1) {
      return <div className='pl-5'>
        <img className="userImgNav"
          onClick={() => setUserOptionsDisplay(!userOptionsDisplay)}
          src={user.picture} alt="" width="40px"
          height="40px" name="user" />
      </div>;
    }
    return <AuthLogin />
  }
  return (
    <UserContext.Provider value={user}>
      <BrowserRouter>
        <div className="bg-dark">
          <Navbar bg="myRed"
            expand="lg" variant='dark' sticky='top' >
            <Container className='m-0 w-xl-100'>
              <Navbar.Brand href="/">
                <img src={logoIcon} alt="" width="50px" height="50px" className="d-inline-block align-top" />
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav" className='float-right'>
                <Nav className="me-auto">
                  <Nav.Link as={Link} to="/">Explore</Nav.Link>
                  <Nav.Link as={Link} to="/about">About</Nav.Link>
                  <Nav.Link as={Link} to="/help">Help</Nav.Link>
                </Nav>
                <Form onSubmit={searchingForBlogFunc} className={searchDisplayFunc() + " bg-dark mx-5"}>
                  <input
                    type="text"
                    list='blogTitlesList'
                    className='bg-dark outline-none border-0 px-1 text-light'
                    placeholder="Search"
                    spellCheck="false"
                    required
                  />
                  {blogTitleListFunc()}
                  <Button type='submit' variant="btn-primary" >
                    <img src={searchIcon} alt="" height="25px" />
                  </Button>
                </Form>
                <SignedInFunc />
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <Collapse className='bg-dark position-fixed' in={userOptionsDisplay}>
            <div className='userOptionsStyle'>
              <Nav className='flex-column' onClick={() => setUserOptionsDisplay(false)}>
                <Nav.Link as={Link} to={`/users/${user?.nickname}`} className='userOptionNav text-light'>View account</Nav.Link>
                <Nav.Link as={Link} to='/users/me' className='userOptionNav text-light'>Account setting</Nav.Link>
                <Nav.Link className='text-light'>
                  <AuthLogout />
                </Nav.Link>
              </Nav>
            </div>
          </Collapse>
          <Routes>
            <Route path='/' element={<Explore searchDisplay={setSearchDisplay} />} />
            <Route path='/about' element={<About />} />
            <Route path='/help' element={<Help />} />
            <Route path='/blog/:id' element={<Blogpost blogId={''} />} />
            <Route path='/users/me' element={<MyAcc />} />
            <Route path='/users/:nickname' element={<UserAcc />} />
            <Route path='/*' element={<PageNoteFound />} />
          </Routes>
          <footer className="mainFooter text-light">
            <div className='d-flex px-5'>
              <h5 className='px-3'>Contact me on </h5>
              <a href="https://github.com/poet9" rel="noreferrer" target="_blank">
                <img className='rounded-circle bg-secondary p-1' src={githubIcon} alt='' width='30px' />
              </a>
              <a className='mx-2 ' href="https://www.linkedin.com/in/amine-bouhamri-9b0b9b1b2" rel="noreferrer" target="_blank">
                <img className='rounded-circle bg-secondary p-1' src={linkedinIcon} alt='' width='30px' />
              </a>
            </div>
            <h4 className='text-secondary pt-3 '>Made by poet9</h4>
          </footer>
        </div>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
