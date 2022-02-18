import React, { useState } from 'react';
import { updateComment } from '../features/comment';
import { useDispatch, useSelector } from 'react-redux';
// icons 
import thumbUpIcon from "../icons/thumbs-up.svg";
import deleteIcon from "../icons/trash-2.svg";
// component function
export default function Comment(props) {
    const [comment, setComment] = useState({
        ...props.comment, 
        upVote: props.comment.upVote|| 0, 
        upVotedUsers: props.comment.upVotedUsers|| []
    });
    const currentUser = useSelector(state => state.user?.value);
    const dispatch = useDispatch();
    const likedCommentFunc = (e)=>{
        if(currentUser.email?.length < 1){
            console.log("here we are not logged in");
            return alert("marakch connecter");
        }
        const hasUpVoted =comment.upVotedUsers?.findIndex(userEmail => userEmail === currentUser.email);
        if(hasUpVoted=== -1){
            dispatch(updateComment({  //fetch update
                ...comment, 
                upVote: ++comment.upVote, 
                upVotedUsers:[...comment.upVotedUsers, currentUser.email]
            }));
            setComment({...comment, upVote: comment.upVote, upVotedUsers:[...comment.upVotedUsers, currentUser.email]});
        }
        else if(hasUpVoted >= 0){
            dispatch(updateComment({  //fetch update
                ...comment, 
                upVote: --comment.upVote,
                upVotedUsers: comment.upVotedUsers.splice(hasUpVoted, 1)
            }));
            setComment({...comment, upVote: comment.upVote, upVotedUsers: comment.upVotedUsers.splice(hasUpVoted, 1)});
        }
    }
  return (
    <div id={comment.id} className="commentComponent py-2 px-2 w-100"> 
        {currentUser.email === comment.email &&
        <img style={{cursor: "pointer", float: "right"}} src={deleteIcon} alt="" width="15px" onClick={()=>props.deleteComment(comment.id)} />
        }
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
