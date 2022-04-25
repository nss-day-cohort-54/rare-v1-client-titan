import Settings from "../repositories/Settings";

export const getComments = (postId) => {
    return fetch(`${Settings.remoteURL}/comments?post=${postId}`)
    .then(res => res.json())
}