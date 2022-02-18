import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import styles from './blogCard.module.css';
import userIcon from '../img/avatardefault.png';
import { useNavigate } from 'react-router-dom';
export default function BlogCard(props) {
    const navigate = useNavigate();
    const blogData = { ...props.blogData , img: 'https://picsum.photos/300'}
    const redirectToBlogPost = ()=>{
        navigate(`/blog/${blogData.id}`);
    }
  return <div onClick={redirectToBlogPost} className='cursor-pointer'>
      <Card className="bg-light my-4"  >
        <Row>
            <Col lg={4} md={5}>
                <Card.Img variant="top" src={blogData.img}/>
            </Col>
            <Col lg={7} md={6} className="align-items-end">
                    <Card.Body className={styles.blogCardBody}>
                    <div className={styles.blogCardBodyDiv}>
                        <Card.Title className='pt-2'>{blogData.title}</Card.Title>
                        <Card.Text>{blogData.body}</Card.Text>
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
