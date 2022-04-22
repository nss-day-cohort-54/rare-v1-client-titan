import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPosts, getUserPost } from "./PostManager";
import { getUsers } from "../users/UserManager";
import { useHistory } from "react-router-dom";


export const PostsList = () => {
    const [posts, setPosts] = useState([])
    const [users, setUsers] = useState([])
    const [filteredUser, setFilteredUser] = useState({})

    useEffect(() => {
        getPosts()
            .then(post => setPosts(post))
        getUsers()
            .then(user => setUsers(user))
    }, [])

    useEffect(() => {
        if (filteredUser.hasOwnProperty("id")) {
            getUserPost(filteredUser.id)
                .then(post => setPosts(post))
        } else {
            getPosts()
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
                        if (parseInt(evt.target.value) !== 0) {
                            const selectedUser = users.find(user => user.id === parseInt(evt.target.value))
                            setFilteredUser(selectedUser)
                        } else {
                            setFilteredUser({})
                        }
                    }
                }>
                    <option value="0">All</option>
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
                                            <Link to={`/users/${post.userId}`}>
                                                {post.user.fullName}
                                            </Link>
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