import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import requestTemplate from '../utilities/requestTemplate';
import { setComment, deleteComment } from '../features/comment';
import { useDispatch, useSelector } from 'react-redux';
import Comment from './Comment';
import RatingComponent from "./rating";
/***** icons *******/
import sendIcon from "../icons/send.svg";
import dummyAvatar from "../img/blog_logo.png";

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
      if(currentUser.email.length < 1){
        e.target.firstChild.value = "";
        alert("you are not logged in");
        return;
      }
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
    const deleteCommentFunc = (commentId)=>{// handle deleting comments
      dispatch(deleteComment({id: commentId}));
      setBlogComments(blogComments.filter(comment => comment.id !== commentId));
    }
  return <div className='pb-5 text-center' id={blogData.id}>
      <div className='blogPostContainer'>
        <div 
          style={{background: `url(${blogData.img}) no-repeat center`, height: '250px'}}>
        </div>
        <article className='text-light'>
          <h2 className='my-2 display-3'>{blogData.title}</h2>
          <p className='d-block text-left'>{blogData.body}</p>
        </article>
        <div className='d-flex text-light'>
            <img src={dummyAvatar} alt="BT" style={{borderRadius: "50%"}} width="50px" height="50px"/>
            <div className='px-3'>
              <h6>Username</h6>
              <p>role</p>
            </div>
            <RatingComponent totalRaters={15982} ratingValue={3.5}/>
        </div>
        <div className='blogCommentContainer text-dark d-inline-block'>
          {!blogComments?<div className='p-5 bg-light m-2'>NO COMMENTS YET</div> 
            : blogComments.map((comment, index)=><Comment key={index} deleteComment={deleteCommentFunc} comment={comment}/>)
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
