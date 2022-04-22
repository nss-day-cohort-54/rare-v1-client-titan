import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getCategories } from "../categories/CategoriesManager";
import { editPost, getSinglePost } from "./PostManager";


export const EditPosts = () => {
    const [categories, setCategories] = useState([])
    const [post, setPost] = useState({})
    const [newPost, setNewPost] = useState({})
    const { postId } = useParams()
    const history = useHistory()



    const submitPost = (post) => {
        editPost(newPost, post.id)
        .then(() => history.push("/my-posts"))

    }

    useEffect(() => {
        const copy = {}
        copy.userId = post.userId
        copy.categoryId = post.categoryId
        copy.title = post.title
        copy.publicationDate = post.publicationDate
        copy.imageURL = post.imageURL
        copy.content = post.content
        copy.approved = post.approved
        setNewPost(copy)
    },[post])

    useEffect(() => {
        getCategories()
            .then((data) => setCategories(data) )
    }, [])

    useEffect(() => {
        getSinglePost(postId)
            .then((data) => setPost(data))
    }, [postId])



    return (
        <>
            <div className="card post--list" key={`post--${post.id}`}>
                <div key={`post--${post.id}`}>
                    <input type="text" defaultValue={post.title} className="post--title" onChange={e => {
                        const copy = { ...newPost }
                        copy.title = e.target.value
                        setNewPost(copy)
                    }} />
                    <div className="post--user">
                        by {post.user?.fullName}
                    </div>
                    <select className="post--category" defaultValue={post.categoryId} onChange={e => {
                        const copy = { ...newPost }
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
                        const copy = { ...newPost }
                        copy.imageURL = e.target.value
                        setNewPost(copy)
                    }}
                    /><br></br>
                    <textarea className="post--content" defaultValue={post.content} onChange={e => {
                        const copy = { ...newPost }
                        copy.content = e.target.value
                        setNewPost(copy)
                    }}
                    /><br></br>
                    <button onClick={e => {
                        submitPost(post)
                    }}>Submit Changes</button>
                </div>
            </div>
        </>
    )
}