import React, {useState}  from "react"
import { Route } from "react-router-dom"
import { Post } from "./posts/Post"
import { PostsList } from "./posts/PostList"
import { PostForm } from "./posts/PostForm"
import { UserPostsList } from "./posts/UserPosts"
import { TagList } from "./tags/TagList"
import { CategoriesList } from "./categories/CategoriesList"
import { UserList } from "./users/UserList"
import { EditPosts } from "./posts/EditPost"
import { User } from "./users/User"
import { PostComments } from "./comments/PostComments"
import { AddComment } from "./comments/AddComment"
import { SubscriptionsPosts } from "./posts/SubscriptionsPosts"



export const ApplicationViews = () => {
  const [refreshComments, setRefreshComments] = useState(false)
  return (
    <>
    <Route exact path="/">
      <SubscriptionsPosts />
    </Route>
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
    <Route exact path="/categories">
      <CategoriesList />
    </Route>
    <Route exact path="/tags">
      <TagList />
    </Route>
    <Route exact path="/users">
      <UserList />
    </Route>
    <Route exact path="/users/:userId(\d+)">
      <User />
    </Route>
    <Route exact path="/posts/:postId(\d+)/edit">
      <EditPosts />
    </Route>
    <Route exact path="/posts/:postId(\d+)/comments">
      <PostComments refreshComments={refreshComments} setRefreshComments={setRefreshComments} />
    </Route>
    <Route exact path="/posts/:postId(\d+)/add-comment">
      <AddComment setRefreshComments={setRefreshComments} />
    </Route>
    </>
  )
}