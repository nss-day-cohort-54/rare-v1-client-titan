import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUsers, getSingleUser, addSubcribedUser, getSubscriptions, deleteSubscription } from "./UserManager";
import { useHistory } from "react-router-dom";


export const User = () => {
    const currentUserId = localStorage.getItem("token")
    const { userId } = useParams()

    const [users, setUsers] = useState([])
    const [subscriptions, setSubscriptions] = useState([])
    const [user, setUser] = useState({})
    const [checkSubscribe, setCheckSubscribe] = useState(false)

    useEffect(() => {
        if (userId) {
            getSingleUser(userId)
                .then((data) => setUser(data))
                .then(() => {
                    const findSubscription = subscriptions?.find(s => s.followerId === currentUserId)
                    if (findSubscription) {
                        setCheckSubscribe(true)
                    }
                })
        }
    }, [userId])

    useEffect(() => {
        getSubscriptions()
            .then(data => setSubscriptions(data))
    }, [checkSubscribe])

    useEffect(() => {
        getUsers()
            .then((data) => setUsers(data))
        getSubscriptions()
            .then(data => setSubscriptions(data))
    }, [])

    const constructSubcription = () => {
        const subcription = {}
        subcription.followerId = parseInt(currentUserId)
        subcription.authorId = parseInt(userId)
        subcription.createdOn = Date(Date.now()).toLocaleString('en-us').split('GMT')[0]
        addSubcribedUser(subcription)
            .then(() => {
                setCheckSubscribe(true)
            })
    }

    return (
        <>
            {
                currentUserId === userId ? null : 
                checkSubscribe ?
                    <button className="btn user-unsubscribe" onClick={
                        (evt) => {
                            evt.preventDefault()
                            const foundSubscription = subscriptions?.find(s => s.followerId === parseInt(currentUserId))
                            deleteSubscription(foundSubscription.id)
                                .then(() => setCheckSubscribe(false))
                        }
                    }>Unsubscribed</button>
                :
                    <button className="btn user-subcribe" onClick={
                        (evt) => {
                            evt.preventDefault()
                            constructSubcription()
                    }}>Subscribe</button>
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