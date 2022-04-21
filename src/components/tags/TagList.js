import React, { useEffect, useState } from "react";
import { getTags } from "./TagManager";


export const TagList = () => {
    const [tags, setTags] = useState([])

    useEffect(() => {
        getTags()
            .then((tag) => setTags(tag))
    }, [])

    return (
        <>
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
        </>
    )
}

