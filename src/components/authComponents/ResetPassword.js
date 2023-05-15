import { useState } from 'react';
import axios from 'axios';
import { Link, NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import {  PASSWORD_RESET_URL } from '../../services/links';
import { Bars } from 'react-loader-spinner';

export const ResetPassword = () => {
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const email = params.get('email');
    const token = params.get('token');
    const [visible, setVisible] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: email? email: '',
        password: '',
        comfirmPassword: '',
        otp: token? token: '',
    });

    const setConfirmPassword = (e) =>{
        setError('')
        if (e.target.value !== formData.password) {
            setError("password and confirm password are not a match")
            return;
        }
        setFormData(prev=> ({...prev, comfirmPassword: e.target.value}))
    }

    const handleSubmit= async (e) =>{
        e.preventDefault();
        setLoading(true)
        if (formData.comfirmPassword !== formData.password) {
            setError("password and confirm password are not a match")
            return;
        }
        await axios.post(PASSWORD_RESET_URL, {
            email: formData.email.toLocaleLowerCase(),
            password: formData.password,
            otp: formData.otp
        }).then(res => {
            setLoading(false);
            console.log(res.data);
            setError(false)
            setSuccess(true)
            navigate('/');
        }).catch(err => {
            console.log(err);
            setLoading(false);
            setError(err.response.data.error);
            
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
        <div className='relative'>
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
            {success && 
                <div className=' bg-white absolute  top-24 right-0 bottom-o left-0 p-4 m-auto rounded-lg shadow-2xl w-1/3 flex flex-col justify-center text-center z-50'>
                    <h1>Password reset successfully</h1>
                    <p>You can now </p>
                    <NavLink to='/' className=' text-amber-700 hover:underline cursor-pointer'>Sign In</NavLink>
                </div>
        }
            <h1 className=" font-Space-Grotesk font-bold my-4 text-2xl text-center">Spirit Quiz</h1>
            <form onSubmit={handleSubmit} className=" flex flex-col justify-center mx-auto my-4 text-center p-4 border border-yellow-600 w-2/3 md:w-1/2 rounded-xl">
                <div className="flex items-center gap-2 w-3/4 mx-auto mb-4 bg-amber-200">
                    <input className=" w-full focus:outline-none bg-transparent p-1" disabled={success} type={visible? "text":"password"} minLength={8} name="password" onChange={(e)=> setFormData(prev=> ({...prev, password: e.target.value}))} placeholder='Enter New password' required/>
                    <div className=' p-3 hover:bg-amber-300 cursor-pointer' onClick={()=>setVisible(!visible)}>
                        {visible? <AiFillEyeInvisible /> : <AiFillEye />}
                    </div>
                </div>
                <div className="flex items-center gap-2 w-3/4 mx-auto mb-4 bg-amber-200">
                    <input className=" w-full focus:outline-none bg-transparent p-1" disabled={success} type={visible? "text":"password"} minLength={8} name="confirmPassword" onChange={(e)=> setConfirmPassword(e)} placeholder='Confirm password' required/>
                    <div className=' p-3 hover:bg-amber-300 cursor-pointer' onClick={()=>setVisible(!visible)}>
                        {visible? <AiFillEyeInvisible /> : <AiFillEye />}
                    </div>
                </div>
                <p className=' text-2xs md:text-sm mb-4 hover:underline text-amber-700 cursor-pointer'>don't have an account? <Link to={"register"}>Sign Up</Link></p>
                <input className="border border-yellow-600 w-2/4 mx-auto mb-2 cursor-pointer p-2 font-Space-Grotesk font-semibold rounded-lg hover:bg-yellow-200" type="submit" disabled={success} value={"Reset Password"}/>
                <p className=' text-2xs md:text-sm mb-4 mx-auto hover:underline text-red-700 cursor-pointer'>{error}</p>
            </form>
            <ToastContainer/>
        </div>
    )
}
