import React, { useEffect, useState } from "react";
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
                        </>
                    }
                )}
            </ul>
        </>
    )

}