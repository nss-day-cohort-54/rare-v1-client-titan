import React from "react"
import { Route } from "react-router-dom"
import { PostsList } from "./posts/PostList"


export const ApplicationViews = () => {
  return (
    <>  
    <Route exact path="/posts">
      <PostsList />
    </Route>
    <h1 >Welcome to Rare Publishing</h1>
    </>
  )
}
