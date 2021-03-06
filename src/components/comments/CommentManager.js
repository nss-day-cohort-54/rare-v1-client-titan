import Settings from "../repositories/Settings";

export const getComments = (postId) => {
    return fetch(`${Settings.remoteURL}/comments?post=${postId}`)
    .then(res => res.json())
}

export const createComment = (newComment) => {
    return fetch(`${Settings.remoteURL}/comments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newComment)
    })
}

export const deleteComment = (id, setRefreshComments) => {
    return fetch(`${Settings.remoteURL}/comments/${id}`, {
        method: "DELETE"
    })
    .then(() => setRefreshComments(true))
}