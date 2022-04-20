import Settings from "../repositories/Settings"

export const getPosts = () => {
    return fetch(`${Settings.remoteURL}/posts`)
    .then(response => response.json)
}