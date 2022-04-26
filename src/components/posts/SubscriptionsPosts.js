import React, { useEffect, useState } from "react";
import { getSubscriptionsPosts } from "./PostManager";

export const SubscriptionsPosts = () => {
    const currentUserId = parseInt(localStorage.getItem("token"))
    const [posts, setPosts] = useState([])
    const [filtered, setFiltered] = useState([])

    useEffect(() => {
        getSubscriptionsPosts()
            .then(data => setPosts(data))
    }, [])

    useEffect(() => {
        const filterPosts = posts.filter(p => p.subscription.authorId === currentUserId)
        setFiltered(filterPosts)
    }, [posts])

    return (
        <>
            {
                filtered?.length === 0 ?
                    <p>Subscribe to authors to curate your personal homepage</p>
                :
                    <ul className="postsList">
                        <h2>Your Subscribed Posts</h2>
                        {filtered.map(post => {
                            return <>
                                <li className="card post--list" key={`subpost--${post.id}`}>
                                        <h2 className="post--title">
                                            {post.title}
                                        </h2>
                                        <div className="post--user">
                                            by {post.user?.fullName}
                                        </div>
                                        <div className="post--date">
                                            {post.publicationDate}
                                        </div>
                                        <img className="post--image" src={post.imageURL} alt={post.title}
                                        />
                                        <div className="post--content">
                                            {post.content}
                                        </div>
                                </li>
                            </>
                            }
                        )}
                    </ul>
            }
        </>
    )

}