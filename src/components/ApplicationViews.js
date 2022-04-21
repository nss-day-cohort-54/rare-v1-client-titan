import React from "react"
import { Route } from "react-router-dom"
import { Post } from "./posts/Post"
import { PostsList } from "./posts/PostList"
import { PostForm } from "./posts/PostForm"
import { UserPostsList } from "./posts/UserPosts"
import { TagList } from "./tags/TagList"
import { TagForm } from "./tags/tagForm"


export const ApplicationViews = () => {
  return (
    <>  
    <Route exact path="/posts">
      <PostsList />
    </Route>
    <Route exact path="/posts/:postId(\d+)">
      <Post />
    </Route>
    <Route exact path="/my-posts">
      <UserPostsList />
    </Route>
    <Route exact path="/posts/create">
      <PostForm />
    </Route>
    

    <Route exact path="/tags">
      <TagList />
      <hr></hr>
      <TagForm />
    </Route>
    </>
  )
}
