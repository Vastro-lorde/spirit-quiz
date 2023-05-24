import { useState, useEffect, useCallback} from 'react';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai'
import { NavLink } from 'react-router-dom';
import { getUser, logOut } from '../services/hooks';
import profile_image from '../assets/profile_image.png'
import axios from 'axios';
import { GET_USER } from '../services/links';
import { config } from '../services/details';

export const UserProfile = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] =useState(false)
    const [user, setUser] = useState(null);
    const userClaim = getUser();
    const fetchData = useCallback(async (signal) => {
        setLoading(true)
        try {
        const result = await axios.get(GET_USER+userClaim.id, {signal,...config()});
        console.log(result.data);
        setLoading(false)
        setUser(result.data)
        } catch (error) {
        if (!signal.aborted) {
            setLoading(false)
            console.log(error);
        }
        }
    }, [userClaim.id]);

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
        if (isOpen) {
            setTimeout(()=>{
                setIsOpen(false);
            }, 5000)
        }
    }, [isOpen])
    return (
        <div className=' w-max'>
            <div className=' flex gap-2 items-center cursor-pointer hover:shadow-md p-2' onClick={()=>setIsOpen(!isOpen)}>
                {loading?
                <p>loading</p>
                :
                <>
                <div className=' md:w-16 w-8 rounded-full overflow-hidden'>
                    <img src={user?.image_url? user?.image_url: profile_image} alt={user?.full_name}/>
                </div>
                <div>
                    <p className=' md:text-base text-sm font-Space-Grotesk font-bold'>{user?.full_name}</p>
                    <p className=' md:text-sm text-2xs'>{user?.email}</p>
                </div>
                </>
                }
                {isOpen? <AiFillCaretUp/> : <AiFillCaretDown/>}
            </div>
            {isOpen &&
                <div className=' absolute bg-white shadow-lg p-4 md:w-72 w-52 flex flex-col md:text-base text-sm'>
                    <NavLink to='profile' className='hover:bg-slate-300 cursor-pointer p-2'>Profile</NavLink>
                    <NavLink to='result' className='hover:bg-slate-300 cursor-pointer p-2'>View Results</NavLink>
                    { user.role === "ADMIN" && 
                    <>
                        <NavLink to='/uzumaki/settings' className='hover:bg-slate-300 cursor-pointer p-2'>Settings</NavLink>
                        <NavLink to='/uzumaki/users' className='hover:bg-slate-300 cursor-pointer p-2'>Users</NavLink>
                    </>}
                    <NavLink to='/' onClick={logOut} className='hover:bg-slate-300 cursor-pointer p-2'>Log Out</NavLink>
                </div>
            }
        </div>
    )
}
