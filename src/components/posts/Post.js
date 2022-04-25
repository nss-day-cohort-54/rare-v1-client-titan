import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSinglePost } from "./PostManager";
import { Link } from "react-router-dom";


export const Post = () => {
    const [post, setPost] = useState({
        title:"",
        publicationDate:"",
        imageURL:"",
        user:{
            fullName:""
        },
        category:{
            label:""
        }
    })


    const { postId } = useParams()

    useEffect(() => {
        if (postId) {
            getSinglePost(postId)
                .then((data) => setPost(data))
        }
    }, [postId])


    return (
        <>
            <ul className="post">
                <li className="card post--list" key={`post--${post.id}`}>
                    <div key={`post--${post.id}`}>
                        <h2 className="post--title">
                            {post.title}
                        </h2>
                        <div className="post--user">
                            by {post.user?.fullName}
                        </div>
                        <div className="post--category">
                            Category: {post.category.label}
                        </div>
                        <div className="post--date">
                            {post.publicationDate}
                        </div>
                        <img className="post--image" src={post.imageURL} alt={post.title}
                        />
                        <div className="post--content">
                            {post.content}
                        </div>
                        <Link to={`/posts/${post.id}/comments`}>View Comments</Link>
                        <br></br>
                        <Link to={`/posts/${post.id}/add-comment`}>Add a comment</Link>
                    </div>
                </li>
            </ul>
        </>
    )

}