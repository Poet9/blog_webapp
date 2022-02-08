import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import styles from './explore.module.css';
import BlogCard from './blogCard';
import Filters from './filters';
/******* icons & pics ******/

export default function Explore(props) {
  props.searchDisplay(true); // showing search bar
  /******* dummy fav users  to be deleted later ******/
  const favUsers = useSelector(state => state.user.favUsers);


  return <div >
    <div className={styles.exploreBg}>
      <div className='row d-flex '>
        <div className='col-lg-auto'>
          <h1 className={styles.presentationH1+' display-3 text-light'}>Thoughts are nothing if not explored</h1>
        </div>
        <div className='col-lg d-flex flex-row-reverse'>
        <img 
          className='float-left'
          src="https://media4.giphy.com/media/oNPfdkokpn5uDk3t8N/giphy.gif?cid=790b761109342d23cd3c1ac4284ade16b7e3bc2629b2eabd&rid=giphy.gif&ct=g" 
          alt=""  width="350px" height="250px" />
        </div>
      </div>
    </div>
    <Container className='mx-0'>
      <Row >
        <Filters favUsers={favUsers} />
        <Col xl={9} >
          <h1 className='my-5 text-light'>TRENDING BLOGS</h1>
          <BlogCard />
        </Col>
      </Row>
    </Container>

  </div>;
}
