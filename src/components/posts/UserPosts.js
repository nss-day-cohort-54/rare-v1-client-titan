import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserPost } from "./PostManager";


export const UserPostsList = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        getUserPost(1)
            .then((data) => setPosts(data))
    }, [])

    return (
        <>
            <ul className="postsList">
                {posts.map(
                    (post) => {
                        return <>
                            <li className="card post--list" key={`post--${post.id}`}>
                                <div key={`post--${post.id}`}>
                                    <div className="post--title"><Link to={`/posts/${post.id}`}>
                                        {post.title}
                                    </Link>
                                    </div>
                                    <div className="post--user">
                                        {post.user.fullName}
                                    </div>
                                    <div className="post--category">
                                        {post.category.label}
                                    </div>
                                </div>
                            </li>
                        </>
                    }
                )}
            </ul>
        </>
    )

}