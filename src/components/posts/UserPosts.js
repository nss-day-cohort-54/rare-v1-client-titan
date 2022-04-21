import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserPost } from "./PostManager";


export const UserPostsList = () => {
    const [posts, setPosts] = useState([])
    const [currentUser, setUser] = useState(0)

    useEffect(() => {
        setUser(localStorage.getItem("token"))
    }, [])

    useEffect(() => {
        getUserPost(currentUser)
            .then((data) => setPosts(data))
    }, [currentUser])

    return (
        <>
            <ul className="postsList">
                <h2>My Posts</h2>
                {posts.map(
                    (post) => {
                        return <>
                            <li className="card post--list" key={`post--${post.id}`}>
                                <div key={`post--${post.id}`}>
                                    <div className="post--title"><Link to={`/posts/${post.id}`}>
                                        {post.title}
                                    </Link>
                                    </div>
                                    <div className="post--category">
                                        {post.category.label}
                                    </div>
                                    <button>Edit</button>
                                    <button>Delete</button>
                                </div>
                            </li>
                        </>
                    }
                )}
            </ul>
        </>
    )

}