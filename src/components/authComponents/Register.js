import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { firebaseGoogleSignIn } from '../../services/firebase';
import { ToastContainer, toast } from 'react-toastify';
import { Bars } from 'react-loader-spinner';

import 'react-toastify/dist/ReactToastify.css';
import { getCategories } from '../../services/hooks';
import { SIGNUP_URL } from '../../services/links';

export const Register = () => {
    const navigate = useNavigate();
    const [visible, setVisible] = useState(true);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const googleSignin = () =>{
        setLoading(true);
        firebaseGoogleSignIn().then(async result => {
            console.log(result); 

            axios.post(SIGNUP_URL+"?google=true",{
                full_name : result.user.displayName,
                email : result.user.email,
                password : result.user.uid,
                image_url: result.user.photoURL
            }).then(result => {
                console.log(result);
                setLoading(false)
                sessionStorage.setItem('user',JSON.stringify(result.data))
                if (!JSON.parse(localStorage.getItem('categories'))) {
                    getCategories();
                }
                setLoading(false)
                navigate('/dashboard');;
            }).catch(error => {
                console.log(error.message);
                setLoading(false)
                toast(error.response.data.error ?? error.message , {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
            })
            
        }).catch(error=> {
            console.log(error);
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
        })
    }

    const handleSubmit= async (e) =>{
        e.preventDefault();

        setLoading(true)
        axios.post(SIGNUP_URL,{
            full_name : formData.name,
            email : formData.email,
            password : formData.password
        }).then(result => {
            console.log(result);
            setLoading(false)
            navigate('/verify-email?email=' + formData.email +'&name=' + formData.name);
        }).catch(error => {
            console.log(error.response.data.error);
            setLoading(false)
            toast(error.response.data.error, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        })

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
            <form onSubmit={handleSubmit} className=" flex flex-col justify-center mx-auto text-center p-4 border border-yellow-600 w-1/2 rounded-xl">

            <input className=" w-3/4 mx-auto focus:outline-none mb-4 p-2 bg-amber-200" type="text" disabled={loading} name="name" onChange={(e)=> setFormData(prev=> ({...prev, name: e.target.value}))} placeholder='Enter fullname' required/>
                <input className=" w-3/4 mx-auto focus:outline-none mb-4 p-2 bg-amber-200" type="email" disabled={loading} name="email" onChange={(e)=> setFormData(prev=> ({...prev, email: e.target.value}))} placeholder='Enter email' required/>
                <div className="flex items-center gap-2 w-3/4 mx-auto mb-4 bg-amber-200">
                    <input className=" w-full focus:outline-none bg-transparent p-1" disabled={loading} type={visible? "text":"password"} name="password" onChange={(e)=> setFormData(prev=> ({...prev, password: e.target.value}))} placeholder='Enter password' required/>
                    <div className=' p-3 hover:bg-amber-300 cursor-pointer' onClick={()=>setVisible(!visible)}>
                        {visible? <AiFillEyeInvisible /> : <AiFillEye />}
                    </div>
                </div>
                <Link to={"/"}><p className=' text-sm hover:underline text-amber-700 cursor-pointer'>Already have an account? Sign In</p></Link>
                <input className="border border-yellow-600 w-2/4 mx-auto mb-2 cursor-pointer p-2 font-Space-Grotesk font-semibold rounded-lg hover:bg-yellow-200" disabled={loading} type="submit" name="" value={"Register"}/>
            </form>
                <button disabled={loading} type="button" className=' border border-yellow-600 flex items-center justify-center gap-2 text-center mx-auto w-2/4 cursor-pointer p-2 font-Space-Grotesk font-semibold rounded-lg hover:bg-yellow-200' onClick={googleSignin}><p>Sign Up With Google</p> <FcGoogle size={20}/> </button>
            <ToastContainer/>
        </div>
    )
}
