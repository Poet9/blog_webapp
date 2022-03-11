import React from 'react';
import { Col, Row } from 'react-bootstrap';
import styles from './about.module.css';
/******* Icons ********/
import quoteIcon from '../icons/quote.svg';
import userIcon from '../img/avatardefault.png';

export default function About(props) {
  /******* contributors ******/
  // const contributors = [
  //   {img: userIcon, username: "johndoe", role: "whatever"},
  //   {img: userIcon, username: "janedoe", role: "writer"},
  //   {img: userIcon, username: "username123", role: "web developer"},
  // ]

  return <div className={styles.aboutPage+" text-light"}>
    <div className={styles.aboutPresentation}>
      <h1 className='display-2 text-light'>Project your thoughts in writings</h1>
    </div>
    <div className='my-5 px-3'>
      <h2 className='display-5'>About this projects</h2>
      <p className='px-3 h5'>
        This project was intended for learning purposes. It was made using multiple technologies like react and redux and bootstrap.
      </p>
      <blockquote className="px-5 blockquote">
        <p>
          <img src={quoteIcon} alt='' width="25px" /> 
          You can make anything by writting 
          <img className={styles.quoteIcon} src={quoteIcon} alt='' width="25px" />
        </p>
        <footer className="blockquote-footer">C.S. Lewis</footer>
    </blockquote>
    </div>
    <div className='mb-5 px-3'>
      <h2 className='display-5'>About the developer</h2>
      <p className='px-3 h5'>
        I am a control system engineer that is passionate about web development.
      </p>
    </div>
    <div className='mb-5 px-3'>
      {/* <h2>Contributors</h2>
      <Row className='px-3'>
        {contributors.map( (contributor, index) =>
          <Col sm={6} md={3} key={index} id={`contributor-${index}`} className="d-flex">
            <img src={contributor.img} alt="img" width="80px" height="80px" />
            <div className="px-2">
                <h6 className='mt-2 mb-0'>{contributor.username}</h6>
                <p className='text-secondary'>{contributor.role}</p>
            </div>
          </Col>
        )}
      </Row> */}
    </div>
  </div>;
}
