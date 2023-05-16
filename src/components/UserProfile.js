import { useState, useEffect} from 'react';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai'
import { NavLink } from 'react-router-dom';
import { getUser, logOut } from '../services/hooks';
import profile_image from '../assets/profile_image.png'

export const UserProfile = () => {
    const [isOpen, setIsOpen] = useState(false);
    const user = getUser();
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
                <div className=' md:w-16 w-8 rounded-full overflow-hidden'>
                    <img src={user?.image_url? user?.image_url: profile_image} alt=""/>
                </div>
                <div>
                    <p className=' md:text-base text-sm font-Space-Grotesk font-bold'>{user?.full_name}</p>
                    <p className=' md:text-sm text-2xs'>{user?.email}</p>
                </div>
                {isOpen? <AiFillCaretUp/> : <AiFillCaretDown/>}
            </div>
            {isOpen &&
                <div className=' absolute bg-white shadow-lg p-4 md:w-72 w-52 flex flex-col md:text-base text-sm'>
                    <NavLink to='profile' className='hover:bg-slate-300 cursor-pointer p-2'>Profile</NavLink>
                    <NavLink to='result' className='hover:bg-slate-300 cursor-pointer p-2'>View Results</NavLink>
                    { user.role === "ADMIN" && 
                    <>
                        <NavLink to='settings' className='hover:bg-slate-300 cursor-pointer p-2'>Settings</NavLink>
                        <NavLink to='users' className='hover:bg-slate-300 cursor-pointer p-2'>Users</NavLink>
                    </>}
                    <NavLink to='/' onClick={logOut} className='hover:bg-slate-300 cursor-pointer p-2'>Log Out</NavLink>
                </div>
            }
        </div>
    )
}
