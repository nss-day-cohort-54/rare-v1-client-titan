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

