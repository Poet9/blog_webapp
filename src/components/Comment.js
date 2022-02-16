import React, { useState } from 'react';
import thumbUpIcon from "../icons/thumbs-up.svg";
import { updateComment } from '../features/comment';
import { useDispatch, useSelector } from 'react-redux';
export default function Comment(props) {
    const [comment, setComment] = useState({...props.comment, upVote: comment.upVote|| 0});
    const currentUser = useSelector(state => state.user?.value);
    const dispatch = useDispatch();
    const likedCommentFunc = (e)=>{
        if(!currentUser){
            console.log("here we are not logged in");
            return alert("marakch connecter");
        }
        if(e.target.src === `http://localhost:3000${thumbUpIcon}`){
            console.log("add upvote: ",comment.upVote);
            dispatch(updateComment({...comment, upVote: ++comment.upVote}));//fetch update
            setComment({...comment, upVote: ++comment.upVote});

        }
        else if(e.target.src === ""){
            console.log("ma3ajbekch ?: ", currentUser.username);
            dispatch(updateComment({...comment, upVote: comment.upVote-1}));//fetch update
            setComment({...comment, upVote: --comment.upVote});
        }
    }
  return (
    <div id={comment.id} className="commentComponent py-2 px-2 w-100"> 
        <span className="commentText">{comment.body}</span>
        <div className="d-flex justify-content-between py-1 pt-2">
            <div>
                <img src="https://i.imgur.com/AgAC1Is.jpg" alt="" width="18" />
                <span className="commentText mx-2">{comment.email}</span>
            </div>
            <div>
                <span className="upVoteText">Upvote?</span>
                <img src={thumbUpIcon} alt="" width="15px" onClick={likedCommentFunc} />
                <span className="upVoteText">{comment.upVote}</span>
            </div>
        </div>
    </div>
  )
}
