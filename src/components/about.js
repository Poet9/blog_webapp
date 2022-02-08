import React from 'react';
import { Col, Row } from 'react-bootstrap';
import styles from './about.module.css';
/******* Icons ********/
import quoteIcon from '../icons/quote.svg';
import userIcon from '../img/avatardefault.png';

export default function About(props) {
  props.searchDisplay(false); // hiding search bar
  /******* contributors ******/
  const contributors = [
    {img: userIcon, username: "johndoe", role: "whatever"},
    {img: userIcon, username: "janedoe", role: "writer"},
    {img: userIcon, username: "username123", role: "web developer"},
  ]

  return <div className={styles.aboutPage+" text-light"}>
    <div className={styles.aboutPresentation}>
      <h1 className='display-2 text-light'>Project your thoughts in writings</h1>
    </div>
    <div className='my-5 px-3'>
      <h2>About this projects</h2>
      <p className='px-3'>
        Fugiat amet tempor aute occaecat incididunt. Exercitation ipsum amet mollit dolore aliquip ut in labore veniam. Est ipsum minim excepteur pariatur occaecat dolore ipsum voluptate id aliqua ea ipsum Lorem laborum. Nisi exercitation commodo sunt laboris aliquip. Officia ea incididunt amet in incididunt aliquip minim nisi cillum.
      </p>
      <blockquote className="px-5 blockquote">
        <p>
          <img src={quoteIcon} alt='' width="25px" /> 
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante 
          <img className={styles.quoteIcon} src={quoteIcon} alt='' width="25px" />
        </p>
        <footer className="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer>
    </blockquote>
    </div>
    <div className='mb-5 px-3'>
      <h2>About the creator</h2>
      <p className='px-3'>
        In laboris id commodo nostrud aliquip adipisicing et deserunt anim labore. Ullamco aliqua irure fugiat nisi. Enim mollit officia ipsum eiusmod nisi nostrud incididunt aliqua ullamco Lorem sint.
      </p>
    </div>
    <div className='mb-5 px-3'>
      <h2>Contributors</h2>
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
      </Row>
    </div>
  </div>;
}
