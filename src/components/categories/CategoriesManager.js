import Settings from "../repositories/Settings"
import { CategoriesList } from "./CategoriesList"

export const getCategories = () => {
    return fetch(`${Settings.remoteURL}/categories`)    
    .then(res => res.json())
}

export const deleteCategory = (id) => {
    fetch(`http://localhost:8088/categories/${id}`, {
        method: "DELETE"
    })
        .then(CategoriesList())
}

export const getSingleCategory = (id) => {
    return fetch(`${Settings.remoteURL}/categories/${id}`)
    .then(res => res.json())
}

export const addCategory = (newCategory) => {
    return fetch(`${Settings.remoteURL}/categories`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newCategory)
    })
}

export const editCategory = (id) => {
    fetch(`http://localhost:8088/categories/${id}`)
            .then(res => res.json())
}
