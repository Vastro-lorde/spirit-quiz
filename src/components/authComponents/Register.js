import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { firebaseGoogleSignIn } from '../../services/firebase';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { getCategories } from '../../services/hooks';
import { SIGNUP_URL, UPLOAD_IMAGE } from '../../services/links';
import { config } from '../../services/details';

export const Register = () => {
    const navigate = useNavigate();
    const [visible, setVisible] = useState(true);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [file, setFile] = useState({});
    const [preview, setPreview] = useState();

    const handleFile = (e) => {
        e.preventDefault();
        setFile(e.currentTarget.files[0]);
        setPreview(URL.createObjectURL(e.currentTarget.files[0]));
    }

    const googleSignin = () =>{
        firebaseGoogleSignIn().then(async result => {
            console.log(result);
            let register = await axios.post(SIGNUP_URL,{
                full_name : result.user.displayName,
                email : result.user.email,
                password : result.user.uid,
                image_url: result.user.photoURL
            }) 

            console.log(register);
            if (register.status === 201) {
                setError(null)
                setFile(null)
                sessionStorage.setItem('user',JSON.stringify(register.data))
                if (!JSON.parse(localStorage.getItem('categories'))) {
                    getCategories();
                }
                navigate('dashboard');
            }
            
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

    const handleSubmit= async (e) =>{
        e.preventDefault();

        const fileData = new FormData();
        fileData.append('file', file);
        config.headers['Content-Type'] = 'multipart/form-data';

        let fileUrl = ""
        const uploadResult = await axios.post(UPLOAD_IMAGE,formData, config );
        console.log(uploadResult);
        fileUrl = uploadResult.data.url

        let register = await axios.post(SIGNUP_URL,{
            name : formData.name,
            email : formData.email,
            password : formData.password,
            image_url: fileUrl
        }) 
        console.log(register);
        if (register.status === 201) {
            setError(null)
            setFile(null)
        }


    }
    return (
        <div>
            <h1 className=" font-Space-Grotesk font-bold my-4 text-2xl text-center">Spirit Quiz</h1>
            <form onSubmit={handleSubmit} className=" flex flex-col justify-center mx-auto text-center p-4 border border-yellow-600 w-1/2 rounded-xl">
            
            <div className="flex items-center justify-center w-1/2 mx-auto my-2">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    { file?
                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                        </div> :
                        <div>
                            <img src={preview} alt={file.name}/>
                        </div>
                    }
                    {/* input data goes here */}
                    <input id="dropzone-file" type="file" className="hidden" onChange={handleFile} />
                </label>
            </div> 

            <input className=" w-3/4 mx-auto focus:outline-none mb-4 p-2 bg-amber-200" type="text" name="name" onChange={(e)=> setFormData(prev=> ({...prev, email: e.target.value}))} placeholder='Enter fullname'/>
                <input className=" w-3/4 mx-auto focus:outline-none mb-4 p-2 bg-amber-200" type="email" name="email" onChange={(e)=> setFormData(prev=> ({...prev, email: e.target.value}))} placeholder='Enter email'/>
                <div className="flex items-center gap-2 w-3/4 mx-auto mb-4 bg-amber-200">
                    <input className=" w-full focus:outline-none bg-transparent p-1" type={visible? "text":"password"} name="password" onChange={(e)=> setFormData(prev=> ({...prev, password: e.target.value}))} placeholder='Enter password'/>
                    <div className=' p-3 hover:bg-amber-300 cursor-pointer' onClick={()=>setVisible(!visible)}>
                        {visible? <AiFillEyeInvisible /> : <AiFillEye />}
                    </div>
                </div>
                <p className=' text-sm hover:underline text-amber-700 cursor-pointer'>don't have an account? <Link to={"register"}>Sign Up</Link></p>
                <input className="border border-yellow-600 w-2/4 mx-auto mb-2 cursor-pointer p-2 font-Space-Grotesk font-semibold rounded-lg hover:bg-yellow-200" type="submit" name="" value={"Register"}/>
            </form>
                <button type="button" className=' border border-yellow-600 flex items-center justify-center gap-2 text-center mx-auto w-2/4 cursor-pointer p-2 font-Space-Grotesk font-semibold rounded-lg hover:bg-yellow-200' onClick={googleSignin}><p>Sign Up With Google</p> <FcGoogle size={20}/> </button>
            <ToastContainer/>
        </div>
    )
}
