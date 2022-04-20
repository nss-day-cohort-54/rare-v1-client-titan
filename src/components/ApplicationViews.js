import React from "react"
import { Route } from "react-router-dom"
import { PostsList } from "./posts/PostList"
import { PostForm } from "./posts/PostForm"


export const ApplicationViews = () => {
  return (
    <>  
    <Route exact path="/posts">
      <PostsList />
    </Route>
    <Route exact path="/posts/create">
      <PostForm />
    </Route>
    </>
  )
}
