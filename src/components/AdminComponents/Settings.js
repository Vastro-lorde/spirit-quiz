import React from 'react'
import { NavBar } from './NavBar'

const Settings = () => {
    document.title = "Quiz Settings"
    return (
        <div>
            <div className=''>
                <NavBar/>
                <div className='p-2'>
                    <h2 className=' font-Space-Grotesk font-bold text-xl'>Settings</h2>
                </div>
            </div>
        </div>
    )
}

export default Settings
