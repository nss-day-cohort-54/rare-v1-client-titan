import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategoryFilterPost, getPosts, getUserPost } from "./PostManager";
import { getUsers } from "../users/UserManager";
import { useHistory } from "react-router-dom";
import { getCategories } from "../categories/CategoriesManager";


export const PostsList = () => {
    const [posts, setPosts] = useState([])
    const [selectedCategoryId, setSelectedCategoryId] = useState("0")
    const [categories, setCategories] = useState([])
    const history = useHistory()
    const [users, setUsers] = useState([])
    const [filteredUser, setFilteredUser] = useState({})

    useEffect(() => {
        getPosts()
            .then(post => setPosts(post))
        getUsers()
            .then(user => setUsers(user))
    }, [])

    useEffect(() => {
        getCategories()
            .then((data) => setCategories(data))
    }, [])

    useEffect(() => {
        if (selectedCategoryId !== "0") {
            getCategoryFilterPost(selectedCategoryId).then(data => setPosts(data))
        } else {
            getPosts()
                .then((data) => setPosts(data))
        }
    }, [selectedCategoryId, posts])

    useEffect(() => {
        if (Object.keys(filteredUser).length !== 0) {
            getUserPost(filteredUser.id)
                .then(post => setPosts(post))
        }
    }, [filteredUser])


    return (
        <>
            <div className="category--filter">
                <h3>Filter by Category:</h3>
                <select className="select--category" defaultValue={0} onChange={e => { setSelectedCategoryId(e.target.value) }}>
                    <option key={`category--0`} value={"0"}>All Categories</option>
                    {categories.map(category => {
                        return <option key={`category--${category.Id}`} value={category.id}>{category.label}</option>
                    })}
                </select>
            </div>

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
            <button className="btn new-post" onClick={() => history.push("/posts/create")}>New Post</button>

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