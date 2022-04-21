import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSinglePost } from "./PostManager";


export const Post = () => {
    const [post, setPost] = useState({})


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
                        <div className="post--title">
                            {post.title}
                        </div>
                        <div className="post--user">
                            {post.userId}
                        </div>
                        <div className="post--category">
                            {post.categoryId}
                        </div>
                        <img className="post--image" src={post.imageURL} alt={post.title}
                        />
                        <div className="post--content">
                            {post.content}
                        </div>
                        <div className="post--date">
                            {post.publicationDate}
                        </div>
                        <div className="post--approved">
                            {post.approved}
                        </div>
                    </div>
                </li>



            </ul>
        </>
    )

}