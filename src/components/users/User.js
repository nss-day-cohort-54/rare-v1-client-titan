import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleUser} from "./UserManager";


export const User= () => {
    const [user, setUser] = useState({})
    const { userId } = useParams()

    useEffect(() => {
        if (userId) {
            getSingleUser(userId)
                .then((data) => setUser(data))
        }
    }, [userId])


    return (
        <>
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