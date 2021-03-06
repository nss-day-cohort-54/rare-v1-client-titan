import Settings from "../repositories/Settings"

export const getPosts = () => {
    return fetch(`${Settings.remoteURL}/posts`)
    .then(res => res.json())
}

export const getSinglePost = (postId) => {
    return fetch(`${Settings.remoteURL}/posts/${postId}`)
    .then(res => res.json())
}

export const deletePost = (postId, setRefresh) => {
    
    return fetch(`${Settings.remoteURL}/posts/${postId}`, {
        method: "DELETE"
    })
    .then(() => setRefresh(true))
        
}

export const getUserPost = (userId) => {
    return fetch(`${Settings.remoteURL}/posts?user=${userId}`)
    .then(res => res.json())
}

export const getSubscriptionsPosts = () => {
    return fetch(`${Settings.remoteURL}/`)
    .then(res => res.json())
}

export const getCategoryFilterPost = (categoryId) => {
    return fetch(`${Settings.remoteURL}/posts?category=${categoryId}`)
    .then(res => res.json())
}

export const addPost = (post) => {
    return fetch(`${Settings.remoteURL}/posts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
    })
}
export const editPost = (newPost, postId) => {
    return fetch(`${Settings.remoteURL}/posts/${postId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newPost)
    })
}

export const searchPostTitles = (searchTerm) => {
    return fetch(`${Settings.remoteURL}/posts?title=${searchTerm}`)
    .then(res => res.json())
}

export const getPostByTag = (tagId) => {
    return fetch(`${Settings.remoteURL}/posts?tags=${tagId}`)
    .then(res => res.json())
}

