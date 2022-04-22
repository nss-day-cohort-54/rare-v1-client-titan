/*
    The purpose of this component is to
    fetch all categories from the DB and 
    generate the HTML (JSX) that will list the
    categories
*/

import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getCategories, deleteCategory } from "./CategoriesManager";
import { editCategory, addCategory } from "./CategoriesManager";

export const CategoriesList = () => {
    const [ categories, setCategories ] = useState([])
    const [ category, setCategory ] = useState({})
    const history = useHistory()

    useEffect(() => {
        getCategories()
            .then((data) => setCategories(data))
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
        <div className="categorieslist">
            <div className="allcategories">
            {
            categories.map(
                (category) => {
                    return (
                    <>
                        <div className="category" key={`category--${category.id}`}>
                            <article className="categorylist">                           
                                Category: {category.label}  

                                <button className="button" onClick={() => {
                                history.push(`editCategory/${category.id}`)
                                 }}>Edit Category</button> 

                                <button className="button" onClick={() => {
                                    deleteCategory(category.id)                            
                                }}>Delete Category</button>                         
                            </article>
                        </div>
                    </>
                    )
                }
            )}
            </div>
                    <div className="addcategory">
                        <form className="newCategoryForm">
                        <h2 className="newCategoryForm__title">Create a New Category</h2>

                        <fieldset>
                            <div className="form-group">
                                <label htmlFor="label">New category:</label>
                                <input
                                    onChange={
                                        (evt) => {
                                            const copy = {...category}
                                            copy.label = evt.target.value
                                            setCategory(copy)
                                        }
                                    }
                                    required autoFocus
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter the new category..."
                                    />
                            </div>
                        </fieldset>  
                                <br></br>
                                <button type="submit" className="btn btn-primary"
                                    onClick={(evt) => {
                                        evt.preventDefault()
                                        saveCategory()
                                    }}
                                >Submit
                                </button>
                        </form>
                    </div>
        </div>
    )
}
