import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import './App.css';
/******* react bootstrap components *******/
import {Navbar, Nav, Container, Form, FormControl, Collapse, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
/********* components *********/
import About from './components/about';
import Explore from './components/explore';
import Help from './components/help';
import PageNoteFound from './components/pageNoteFound';
import SignIn from './components/signIn';
/********** icons ***********/
import searchIcon from './icons/search.svg';
import githubIcon from './icons/github.svg';
import linkedinIcon from './icons/linkedin.svg';
import defautAvatar from './img/avatardefault.png';
import Blogpost from './components/blogpost';

export const UserContext = React.createContext({});

function App() {
  //control apearing/disappearing of navBar
  const [navBarDisplay, setNavBarDsplay]= useState(true); 
  const navBarDisplayFunc = () => {if(!navBarDisplay) return 'd-none'; return "";};
  //Control apearance/disapearance of the search bar
  const [searchDisplay, setSearchDisplay] = useState(true); 
  const searchDisplayFunc = ()=> {if(!searchDisplay) return 'd-none'; return 'd-flex';}
  // user object state
  const activeUser = useSelector(state=> state.user.value); 
  const [userOptionsDisplay, setUserOptionsDisplay] = useState(false);
  //function for navbar display tha checks if user is logged in 
  const SignedInFunc = () =>{
    if(activeUser.username.length > 1){
      return <div>
        <img className="userImgNav" 
          onClick={()=>setUserOptionsDisplay(!userOptionsDisplay)} 
          src={defautAvatar} alt="" width="40px" 
          height="40px" name="user" />
      </div>;
    }
    return <div>
        <Button variant="btn-primary bg-primary text-light"
          as={Link} to="/signin" 
          className=' me-2'>Sign in</Button>
    </div>
  }

  // logged in display in navbar
  return (
    <UserContext.Provider value={activeUser}>
    <BrowserRouter>
      <div className="bg-dark">
        <Navbar bg="myRed" 
          className={navBarDisplayFunc()} 
          expand="lg" variant='dark' sticky='top' >
          <Container >
            <Navbar.Brand href="#home">Blog</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav" >
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">Explore</Nav.Link>
                <Nav.Link as={Link} to="/about">About</Nav.Link>
                <Nav.Link as={Link} to="/help">Help</Nav.Link>
              </Nav>
              <Form className={searchDisplayFunc()+" bg-dark me-2"}>
                <FormControl
                  type="search"
                  className='bg-dark outline-none border-0'
                  placeholder="Search"
                  aria-label="Search"
                />
                <Button variant="btn-primary" >
                  <img src={searchIcon} alt="" height="25px"/>
                </Button>
              </Form>
              <SignedInFunc />
              </Navbar.Collapse>
          </Container>
        </Navbar>
        <Collapse className='bg-dark position-fixed end-lg-0 ' in={userOptionsDisplay}>
          <Nav className='flex-column'>
            <Nav.Link className='text-light'>View account</Nav.Link>
            <Nav.Link className='text-light'>Account setting</Nav.Link>
            <Nav.Link className='text-light'> 
            <Button variant="primary">Logout</Button>
            </Nav.Link>
          </Nav>
      </Collapse>
        <Routes>
          <Route  path='/' element={<Explore searchDisplay={setSearchDisplay} />}/>
          <Route  path='/about' element={<About searchDisplay={setSearchDisplay} />}/>
          <Route  path='/help' element={<Help searchDisplay={setSearchDisplay} />}/>
          <Route path='/signin' element={<SignIn searchDisplay={setSearchDisplay}/>} />
          <Route path='/*' element={<PageNoteFound active={setNavBarDsplay}/>} />
          <Route path='/blog/:id' element={<Blogpost searchDisplay={setSearchDisplay} blogId={''}/>} />
        </Routes>
        <footer className="mainFooter text-light">
          <div className='d-flex px-5'>
            <h5 className='px-3'>Contact me on </h5>
            <a href="https://github.com/poet9" rel="noreferrer" target="_blank">
              <img className='rounded-circle bg-secondary p-1' src={githubIcon} alt='' width='30px' />
            </a>
            <a className='mx-2 ' href="https://www.linkedin.com/" rel="noreferrer" target="_blank">
              <img className='rounded-circle bg-secondary p-1' src={linkedinIcon} alt='' width='30px'/>
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
