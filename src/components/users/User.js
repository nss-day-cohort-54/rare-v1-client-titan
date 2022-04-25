import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUsers, getSingleUser, addSubcribedUser } from "./UserManager";
import { useHistory } from "react-router-dom";


export const User = () => {
    const [user, setUser] = useState({})
    const { userId } = useParams()
    const [users, setUsers] = useState([])
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
    }, [])

    const currentUserId = localStorage.getItem("token")

    const constructSubcription = () => {
        const subcription = {}
        subcription.followerId = parseInt(userId)
        subcription.authorId = parseInt(currentUserId)
        subcription.createdOn = Date(Date.now()).toLocaleString('en-us').split('GMT')[0]
        debugger
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
                    }}>Subcribe</button>
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