import React, { useEffect, useState } from 'react';
import { Container, Col, Offcanvas, Nav, Row } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/user';
import styles from './user.module.css';
import leftArrowIcon from '../icons/arrow-left.svg';
// components
import YourArticles from './user utils/YourArticles';
import CreateArticle from './user utils/CreateArticle';
import LikedArticles from './user utils/LikedArticles';
import FavoriteWriters from './user utils/FavoriteWriters';

export default function User() {
  const [currentFilter, setCurrentFilter] = useState("your_articles_opition");
  const { user } = useAuth0();
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      dispatch(setUser(user));
    }
  }, [user, dispatch]);
  // option nav function 
  function optionNavFunc(currentFilter, setCurrentFilter) {
    const selectedOptionFunc = (e) => {
      if(currentFilter === e.target.id) return ; // to avoid clicking something again
      document.getElementById(currentFilter)?.classList.remove(styles.UseroptionNavLinksActive);//remove class from old selected option
      // adding class to new selected option
      document.getElementById(e.target.id).classList.add(styles.UseroptionNavLinksActive);
      setCurrentFilter(e.target.id);// the new selected option
    }
    return (<Nav onClick={selectedOptionFunc} className='flex-column text-light py-3'>
      <Nav.Link id="create_article_opition" className={styles.UseroptionNavLinks + ' mt-4'}>Create article</Nav.Link>
      <Nav.Link id="your_articles_opition" className={styles.UseroptionNavLinks+' '+ styles.UseroptionNavLinksActive}>Your articles</Nav.Link>
      {/* <Nav.Link id="favorite_writers_opition" className={styles.UseroptionNavLinks}>Favorite writers</Nav.Link> */}
      <Nav.Link id="liked_articles_opition" className={styles.UseroptionNavLinks}>Liked articles</Nav.Link>
    </Nav>
    )
  }
  const optionColFunc = () => {
    if (window.innerWidth < 1320) {
      return <OffcanvasComponent optionNavFunc={()=>optionNavFunc(currentFilter, setCurrentFilter)} />
    }
    return <Col xxl={3} className={styles.userAccountOptions}>
      <div className='d-flex p-4'>
        <img src={user?.picture} alt="" width="70px" height="80px" />
        <h4 className='display-5 px-4'>{user?.nickname}</h4>
      </div>
      {optionNavFunc(currentFilter, setCurrentFilter)}
    </Col>
  }
  /******* render the chosen col oprtion *****/
  const ChosenOptionCol = ()=>{

    switch (currentFilter) {
      case 'create_article_opition':
          return <CreateArticle userId={user?.nickname} />;
      // case 'favorite_writers_opition':
      //     return <FavoriteWriters userId={user?.nickname} />;
      case 'liked_articles_opition':
          return <LikedArticles userId={user?.nickname} />;
      default:
        return <YourArticles userId={user?.nickname}/>;;
    }
  }
  return (
    <Container className="text-light px-0" style={{ minHeight: "100vh" }}>
      <Row className="w-100">
        {optionColFunc()}
        <Col style={{ overflowY: "scroll", height: "100vh", margin: "10px" }}>
          {ChosenOptionCol()}
        </Col>
      </Row>
    </Container>
  );
}



function OffcanvasComponent(props) {
  const [show, setShow] = useState(false);

  const { user } = useAuth0();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button className={'btn '+ styles.offCanvasButton} onClick={handleShow}>
        <img src={leftArrowIcon} alt='' width='35px' />
      </button>

      <Offcanvas className='bg-dark text-light' show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className='d-flex p-4'>
            <img src={user?.picture} alt="" width="70px" height="80px" />
            <h4 className='display-4 px-4'>{user?.nickname}</h4>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {props.optionNavFunc()}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}