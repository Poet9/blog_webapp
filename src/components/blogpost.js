import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import requestTemplate from '../utilities/requestTemplate';
const fetchBlogFunc = async (blogId, setBlogData) =>{
    requestTemplate(`posts/${blogId}`)
    .then((res) => res.json())
    .then((data)=> setBlogData({...data, img: 'https://picsum.photos/200'}))
    .catch(e => console.log("error fetching blogs: ", e.message));
}
export default function Blogpost(props) {
    props.searchDisplay(false);
    const blog = useParams();
    const [blogData, setBlogData] = useState({});
    useEffect(() => {
      fetchBlogFunc(blog.id, setBlogData);
    }, [blog.id])
    
    
    console.log(blogData); // to be deleted
  return <div className=' text-light mx-5 px-5 h-100' id={blogData.id}>
    <div className='text-center'>
      <img  src={blogData.img} alt='' width="100%" height="200px"/>
    </div>
    <h3 className='my-2'>{blogData.title}</h3>
    <p className='d-block tex-left'>{blogData.body}</p>
  </div>;
}
