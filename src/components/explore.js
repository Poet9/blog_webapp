import React, { useState } from 'react';
import { Container, Col, Row, Nav, Collapse, Badge } from 'react-bootstrap';
import styles from './explore.module.css';
import BlogCard from './blogCard';

import dropDownIcon from '../icons/chevron-down.svg';

export default function Explore() {
  const [risingStars, setRisisngStars] = useState(false);
  /******** RISING STARS *******/
  const risingStarsUsers = ['johndoe', 'JaneDoe', 'userNAme23', 'userNAme2', 'fifthWheel'];

  return <div >
    <div className={styles.exploreBg}>
      <div className='row d-flex '>
        <div className='col-lg-auto'>
          <h1 className={styles.presentationH1+' display-3'}>Thoughts are nothing if not explored</h1>
        </div>
        <div className='col-lg d-flex flex-row-reverse'>
        <img 
          className='float-left'
          src="https://media4.giphy.com/media/oNPfdkokpn5uDk3t8N/giphy.gif?cid=790b761109342d23cd3c1ac4284ade16b7e3bc2629b2eabd&rid=giphy.gif&ct=g" 
          alt="this slowpoke moves"  width="350px" height="250px" />
        </div>
      </div>
    </div>
    <Container className='mx-0'>
      <Row >
        <Col xl={3} className="my-3 border-right">
          <h4>Filters</h4>
          <Nav className='flex-xl-column'>
            <Nav.Link className='text-light'>
              <h5
                className={styles.risingStarsH5}
                onClick={() => setRisisngStars(!risingStars)}
              > Rising stars <img src={dropDownIcon} alt="" width="25px" />
              </h5>
              <Collapse in={risingStars}>
                <Nav className='flex-xl-column'>
                    {risingStarsUsers.map( (username, index) => {
                    const badgeColor = ['bg-warning', 'bg-secondary', 'bg-danger', 'bg-primary', 'bg-primary'];
                    const badge = <Badge className={badgeColor[index]+' px-2 mx-2'}>{index+1}</Badge>;
                    return <Nav.Link className='text-light' 
                      id={`risingStar-${index}`} 
                      key={index}> {username}{badge}
                    </Nav.Link>
                  })}
                </Nav>
              </Collapse>
            </Nav.Link>
            <Nav.Link className='text-light'>Cras justo odio</Nav.Link>
            <Nav.Link className='text-light'>Dapibus ac facilisis in</Nav.Link>
            <Nav.Link className='text-light'>Morbi leo risus</Nav.Link>
            <Nav.Link className='text-light'>Porta ac consectetur ac</Nav.Link>
          </Nav>
        </Col>
        <Col xl={9} >
          <h1 className='my-5'>TRENDING BLOGS</h1>
          <BlogCard />
        </Col>
      </Row>
    </Container>

  </div>;
}
