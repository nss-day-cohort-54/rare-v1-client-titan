import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "./PostManager";
import { useHistory } from "react-router-dom";


export const PostsList = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        getPosts()
            .then((data) => setPosts(data))
    }, [])

    const history = useHistory()

    return (
        <>
            <ul className="postsList">
                {posts.map(
                    (post) => {
                        return <>
                            <button className="btn new-post" onClick={() => history.push("/posts/create")}>New Post</button>
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