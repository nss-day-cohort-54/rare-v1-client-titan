import React, { useEffect, useState } from "react";
import { getPosts } from "./PostManager";


export const PostsList = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        getPosts()
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
                                    <div className="post--title">
                                        {post.title}
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