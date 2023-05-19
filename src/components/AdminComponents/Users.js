import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { config } from '../../services/details';
import { GET_USERS } from '../../services/links';
import { UserCard } from './UserCard';

const Users = () => {
    const [usersRes, setUsersRes] = useState([]);
    const [users, setUsers] = useState(()=>[...usersRes]);
    const [searchName, setSearchName] = useState('');
    document.title = "Spirit Quiz Users"

    const fetchData = useCallback(async (signal) => {
        try {
           const result = await axios.get(GET_USERS, {signal,...config()});
           setUsersRes(() => [...result.data]);
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
        
        useEffect(() => {

            if (usersRes.length > 0 && searchName.length > 0) {
                setUsers(() => usersRes.filter( user => user?.full_name.toLowerCase().includes(searchName?.toLowerCase())));
            }else{
                setUsers(() => usersRes)
            }
        }, [usersRes, searchName])
        return (
            <div className=' p-2'>
            <div className=' flex items-center mb-4 bg-slate-200 w-max p-1 rounded-lg'>
                <input type="text" 
                    className=' focus:outline-none px-2 py-1 bg-transparent'
                    name="name" 
                    value={searchName} 
                    onChange={(e)=> setSearchName(e.currentTarget.value)} 
                    placeholder='Search User'/>
                <AiOutlineSearch/>
            </div>
            <div className=' h-96 overflow-y-auto'>
                {users? users.map((user, index) =>(
                <UserCard key={index} user={user} />
                )): <p>loading</p>}
            </div>
            
        </div>
    )
}

export default Users
