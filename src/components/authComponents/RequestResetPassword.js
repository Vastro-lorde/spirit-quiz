import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { REQUEST_PASSWORD_CHANGE_URL } from '../../services/links';
import { Bars } from 'react-loader-spinner';

import { GrStatusGood } from 'react-icons/gr';

export const RequestResetPassword = () => {
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");

    const handleSubmit= async (e) =>{
        e.preventDefault();
        setLoading(true);
        await axios.post(REQUEST_PASSWORD_CHANGE_URL, {
            email: email.toLocaleLowerCase()
        }).then(res => {
            setLoading(false);
            console.log(res.data);
            setError(false)
            setSuccess(res.data.success);
        }).catch(err => {
            setLoading(false);
            setError(err.response.data.error);
            console.log(err.response.data.error);
            
        });
        if (error) {
            toast(error, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }
    }
    return (
        <>
        {
            success === ""?
            <div>
            {loading && 
                <div className=' absolute z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                    <Bars
                        height="100"
                        width="300"
                        color="#FFBF00"
                        ariaLabel="bars-loading"
                        wrapperStyle={{}}
                        wrapperClassName=" mx-auto"
                        visible={true}
                        />
                    </div>}
                    <h1 className=" font-Space-Grotesk font-bold my-4 text-2xl text-center">Spirit Quiz</h1>
                    <form onSubmit={handleSubmit} className=" flex flex-col justify-center mx-auto my-4 text-center p-4 border border-yellow-600 w-2/3 md:w-1/2 rounded-xl">
                        <input className=" w-3/4 mx-auto focus:outline-none mb-4 p-2 bg-amber-200" type="email" name="email" onChange={(e)=> setEmail(e.target.value)} placeholder='Enter email'/>
                        
                        <p className=' text-2xs md:text-sm mb-4 hover:underline text-amber-700 cursor-pointer'>don't have an account? <Link to={"/register"}>Sign Up</Link></p>
                        <input className="border border-yellow-600 w-2/4 mx-auto mb-2 cursor-pointer p-2 font-Space-Grotesk font-semibold rounded-lg hover:bg-yellow-200" type="submit" value={"Request Change Password"}/>
                        <p className=' text-2xs md:text-sm mb-4 mx-auto hover:underline text-red-700 cursor-pointer'>{error}</p>
                    </form>
                    <ToastContainer/>
                </div>
                :
                <div className=' bg-white absolute  top-24 right-0 bottom-o left-0 p-4 m-auto rounded-lg shadow-green-400 shadow-lg w-1/3 flex flex-col justify-center text-center z-50'>
                    <GrStatusGood style={{color: "green"}} className='mx-auto text-4xl text-green-500'/>
                    <h1>{success}</h1>
                </div>
        }
        </>
    )
}
