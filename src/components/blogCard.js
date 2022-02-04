import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import styles from './blogCard.module.css';
import userIcon from '../img/avatardefault.png';

export default function blogCard(props) {
  const blogData = {
      img : "https://picsum.photos/200",
      title: "blog title",
      description: "Reprehenderit laborum anim cillum non. Ea in occaecat nostrud ea in tempor. In pariatur quis consectetur ad minim Lorem laboris aute.",
      date: "02-02-2022"
  }
  console.log("length: ", blogData.description.length)
  return <div >
      <Card className="bg-light"  >
        <Row>
            <Col lg={4}>
                <Card.Img variant="top" src={blogData.img}/>
            </Col>
            <Col lg={7} className="align-items-end">
                    <Card.Body>
                    <div className={styles.blogCardBody}>
                        <Card.Title>{blogData.title}</Card.Title>
                        <Card.Text>{blogData.description}</Card.Text>
                        <Row className="d-flex justify-content-center">
                        <Col md={8} className="d-flex text-dark">
                            <img src={userIcon} alt="img" width="60px" height="60px" />
                            <div className="text-dark">
                                <h6>Username</h6>
                                <p>role</p>
                            </div>
                        </Col>
                        <Col md={4}  className="text-primary">{blogData.date}</Col>
                    </Row>
                </div >
                </Card.Body>
                    
            </Col>
        </Row>
        </Card>
  </div>;
}
