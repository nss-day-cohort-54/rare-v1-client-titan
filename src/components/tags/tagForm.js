import React, { useState, useRef, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { addTag } from "./TagManager"
import { TagList } from "./TagList"

export const TagForm = () => {
    const history = useHistory()
    const [tag, setTag] = useState({})
    let label = useRef(null)

    const constructNewTag = () => {
        tag.label = label.current.value
        setTag(tag)
    }

    return (
        <form className="tagForm">
            <h2 className="tagForm__title">New Tag</h2>
            <fieldset>
                <div className="form-group">
                    <input type="text" id="label" ref={label} required autoFocus className="form-control" placeholder="input label" />
                </div>
            </fieldset>

            <button type="submit"
                className="btn btn-primary"
                onClick={evt => {
                    constructNewTag()
                    addTag(tag)
                        .then(() => {
                            label = ""
                            tag.label = label
                            setTag(tag)
                            // TagList()
                            history.push("/tags")
                        })
                }}
            >Add Tag</button>
        </form>
    )
}
