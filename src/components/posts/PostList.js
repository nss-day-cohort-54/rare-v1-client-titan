import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPosts, getUserPost } from "./PostManager";
import { getUsers } from "../users/UserManager";
import { useHistory } from "react-router-dom";


export const PostsList = () => {
    const [posts, setPosts] = useState([])
    const [users, setUsers] = useState([])
    const [filteredUser, setFilteredUser] = useState({})
    // const [filteredPosts, setFilteredPosts] = useState([])

    useEffect(() => {
        getPosts()
            .then(post => setPosts(post))
        getUsers()
            .then(user => setUsers(user))
    }, [])

    useEffect(() => {
        if (Object.keys(filteredUser).length !== 0 ) {
            getUserPost(filteredUser.id)
                .then(post => setPosts(post))
        }
    }, [filteredUser])

    const history = useHistory()

    return (
        <>
            <button className="btn new-post" onClick={() => history.push("/posts/create")}>New Post</button>

            <div className="search">
                <label>Search By Author</label>
                <select className="searchBuAuthor" id="searchBuAuthor" onChange={
                    (evt) => {
                        evt.preventDefault()
                        const selectedUser = users.find(user => user.id === parseInt(evt.target.value))
                        setFilteredUser(selectedUser)
                    }
                }>
                    <option value="">Select author</option>
                    {
                        users.map(user => {
                            return <option key={`users--${user.id}`} value={user.id}>{user.fullName}</option>
                        })
                    }
                </select>
            </div>

            <ul className="postsList">
                {
                    posts?.map(
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