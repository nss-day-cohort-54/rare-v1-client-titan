import Settings from "../repositories/Settings"

export const getUsers = () => {
    return fetch(`${Settings.remoteURL}/users`)
    .then(res => res.json())
}

export const getSingleUser = (userId) => {
    return fetch(`${Settings.remoteURL}/users/${userId}`)
    .then(res => res.json())
}

export const addSubcribedUser = (subcription) => {
    return fetch(`${Settings.remoteURL}/subcriptions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(subcription)
    })
}

export const getSubscriptions = () => {
    return fetch(`${Settings.remoteURL}/subscriptions`)
        .then(res => res.json())
}

export const deleteSubscription = (subscriptionId) => {
    return fetch(`${Settings.remoteURL}/subscriptions/${subscriptionId}`, {
        method: "DELETE"
    })        
}