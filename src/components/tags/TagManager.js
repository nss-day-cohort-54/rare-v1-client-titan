import Settings from "../repositories/Settings"

export const getTags = () => {
    return fetch(`${Settings.remoteURL}/tags`)
    .then(res => res.json())
}

export const getSingleTag = (tagId) => {
    return fetch(`${Settings.remoteURL}/tags/${tagId}`)
    .then(res => res.json())
}

