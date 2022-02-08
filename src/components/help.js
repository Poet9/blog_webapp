import React from 'react';
import { Col, Row, Nav } from 'react-bootstrap';
import styles from './help.module.css';
/***** icons ******/

export default function Help(props) {
  props.searchDisplay(false); // hiding search bar
  return <div className='text-light'>
    <div className={styles.helpPresentation}>
      <h1 className='display-2 text-light'>Need help getting started?</h1>
    </div>
    <Row className='my-5 mx-1'>
      <Col xl={3} >
        <div className='sticky-xl-top pt-xl-5'>
          <h5 className='pt-xl-2'>FAQ</h5>
          <Nav className='flex-xl-column'>
            <Nav.Link className='text-light'>Cras justo odio</Nav.Link>
            <Nav.Link className='text-light'>Dapibus ac facilisis in</Nav.Link>
            <Nav.Link className='text-light'>Morbi leo risus</Nav.Link>
            <Nav.Link className='text-light'>Porta ac consectetur ac</Nav.Link>
          </Nav>
        </div>
      </Col>
      <Col xl={8}>
        <div>
          <h4>Getting started</h4>
          <p>
            Et dolor ad magna Lorem quis incididunt consectetur. Ea deserunt ipsum adipisicing est non Lorem sunt deserunt irure laboris. Et mollit nulla culpa in. In quis esse eiusmod tempor incididunt velit ex incididunt dolor exercitation occaecat. Mollit aliqua cillum elit ipsum elit.
          </p>
        </div>
        <div>
          <h4>Cras justo odio</h4>
          <p>
            Et sint dolor cupidatat velit ut aute voluptate et nulla ad anim velit. Cupidatat commodo labore officia incididunt. Cupidatat labore minim Lorem veniam est. Nisi laborum deserunt ullamco nostrud irure amet esse culpa laboris mollit nulla consequat. Ex cillum amet consectetur et culpa reprehenderit Lorem adipisicing et incididunt mollit labore qui. Velit Lorem duis exercitation reprehenderit exercitation. Sunt sint commodo in incididunt deserunt magna amet ad.
          </p>
        </div>
        <div>
          <h4>Dapibus ac facilisis in</h4>
          <p>
            Et sint dolor cupidatat velit ut aute voluptate et nulla ad anim velit. Cupidatat commodo labore officia incididunt. Cupidatat labore minim Lorem veniam est. Nisi laborum deserunt ullamco nostrud irure amet esse culpa laboris mollit nulla consequat. Ex cillum amet consectetur et culpa reprehenderit Lorem adipisicing et incididunt mollit labore qui. Velit Lorem duis exercitation reprehenderit exercitation. Sunt sint commodo in incididunt deserunt magna amet ad.
          </p>
        </div>
        <div>
          <h4>Morbi leo risus</h4>
          <p>
            Et sint dolor cupidatat velit ut aute voluptate et nulla ad anim velit. Cupidatat commodo labore officia incididunt. Cupidatat labore minim Lorem veniam est. Nisi laborum deserunt ullamco nostrud irure amet esse culpa laboris mollit nulla consequat. Ex cillum amet consectetur et culpa reprehenderit Lorem adipisicing et incididunt mollit labore qui. Velit Lorem duis exercitation reprehenderit exercitation. Sunt sint commodo in incididunt deserunt magna amet ad.
          </p>
        </div>
        <div>
          <h4>Porta ac consectetur ac</h4>
          <p>
            Et sint dolor cupidatat velit ut aute voluptate et nulla ad anim velit. Cupidatat commodo labore officia incididunt. Cupidatat labore minim Lorem veniam est. Nisi laborum deserunt ullamco nostrud irure amet esse culpa laboris mollit nulla consequat. Ex cillum amet consectetur et culpa reprehenderit Lorem adipisicing et incididunt mollit labore qui. Velit Lorem duis exercitation reprehenderit exercitation. Sunt sint commodo in incididunt deserunt magna amet ad.
          </p>
        </div>
      </Col>
    </Row>
  </div>;
}