import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserPost, deletePost } from "./PostManager";


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
                                    <div className="post--title"><Link to={`/posts/${post.id}`}>
                                        {post.title}
                                    </Link>
                                    </div>
                                    <div className="post--category">
                                        {post.category.label}
                                    </div>
                                    <button>Edit</button>
                                    <button onClick={() => {deletePost(post.id, setRefresh)
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