import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
/******* react bootstrap components *******/
import {Navbar, Nav, Container, Form, FormControl, Button} from 'react-bootstrap';
/********* components *********/
import About from './components/about';
import Explore from './components/explore';
import Help from './components/help';
/********** icons ***********/
import searchIcon from './icons/search.svg';
import githubIcon from './icons/github.svg';
import linkedinIcon from './icons/linkedin.svg';

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar bg="myRed" expand="lg" variant='dark' sticky='top' >
          <Container>
            <Navbar.Brand href="#home">Blog</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav" >
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">Explore</Nav.Link>
                <Nav.Link as={Link} to="/about">About</Nav.Link>
                <Nav.Link as={Link} to="/help">Help</Nav.Link>
              </Nav>
              <Form className="d-flex bg-dark me-2">
                <FormControl
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <Button variant="btn-primary" >
                  <img src={searchIcon} alt="" height="25px"/>
                </Button>
              </Form>
              <div>
                <Button variant="btn-primary bg-light" className='me-2'>Sign up</Button>
              </div>
              <div>
                <Button variant="primary">Sign In</Button>
              </div>
              </Navbar.Collapse>
          </Container>
        </Navbar>
        <Routes>
          <Route  path='/' element={<Explore/>}/>
          <Route  path='/about' element={<About/>}/>
          <Route  path='/help' element={<Help/>}/>
        </Routes>
        <footer className="mainFooter">
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
  );
}

export default App;
