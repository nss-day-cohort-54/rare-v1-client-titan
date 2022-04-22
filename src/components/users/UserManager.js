import Settings from "../repositories/Settings"

export const getUsers = () => {
    return fetch(`${Settings.remoteURL}/users`)
    .then(res => res.json())
}

export const getSingleUser = (userId) => {
    return fetch(`${Settings.remoteURL}/users/${userId}`)
    .then(res => res.json())
}