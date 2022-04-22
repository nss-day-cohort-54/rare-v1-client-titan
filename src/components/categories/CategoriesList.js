/*
    The purpose of this component is to
    fetch all categories from the DB and 
    generate the HTML (JSX) that will list the
    categories
*/

import React, { useEffect, useState } from "react";
import { getCategories, addCategory } from "./CategoriesManager";
import { editCategory, deleteCategory } from "./CategoriesManager";  
import { useHistory } from "react-router-dom";


export const CategoriesList = () => {                    
    const [categories, setCategories] = useState([])          
    const [category, setCategory] = useState({})            
    const history = useHistory()

    useEffect(() => {
        getCategories()                                    
            .then((category) => setCategories(category))               
    }, [])

    const saveCategory = () => {
        const newCategory = {
            label: category.label
        }

        addCategory(newCategory)
            .then(() => {
                setCategory({label: ""})
                getCategories()
                    .then((category) => setCategories(category))
            })
    }

    return (
        <div className="columns">
            <div className="column">
                <ul className="categoriesList">
                    {categories.map(category => {
                        return <>
                            <li className="card category--list" key={`category--${category.id}`}>
                                <div className="category--label">
                                    {category.label}
                                </div>
                                <button className="btn edit-tag">Edit</button>
                                <button className="btn delete-tag">Delete</button>
                            </li>
                        </>
                        }
                    )}
                </ul>
            </div>
            
            <div className="column">
                <form className="categoryForm">
                    <h2 className="categoryForm__title">Create a New Category</h2>
                    <fieldset>
                        <div className="form-group">
                            <input autoFocus type="text" value={category.label} className="categoryLabel" placeholder="Enter the new category..."
                            onChange={
                                (evt) => {
                                    evt.preventDefault()
                                    const copy = {...category}
                                    copy.label = evt.target.value
                                    setCategory(copy)
                                }
                            } />
                        </div>
                    </fieldset>

                    <button type="submit"
                        className="btn btn-primary"
                        onClick={(evt) => {
                            evt.preventDefault()
                            saveCategory()
                        }}
                    >Submit</button>
                </form>
            </div>
        </div>
    )
}


//                                 <button className="button" onClick={() => {
//                                 history.push(`editCategory/${category.id}`)
//                                  }}>Edit Category</button> 

//                                 <button className="button" onClick={() => {
//                                     deleteCategory(category.id)                            
//                                 }}>Delete Category</button>                         
