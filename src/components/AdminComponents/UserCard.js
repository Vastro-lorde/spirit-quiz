import React, { useCallback } from 'react';
import profile_image from '../../assets/profile_image.png'
import { AiOutlineDelete } from 'react-icons/ai'
import { DELETE_USER } from '../../services/links';
import axios from 'axios';
import { config } from '../../services/details';

export const UserCard = (props) => {
    const { full_name, email, id, image_url, role, created_at, updated_at, verified } = props.user

    const deleteUser = useCallback(async (id) => {
        try {
          const result = await axios.delete(DELETE_USER, { data: { id }, ...config() });
          console.log(result.data);
          // Handle the response or perform additional actions
        } catch (error) {
            // Handle the error
          console.log(error);
        }
      }, []);
    return (
        <div className=' flex gap-2 items-center py-2 px-4 shadow-md hover:shadow w-96 rounded-lg mb-4 bg-slate-200'>
            <div className=' flex flex-col items-center w-1/5'>
                <div className=' w-12 rounded-full overflow-hidden'>
                    <img src={image_url === ""? profile_image: image_url} alt={full_name}/>
                </div>
                <p className=' text-2xs font-Space-Grotesk font-bold'>{role}</p>
            </div>
            <div className=' text-left w-3/5'>
                <p className=' text-2xs font-Space-Grotesk font-bold'>{email}</p>
                <p className=' text-sm font-Space-Grotesk font-bold'>{full_name}</p>
                {verified? <p className=' text-2xs text-green-500'>Verified</p>: <p>Unverified</p>}
                <p className=' text-2xs'>created: {new Date(created_at).toDateString()}</p>
                <p className=' text-2xs'>updated: {new Date(updated_at).toDateString()}</p>

            </div>
            {/* delete icon */}
            <div onClick={()=> deleteUser(id)}>
                <AiOutlineDelete className='text-3xl text-gray-400 hover:text-red-400 cursor-pointer' />
            </div>
            
        </div>
    )
}
