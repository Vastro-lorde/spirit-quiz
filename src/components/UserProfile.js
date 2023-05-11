import { useState} from 'react';
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai'
import { NavLink } from 'react-router-dom';
import { getUser, logOut } from '../services/hooks'

export const UserProfile = () => {
    const [isOpen, setIsOpen] = useState(false);
    const user = getUser();
    return (
        <div className=' w-max'>
            <div className=' flex gap-2 items-center cursor-pointer hover:shadow-md p-2' onClick={()=>setIsOpen(!isOpen)}>
                <div className=' md:w-16 w-8'>
                    <img src={user.profile_pic} alt=""/>
                </div>
                <div>
                    <p className=' md:text-base text-sm font-Space-Grotesk font-bold'>{user.full_name}</p>
                    <p className=' md:text-sm text-2xs'>{user.email}</p>
                </div>
                {isOpen? <AiFillCaretUp/> : <AiFillCaretDown/>}
            </div>
            {isOpen &&
                <div className=' absolute bg-white shadow-lg p-4 md:w-72 w-52 flex flex-col md:text-base text-sm'>
                    <NavLink to='result' className='hover:bg-slate-300 cursor-pointer p-2'>View Results</NavLink>
                    <NavLink to='/' onClick={logOut} className='hover:bg-slate-300 cursor-pointer p-2'>Log Out</NavLink>
                </div>
            }
        </div>
    )
}
