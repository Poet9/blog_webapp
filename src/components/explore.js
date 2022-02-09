import React, { useEffect} from 'react';
import { Container, Row } from 'react-bootstrap';
import styles from './explore.module.css';
import Filters from './filters';
const BlogostsColPromise = import('./blogostsCol');
const BlogostsCol = React.lazy(()=>BlogostsColPromise);
export default function Explore(props) {
  useEffect(() => {  // showing search bar
    props.searchDisplay(true);
    return ()=> props.searchDisplay(false);
  }, []);

  return <React.Suspense fallback={<div>Loading...</div>} >
    <div >
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
        <Filters />
        <BlogostsCol searchedBlog={props.searchedBlogName}/>
      </Row>
    </Container>
    </div>
  </React.Suspense>;
}
