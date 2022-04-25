import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUsers, getSingleUser, addSubcribedUser, getSubscriptions, deleteSubscription } from "./UserManager";
import { useHistory } from "react-router-dom";


export const User = () => {
    const [user, setUser] = useState({})
    const [users, setUsers] = useState([])
    const [subscriptions, setSubscription] = useState([])
    const [checkSubscribe, setCheckSubscribe] = useState(false)
    const { userId } = useParams()
    const history = useHistory()

    useEffect(() => {
        if (userId) {
            getSingleUser(userId)
                .then((data) => setUser(data))
        }
    }, [userId])

    useEffect(() => {
        getUsers()
            .then((data) => setUsers(data))
        getSubscriptions()
            .then(data => setSubscription(data))
    }, [])

    const findSubscription = subscriptions.find(s => s.authorId === currentUserId)
    if (findSubscription) {
        setCheckSubscribe(true)
    }

    const currentUserId = localStorage.getItem("token")

    const constructSubcription = () => {
        const subcription = {}
        subcription.followerId = parseInt(currentUserId)
        subcription.authorId = parseInt(userId)
        subcription.createdOn = Date(Date.now()).toLocaleString('en-us').split('GMT')[0]
        setCheckSubscribe(true)
        addSubcribedUser(subcription)
            .then(() => history.push("/"))
    }

    return (
        <>
            {
                currentUserId === userId ? null : 
                    <button className="btn user-subcribe" onClick={
                        (evt) => {
                            evt.preventDefault()
                            constructSubcription()
                    }}>Subscribe</button>
            }
            {
                checkSubscribe ?
                    <button className="btn user-unsubscribe" onClick={
                        (evt) => {
                            evt.preventDefault()
                            deleteSubscription(findSubscription.id)
                        }
                    }>Unsubscribed</button>
                        : null
            }

            <ul className="user">
                <li className="card user--list">
                    <h2>{user.fullName}</h2>
                    <div className="user--image">
                        <img src={user.profileImageURL} alt="image" />
                    </div>
                    <div className="user--username">
                        {user.username}
                    </div>
                    <div className="user--createdDate">
                        {user.createdOn}
                    </div>
                    <div className="user--bio">
                        {user.bio}
                    </div>
                </li>
            </ul>
        </>
    )
}