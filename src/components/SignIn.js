import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
// import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import {  firebaseGoogleSignIn } from '../services/firebase';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { getCategories } from '../services/hooks';
// import { onValue, push, ref } from 'firebase/database';

export const SignIn = () => {
    const navigate = useNavigate();
    // const [visible, setVisible] = useState(true);
    // const [signup, setSignUp] = useState(false);
    const [error, setError] = useState('');
    // const [formData, setFormData] = useState({
    //     email: '',
    //     full_name: '',
    //     password: ''
    // });

    const googleSignin = () =>{
        firebaseGoogleSignIn().then(result => {
            console.log(result);
            const user = {
                full_name: result.user.displayName,
                email : result.user.email,
                profile_pic : result.user.photoURL,
                password : result.user.uid
            }
            // if (signup) {
            //     push(ref(firebaseDb, 'users'), user).then(result =>{
            //         console.log(result);
            //     }).catch(error=>{
            //         console.log(error);
            //     });
            // }
            sessionStorage.setItem('user',JSON.stringify(user))
            if (!JSON.parse(localStorage.getItem('categories'))) {
                getCategories();
            }
            navigate('dashboard');
        }).catch(error=> {
            console.log(error);
            setError(error.message)
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

    // const handleSubmit= async (e) =>{
    //     const user = {...formData,profile_pic: ''}
    //     e.preventDefault();
    //     if (signup) {
    //         push(ref(firebaseDb, 'users'), user).then(result =>{
    //             console.log(result);
    //         }).catch(error=>{
    //             console.log(error);
    //         });
    //     }else{
    //         firebaseEmailSignIn(formData.email, formData.password).then(result =>{
    //             console.log(result);
    //         }).catch(error => {
    //             console.log(error);
    //         })
    //         onValue(ref(firebaseDb,'users'), (snapshot =>{
    //             console.log(snapshot.val());

    //         }))
    //     }
    // }
    return (
        <div>
            <h1 className=" font-Space-Grotesk font-bold my-4 text-2xl text-center">Spirit Quiz</h1>
            {/* <form onSubmit={handleSubmit} className=" flex flex-col justify-center mx-auto text-center p-4 border border-yellow-600 w-1/2 rounded-xl">
                {signup && <input className=" w-3/4 mx-auto focus:outline-none mb-4 p-2 bg-amber-200" type="text" name="full_name" onChange={(e)=> setFormData(prev=> ({...prev, full_name: e.target.value}))} placeholder='Enter full name' value={formData.full_name} />}
                <input className=" w-3/4 mx-auto focus:outline-none mb-4 p-2 bg-amber-200" type="email" name="email" onChange={(e)=> setFormData(prev=> ({...prev, email: e.target.value}))} placeholder='Enter email'/>
                <div className="flex items-center gap-2 w-3/4 mx-auto mb-4 bg-amber-200">
                    <input className=" w-full focus:outline-none bg-transparent p-1" type={visible? "text":"password"} name="password" onChange={(e)=> setFormData(prev=> ({...prev, password: e.target.value}))} placeholder='Enter password'/>
                    <div className=' p-3 hover:bg-amber-300 cursor-pointer' onClick={()=>setVisible(!visible)}>
                        {visible? <AiFillEyeInvisible /> : <AiFillEye />}
                    </div>
                </div>
                <p className=' text-sm hover:underline text-amber-700 cursor-pointer' onClick={()=> setSignUp(!signup)}>{signup? "have an account? Sign In": "don't have an account? Sign Up"}</p>
                <input className="border border-yellow-600 w-2/4 mx-auto mb-2 cursor-pointer p-2 font-Space-Grotesk font-semibold rounded-lg hover:bg-yellow-200" type="submit" name="" value={signup? "Sign Up": "Sign In"}/>
            </form> */}
                <button type="button" className=' border border-yellow-600 flex items-center justify-center gap-2 text-center mx-auto w-2/4 cursor-pointer p-2 font-Space-Grotesk font-semibold rounded-lg hover:bg-yellow-200' onClick={googleSignin}><p>Sign In With Google</p> <FcGoogle size={20}/> </button>
            <ToastContainer/>
        </div>
    )
}
