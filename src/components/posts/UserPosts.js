import React, { useEffect, useState } from "react";
import { getUserPost, deletePost } from "./PostManager";

import { Link } from "react-router-dom";


export const UserPostsList = () => {
    const [posts, setPosts] = useState([])
    const [currentUser, setUser] = useState()
    const [refresh, setRefresh] = useState(false)


    useEffect(() => {
        setUser(localStorage.getItem("token"))
    }, [refresh])


    useEffect(() => {
        getUserPost(currentUser)
            .then((data) => setPosts(data))
            .then(() => setRefresh(false))
    }, [currentUser, refresh])


    return (
        <>
            <ul className="postsList">
                <h2>My Posts</h2>
                {posts.map(
                    (post) => {
                        return <>
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
                                    <button><Link to={`/posts/${post.id}/edit`}>Edit</Link></button>
                                    <button onClick={() => {
                                        deletePost(post.id, setRefresh)
                                    }}>Delete</button>
                                </div>
                            </li>
                        </>
                    }
                )}
            </ul>
        </>
    )

}