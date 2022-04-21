import Settings from "../repositories/Settings"

export const getPosts = () => {
    return fetch(`${Settings.remoteURL}/posts`)
    .then(res => res.json())
}

export const getSinglePost = (ingredientId) => {
    return fetch(`${Settings.remoteURL}/posts/${ingredientId}`)
    .then(res => res.json())
}