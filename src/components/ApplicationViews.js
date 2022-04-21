import React from "react"
import { Route } from "react-router-dom"
import { Post } from "./posts/Post"
import { PostsList } from "./posts/PostList"


export const ApplicationViews = () => {
  return (
    <>  
    <Route exact path="/posts">
      <PostsList />
    </Route>
    <Route exact path="/posts/:postId(\d+)">
      <Post />
    </Route>
    
    </>
  )
}
