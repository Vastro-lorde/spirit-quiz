import React from 'react'
import { NavLink } from 'react-router-dom'

export const NavBar = () => {
    return (
        <div className=' bg-slate-800 text-gray-100 py-2 shadow-md overflow-y-auto flex justify-center items-center gap-4'>
            <NavLink to={'categories'}>Categories</NavLink>
            <NavLink to={'questions'}>Questions</NavLink>
            <NavLink to={'options'}>Options</NavLink>
        </div>
    )
}
