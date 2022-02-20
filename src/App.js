import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import './App.css';
/******* react bootstrap components *******/
import {Navbar, Nav, Collapse, Container, Form, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
/********* components *********/
import About from './components/about';
import Explore from './components/explore';
import Help from './components/help';
import PageNoteFound from './components/pageNoteFound';
import SignIn from './components/signIn';
import requestTemplate from './utilities/requestTemplate';
import UserAcc from "./components/user";
import MyAcc from "./components/me";
import Blogpost from './components/blogpost';
/*********** STORE  *******/
import { useDispatch, useSelector } from 'react-redux';
import {setBlogTitle} from "./features/filter";
import { setUser, clearUser } from './features/user';
/********** icons ***********/
import searchIcon from './icons/search.svg';
import githubIcon from './icons/github.svg';
import linkedinIcon from './icons/linkedin.svg';
import defautAvatar from './img/avatardefault.png';
import logoIcon from './img/blog_logo.png';

export const UserContext = React.createContext({});

const fetchUserFunc = async (dispatchUser, setActiveUser) =>{
  requestTemplate(`users/1`, 'GET', 'include')
  .then((res) => res.json())
  .then((data)=> {
    dispatchUser(setUser(data));
    setActiveUser(data);
  })
  .catch(e => console.log("error fetching blogs: ", e.message));
}
//main component
function App() {
    // user fetching  
    const [activeUser, setActiveUser] = useState({});
    const dispatch = useDispatch();
    useEffect(() => {
      fetchUserFunc(dispatch, setActiveUser);
    }, [dispatch])
  
    //Control apearance/disapearance of the search bar
    const [searchDisplay, setSearchDisplay] = useState(false); 
    const searchDisplayFunc = ()=> {if(!searchDisplay) return 'd-none'; return 'd-flex';}
    //searched blog 
    const searchingForBlogFunc = (e)=>{
      e.preventDefault();
      dispatch(setBlogTitle(e.target.firstChild.value));
    }
    // suggesting blog titles while typing in search
    const blogsAvailable = useSelector(state => state.blogs.value);
    const blogTitleListFunc = ()=>{
      return <datalist id='blogTitlesList'>
          {blogsAvailable.map((blog, index)=> <option key={index} value={blog.title}/>)}
        </datalist>
    }
    // user object state
    const [userOptionsDisplay, setUserOptionsDisplay] = useState(false);
    //function for navbar display tha checks if user is logged in 
    const SignedInFunc = () =>{
      if(activeUser.username?.length > 1){
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
    const logoutFunc = ()=>{ //handling logging out 
      dispatch(clearUser({id: activeUser.id}));
      setUserOptionsDisplay(false);
      setActiveUser({});
    }
  return (
    <UserContext.Provider value={activeUser}>
    <BrowserRouter>
      <div className="bg-dark">
        <Navbar bg="myRed"
          expand="lg" variant='dark' sticky='top' >
          <Container >
            <Navbar.Brand href="/">
              <img src={logoIcon} alt="" width="30" height="30" className="d-inline-block align-top"/>
              </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav" >
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">Explore</Nav.Link>
                <Nav.Link as={Link} to="/about">About</Nav.Link>
                <Nav.Link as={Link} to="/help">Help</Nav.Link>
              </Nav>
              <Form onSubmit={searchingForBlogFunc} className={searchDisplayFunc()+" bg-dark me-2"}>
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
                  <img src={searchIcon} alt="" height="25px"/>
                </Button>
              </Form>
              <SignedInFunc />
              </Navbar.Collapse>
          </Container>
        </Navbar>
        <Collapse className='bg-dark position-fixed' in={userOptionsDisplay}>
          <div className='userOptionsStyle'>
            <Nav className='flex-column' onClick={()=>setUserOptionsDisplay(false)}>
              <Nav.Link as={Link} to='/users/:username' className='userOptionNav text-light'>View account</Nav.Link>
              <Nav.Link as={Link} to='/users/me' className='userOptionNav text-light'>Account setting</Nav.Link>
              <Nav.Link className='text-light'> 
                <Button variant="primary" onClick={logoutFunc} className='w-100'>Logout</Button>
              </Nav.Link>
            </Nav>
          </div>
      </Collapse>
        <Routes>
          <Route path='/' element={<Explore searchDisplay={setSearchDisplay} />}/>
          <Route path='/about' element={<About />}/>
          <Route path='/help' element={<Help />}/>
          <Route path='/signin' element={<SignIn />} />
          <Route path='/blog/:id' element={<Blogpost  blogId={''}/>} />
          <Route path='/users/me' element={<MyAcc />} />
          <Route path='/users/:username' element={<UserAcc />} />
          <Route path='/*' element={<PageNoteFound />} />
        </Routes>
        <footer className="mainFooter text-light">
          <div className='d-flex px-5'>
            <h5 className='px-3'>Contact me on </h5>
            <a href="https://github.com/poet9" rel="noreferrer" target="_blank">
              <img className='rounded-circle bg-secondary p-1' src={githubIcon} alt='' width='30px' />
            </a>
            <a className='mx-2 ' href="https://www.linkedin.com/in/amine-bouhamri-9b0b9b1b2" rel="noreferrer" target="_blank">
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
