import React from 'react'
import { UserProfile } from './UserProfile'
import { NavLink } from 'react-router-dom'

export const Header = () => {
    return (
        <div className=' flex justify-between py-2 px-8 items-center shadow-md'>
            <NavLink to='/dashboard'><h1 className=' md:text-2xl font-Space-Grotesk font-extrabold'>Spirit Quiz</h1></NavLink>
            <UserProfile/>
        </div>
    )
}
