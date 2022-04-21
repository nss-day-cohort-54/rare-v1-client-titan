import React, { useEffect, useState } from "react";
import { getTags, addTag } from "./TagManager";
import { useHistory } from "react-router-dom";


export const TagList = () => {
    const [tags, setTags] = useState([])
    const [tag, setTag] = useState({})
    const history = useHistory()

    useEffect(() => {
        getTags()
            .then((tag) => setTags(tag))
    }, [])

    const saveTag = () => {
        const newTag = {
            label: tag.label
        }

        addTag(newTag)
            .then(() => {
                setTag({label: ""})
                getTags()
                    .then((tag) => setTags(tag))
            })
    }

    return (
        <div className="columns">
            <div className="column">
                <ul className="tagsList">
                    {tags.map(tag => {
                        return <>
                            <li className="card tag--list" key={`tag--${tag.id}`}>
                                <div className="tag--label">
                                    {tag.label}
                                </div>
                                <button className="btn edit-tag">Edit</button>
                                <button className="btn delete-tag">Delete</button>
                            </li>
                        </>
                        }
                    )}
                </ul>
            </div>
            
            <div className="column">
                <form className="tagForm">
                    <h2 className="tagForm__title">New Tag</h2>
                    <fieldset>
                        <div className="form-group">
                            <input autoFocus type="text" value={tag.label} className="tagLabel" placeholder="Enter tag label"
                            onChange={
                                (evt) => {
                                    evt.preventDefault()
                                    const copy = {...tag}
                                    copy.label = evt.target.value
                                    setTag(copy)
                                }
                            } />
                        </div>
                    </fieldset>

                    <button type="submit"
                        className="btn btn-primary"
                        onClick={(evt) => {
                            evt.preventDefault()
                            saveTag()
                        }}
                    >Add Tag</button>
                </form>
            </div>
        </div>
    )
}
