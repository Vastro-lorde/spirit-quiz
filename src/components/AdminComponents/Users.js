import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { config } from '../../services/details';
import { GET_USERS } from '../../services/links';
import { UserCard } from './UserCard';

const Users = () => {

    const [users, setUsers] = useState([]);
    document.title = "Spirit Quiz Users"

    const fetchData = useCallback(async (signal) => {
        try {
           const result = await axios.get(GET_USERS, {signal,...config()});
           console.log(result.data);
           setUsers(() => [...result.data]);
        } catch (error) {
           if (!signal.aborted) {
            console.log(error);
           }
        }
     }, []);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal

        try {
            fetchData(signal);
        } catch (error) {
            console.log(error);
        }
        return () => controller.abort(signal.reason);
    }, [fetchData])

    return (
        <div>
            {users? users.map((user, index) =>(
                        <UserCard key={index} user={user} />
                )): <p>loading</p>}
        </div>
    )
}

export default Users
