import Settings from "../repositories/Settings"

export const getUsers = () => {
    return fetch(`${Settings.remoteURL}/users`)
    .then(res => res.json())
}
