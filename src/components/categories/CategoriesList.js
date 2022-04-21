/*
    The purpose of this component is to
    fetch all categories from the DB and 
    generate the HTML (JSX) that will list the
    categories
*/

import React, { useEffect, useState } from "react";
import { getCategories } from "./CategoriesManager";

export const CategoriesList = () => {
    const [ categories, setCategories ] = useState([])

    useEffect(() => {
        getCategories()
            .then((data) => setCategories(data))
    }, [])


    return (
        <>
        {
            categories.map(
                (category) => {
                    return <div className="category" key={`category--${category.id}`}>
                            <article className="categorylist">                           
                                Category: {category.label}  

                                <button className="button" onClick={() => {
                                history.push(`EditRequest/${request.id}`)
                            }}>Edit Request</button> 

                                <button className="button" onClick={() => {
                                    deleteRequest(request.id)                            
                                }}>Delete Request</button>                         
                            </article>
                        </div>
                }
            )
        }
        </>
    )
}