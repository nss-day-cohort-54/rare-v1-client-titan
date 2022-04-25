import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useHistory } from 'react-router-dom'
import { createComment } from "./CommentManager"

export const AddComment = ({setRefreshComments}) => {
    const {postId} = useParams()
    const history = useHistory()
    const [newComment, setNewComment] = useState({
        postId: postId,
        authorId: parseInt(localStorage.getItem("token"))
    })




    return (
        <>
        <form className="comment--form">
            <h2 className="comment--title">New Comment</h2>
            <fieldset>
                <textarea className="comment--content" required autoFocus placeholder="Write your comment..." onChange={e => {
                    const copy = {...newComment}
                    copy.content = e.target.value
                    setNewComment(copy)
                }}/>
            </fieldset>
        </form>
        <button onClick={ () => {createComment(newComment)
                .then(history.push(`/posts/${postId}/comments`))
                .then(() => setRefreshComments(true))}}>Add Comment</button>
            </>
    )

}