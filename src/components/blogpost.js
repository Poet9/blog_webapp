import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import requestTemplate from '../utilities/requestTemplate';
import { setComment, deleteComment } from '../features/comment';
import { useDispatch, useSelector } from 'react-redux';
import Comment from './Comment';
/***** icons *******/
import sendIcon from "../icons/send.svg";

// fetch data 
const fetchBlogFunc = async (blogId, setBlogData) =>{
    requestTemplate(`posts/${blogId}`)
    .then((res) => res.json())
    .then((data)=> setBlogData({...data, img: 'https://picsum.photos/600'}))
    .catch(e => console.log("error fetching blogs: ", e.message));
}
const fetchCommentsFunc = async (blogId, setBlogComments) =>{
  requestTemplate(`comments`)
  .then(res => res.json())
  .then( data => {
    const comments = data.filter(comment => comment.postId === blogId);
    setBlogComments(comments);
  }).catch(e => console.log("error fetching comments: ", e.message));
}
// component function 
export default function Blogpost() {
    const dispatch = useDispatch();
    const blog = useParams();
    //getting state
    const currentUser = useSelector(state => state.user?.value);
    const [blogData, setBlogData] = useState({});
    // getting comments this will be replaced by an actual fetch 
    const [blogComments, setBlogComments] = useState([]);
    useEffect(() => {
      fetchBlogFunc(Number(blog.id), setBlogData);
      fetchCommentsFunc(Number(blog.id), setBlogComments);
    }, [blog.id]);

    const writeCommentFunc = (e)=>{ /// handling writing comments 
      e.preventDefault();
      console.log("the comment: ", e.target.firstChild.value, currentUser);
      dispatch(setComment({
        userId: currentUser.id,
        id: Math.floor(Math.random()*150),
        comment: e.target.firstChild.value,
        blogId: blogData.id,
        upVote: 0
      }));
      setBlogComments([...blogComments, {userId: currentUser.id, id: Math.floor(Math.random()*150),
        body: e.target.firstChild.value, email: currentUser.email, blogId: blogData.id, upVote: 0}])
      e.target.firstChild.value = "";
    }
  return <div className='blogPostMain text-light pb-5 text-center' id={blogData.id}>
      <div className='blogPostContainer'>
        <div 
          style={{background: `url(${blogData.img}) no-repeat bottom`,
            backgroundSize: 'cover', 
            height: '250px'}}>
        </div>
        <article>
          <h2 className='my-2 display-3'>{blogData.title}</h2>
          <p className='d-block text-left'>{blogData.body}</p>
        </article>
        <div className='blogCommentContainer text-dark d-inline-block'>
          {!blogComments?<div className='p-5 bg-light m-2'>NO COMMENTS YET</div> 
            : blogComments.map((comment, index)=><Comment key={index} comment={comment}/>)
          }
          <form className='d-flex p-1 ' onSubmit={writeCommentFunc}>
            <input className='form-control px-5 py-2' type='text' placeholder='comment' required/>
            <button className='btn bg-light' type='submit' >
              <img src={sendIcon} alt="" sizes='40px' />
            </button>
          </form>
        </div>
      </div>
  </div>;
}
