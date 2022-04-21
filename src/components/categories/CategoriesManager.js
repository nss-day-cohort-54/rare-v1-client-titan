import Settings from "../repositories/Settings"

export const getCategories = () => {
    return fetch(`${Settings.remoteURL}/categories`)    
    .then(res => res.json())
}