import React, { useEffect, useState } from "react";
import { getUserPost, deletePost, editPost } from "./PostManager";
import { getCategories } from "../categories/CategoriesManager";


export const UserPostsList = () => {
    const [posts, setPosts] = useState([])
    const [currentUser, setUser] = useState()
    const [refresh, setRefresh] = useState(false)
    const [editable, setEditable] = useState(false)
    const [newPost, setNewPost] = useState({})
    const [categories, setCategories] = useState([])


    useEffect(() => {
        setUser(localStorage.getItem("token"))
    }, [refresh])

    useEffect(() => {
        getCategories()
            .then((data) => setCategories(data) )
    }, [])

    useEffect(() => {
        getUserPost(currentUser)
            .then((data) => setPosts(data))
            .then(() => setRefresh(false))
    }, [currentUser, refresh])

    const submitPost = (post) => {
        const copy = {...newPost}
        copy.userId = post.userId
        copy.publicationDate = post.publicationDate
        copy.approved = post.approved
        setNewPost(copy)
        editPost(newPost, post.id)
        .then(setEditable(false))
        .then(setRefresh(true))
    }

    return (
        <>
            <ul className="postsList">
                <h2>My Posts</h2>
                {posts.map(
                    (post) => {
                        return <>
                            {editable === false ?
                                <li className="card post--list" key={`post--${post.id}`}>
                                    <div key={`post--${post.id}`}>
                                        <h2 className="post--title">
                                            {post.title}
                                        </h2>
                                        <div className="post--user">
                                            by {post.user?.fullName}
                                        </div>
                                        <div className="post--category">
                                            Category: {post.category.label}
                                        </div>
                                        <div className="post--date">
                                            {post.publicationDate}
                                        </div>
                                        <img className="post--image" src={post.imageURL} alt={post.title}
                                        />
                                        <div className="post--content">
                                            {post.content}
                                        </div>
                                        <button onClick={() =>{
                                            setNewPost(post)
                                            setEditable(true)}}>Edit</button>
                                        <button onClick={() => {
                                            deletePost(post.id, setRefresh)
                                        }}>Delete</button>
                                
                                </div>
                                </li>
                                
                                : <li className="card post--list" key={`post--${post.id}`}>
                                <div key={`post--${post.id}`}>
                                    <input type ="text" defaultValue={post.title} className="post--title" onChange={e => {
                                        const copy = {...newPost}
                                        copy.title = e.target.value
                                        setNewPost(copy)
                                    }}/>
                                    <div className="post--user">
                                        by {post.user?.fullName}
                                    </div>
                                    <select className="post--category" defaultValue={post.categoryId} onChange={e => {
                                        const copy = {...newPost}
                                        copy.categoryId = parseInt(e.target.value)
                                        setNewPost(copy)
                                    }}>
                                        {categories.map(category => {
                                            return <option key={`category--${category.id}`} value={category.id}>{category.label}</option>
                                        })}
                                    </select>
                                    <div className="post--date">
                                        {post.publicationDate}
                                    </div>
                                    <textarea className="post--image" defaultValue={post.imageURL} onChange={e => {
                                        const copy = {...newPost}
                                        copy.imageURL = e.target.value
                                        setNewPost(copy)
                                    }}
                                    /><br></br>
                                    <textarea className="post--content" defaultValue={post.content} onChange={e => {
                                        const copy = {...newPost}
                                        copy.content = e.target.value
                                        setNewPost(copy)
                                    }}
                                    /><br></br>
                                    <button onClick={e => {
                                       submitPost(post)
                                    }}>Submit Changes</button>
                                </div>
                            </li>}
                        </>
                    }
                )}
            </ul>
        </>
    )

}