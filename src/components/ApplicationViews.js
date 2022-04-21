import React from "react"
import { Route } from "react-router-dom"
import { CategoriesList } from "./categories/CategoriesList"
import { PostsList } from "./posts/PostList"


export const ApplicationViews = () => {
  return (
    <>  
    <Route exact path="/posts">
      <PostsList />
    </Route>

    <Route exact path="/categories">
      <CategoriesList />
    </Route>
    </>
  )
}
