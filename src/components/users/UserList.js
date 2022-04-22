import React, { useEffect, useState } from "react";
import { getUsers } from "./UserManager";


export const UserList = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        getUsers()
            .then((data) => setUsers(data))
    }, [])


    return (
        <>
            <ul className="usersList">
                {users.map(
                    (user) => {
                        return <>
                            <li className="card user--list" key={`user--${user.id}`}>
                                <div className="user--username">
                                    {user.username}
                                </div>
                                <div className="user--firstName">
                                    {user.firstName}
                                </div>
                                <div className="user--lastName">
                                    {user.lastName}
                                </div>
                                <div className="user--email">
                                    {user.email}
                                </div>
                            </li>
                        </>
                    }
                )}
            </ul>
        </>
    )

}