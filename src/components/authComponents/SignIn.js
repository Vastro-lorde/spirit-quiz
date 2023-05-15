import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import {  firebaseGoogleSignIn } from '../../services/firebase';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { LOGIN_URL } from '../../services/links';
import { Bars } from 'react-loader-spinner';

export const SignIn = () => {
    const navigate = useNavigate();
    const [visible, setVisible] = useState(true);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const googleSignin = async () =>{
        setLoading(true)
        firebaseGoogleSignIn().then(async result =>  {
            console.log(result);

            await axios.post(LOGIN_URL, {
                email: result.user.email,
                password: result.user.uid
            }).then(res => {
                setLoading(false);
                setError(false)
                sessionStorage.setItem('token',JSON.stringify(res.data.token));
                sessionStorage.setItem('tokenExp',JSON.stringify(res.data.exp))
                sessionStorage.setItem("userClaim",JSON.stringify(res.data.userClaim))
                localStorage.setItem('user',JSON.stringify(res.data.user));
                navigate('/dashboard');
            }).catch(err => {
                setLoading(false);
                setError(err.response.data.error);
                console.log(err.response.data.error);
                
            });
        }).catch(error=> {
            console.log(error);
            setError(error.response.data)
        })
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

    const handleSubmit= async (e) =>{
        e.preventDefault();
        setLoading(true)
        console.log({formData, url : LOGIN_URL});
        await axios.post(LOGIN_URL, {
            email: formData.email.toLocaleLowerCase(),
            password: formData.password
        }).then(res => {
            setLoading(false);
            setError(false)
            sessionStorage.setItem('token',JSON.stringify(res.data.token));
            sessionStorage.setItem('tokenExp',JSON.stringify(res.data.exp))
            sessionStorage.setItem("userClaim",JSON.stringify(res.data.userClaim))
            localStorage.setItem('user',JSON.stringify(res.data.user));
            const userClaimRes = res.data.userClaim;
            userClaimRes === "ADMIN"? navigate('uzumaki'): navigate('dashboard');
            navigate('dashboard');
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
                <input className=" w-3/4 mx-auto focus:outline-none mb-4 p-2 bg-amber-200" type="email" name="email" onChange={(e)=> setFormData(prev=> ({...prev, email: e.target.value}))} placeholder='Enter email'/>
                <div className="flex items-center gap-2 w-3/4 mx-auto mb-4 bg-amber-200">
                    <input className=" w-full focus:outline-none bg-transparent p-1" type={visible? "text":"password"} name="password" onChange={(e)=> setFormData(prev=> ({...prev, password: e.target.value}))} placeholder='Enter password'/>
                    <div className=' p-3 hover:bg-amber-300 cursor-pointer' onClick={()=>setVisible(!visible)}>
                        {visible? <AiFillEyeInvisible /> : <AiFillEye />}
                    </div>
                </div>
                <Link to={"register"}><p className=' text-2xs md:text-sm mb-4 hover:underline text-amber-700'>don't have an account? Sign Up</p></Link>
                <input className="border border-yellow-600 w-2/4 mx-auto mb-2 cursor-pointer p-2 font-Space-Grotesk font-semibold rounded-lg hover:bg-yellow-200" type="submit" value={"Sign In"}/>
                <p className=' text-2xs md:text-sm mb-4 mx-auto hover:underline text-red-700 cursor-pointer'>{error}</p>
                <Link to={"forgot-password"}><p className=' text-2xs md:text-sm mb-4 hover:underline text-amber-700 cursor-pointer'>Forgot Password?</p></Link>
            </form>
                <button type="button" className=' border border-yellow-600 flex items-center justify-center gap-2 text-center mx-auto w-2/4 cursor-pointer p-2 font-Space-Grotesk font-semibold rounded-lg hover:bg-yellow-200' onClick={googleSignin}><p>Sign In With Google</p> <FcGoogle size={20}/> </button>
            <ToastContainer/>
            
        </div>
    )
}
