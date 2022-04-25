import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getComments } from "./CommentManager";

export const PostComments = ({refreshComments, setRefreshComments}) => {

    const [comments, setComments] = useState([])
    const { postId } = useParams()
    

    useEffect(() => {
        if (postId) {
            getComments(postId)
                .then((data) => setComments(data))
                .then(() => setRefreshComments(false))
        }
    }, [postId, refreshComments])

    return (
        <>
            {comments.length === 0 ? <div className="no--comments">No Comments yet, be the first to leave one!</div> :
                <ul className="postsComments">
                    {comments.map(
                        (comment) => {
                            return <>
                                <li className="comment--list" key={`comments--${comment.id}`}>
                                    <div className="comment--author">
                                        {comment.author.fullName}
                                    </div>
                                    <div className="comment--content">
                                        {comment.content}
                                    </div>

                                </li>
                            </>
                        }
                    )}
                </ul>
                
            }
        <Link to={`/posts/${postId}/add-comment`}>Add a comment</Link>
        </>

    )
}
