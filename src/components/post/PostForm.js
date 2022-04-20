import React, { useState, useRef, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { addPost } from "./PostManager"

export const PostForm = () => {
    const history = useHistory()
    
    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])
    const [post, setPost] = useState({})
    const [selectedTags, addSelectedTags] = useState([])

    useEffect((cat) => {
        setCategories(cat)
    }, [])

    useEffect((tag) => {
        setTags(tag)
    }, [])


    const constructNewPost = () => {
        const currentUserId = localStorage.getItem("token")

        post.userId = parseInt(currentUserId),
        post.categoryId = parseInt(categoryId),
        post.title = title,
        post.publicationDate = Date(Date.now()).toLocaleString('en-us').split('GMT')[0],
        post.imageUrl = imageUrl,
        post.content = content,
        post.approved = approved
        setPost(post)
    }

    return (
        <form className="postForm">
            <h2 className="postForm__title">New Post</h2>
            <fieldset>
                <div className="form-group">
                    <input type="text" id="title" ref={title} required autoFocus className="form-control" placeholder="Title" />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <input type="text" id="imageUrl" ref={imageUrl} required autoFocus className="form-control" placeholder="Image URL" />
                </div>
            </fieldset>
            
            <fieldset>
                <div className="form-group">
                    <input type="text" id="content" ref={content} required autoFocus className="form-control" placeholder="Content" />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <select defaultValue="" name="category" ref={category} id="category" className="form-control" >
                        <option value="0">Category select</option>
                        {categories.map(c => (
                            <option key={c.id} value={c.id}>
                                {c.label}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            
            <fieldset>
                <div className="form-group">
                {tags?.map(t => (
                    <input key={t.id} type="checkbox" value={t.id}
                        onChange={
                            (evt) => {
                                if (evt.target.checked) {
                                    let copy = [...selectedTags]
                                    copy.push(t.id)
                                    addSelectedTags(copy)
                                } else {
                                    let copy = [...selectedTags]
                                    copy.splice(selectedTags?.indexOf(t.id), 1)
                                    addSelectedTags(copy)
                                }
                            }
                        }
                    >{t.label}</input>
                ))}
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    evt.preventDefault() // Prevent browser from submitting the form
                    constructNewPost()
                    addPost(post)
                        .then(() => history.push("/posts"))
                }}
                className="btn btn-primary"
            >Post</button>
        </form>
    )
}
