import React, { useCallback, useEffect, useState } from 'react'
import { getCloudinaryId, getUser } from '../services/hooks';
import { config } from '../services/details';
import axios from 'axios';
import profile_image from '../assets/profile_image.png';
import { Bars } from 'react-loader-spinner';
import { GET_USER, UPDATE_USER, UPLOAD_IMAGE } from '../services/links';

export const ProfilePage = () => {
    const [error, setError] = useState('');
    const [editMode, setEditMode] = useState(false)
    const [file, setFile] = useState({});
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("")
    const [image_url, setImageurl] = useState("")
    const [preview, setPreview] = useState();

    const [isDragging, setIsDragging] = useState(false);
    const fetchData = useCallback(async (signal) => {
        const userClaim = getUser();
        setLoading(true)
        try {
            console.log(userClaim);
        const result = await axios.get(GET_USER+userClaim.id, {signal,...config()});
        console.log(result.data);
        setLoading(false)
        setUser(result.data)
        setName(result.data.full_name)
        setImageurl(result.data.image_url)
        } catch (error) {
        if (!signal.aborted) {
            setLoading(false)
            console.log(error);
        }
        }
    }, []);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal

        try {
            fetchData(signal);
        } catch (error) {
            console.log(error);
        }
        return () => controller.abort(signal.reason);
    }, [fetchData])

  function handleDragOver(event) {
    event.preventDefault();
    setIsDragging(true);
  }

  function handleDrop(event) {
    event.preventDefault();
    setIsDragging(false);
    const files = event.dataTransfer.files;
    console.log(files);
    setFile(event.dataTransfer.files[0]);
    setPreview(URL.createObjectURL(event.dataTransfer.files[0]));
  }

  function handleDragLeave(event) {
    event.preventDefault();
    setIsDragging(false);
  }

    const handleFile = (e) => {
        e.preventDefault();
        setFile(e.currentTarget.files[0]);
        setPreview(URL.createObjectURL(e.currentTarget.files[0]));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        console.log({user, image_url, name});
            
            if (file.name) {
                const formData = new FormData();
                formData.append('file', file);
                const fileConfig = config();
                fileConfig.headers['Content-Type'] = 'multipart/form-data'
                axios.post(UPLOAD_IMAGE,formData,{...fileConfig}).then(result => {
                    setImageurl(result.data.url)
                    axios.patch(UPDATE_USER,{
                        id: user.id,
                        name,
                        image_url: result.data.url,
                    },{...config()}).then(result => {
                        console.log(result.data);
                        setLoading(false)
                    }).catch(error => {
                        console.log(error);
                        setLoading(false)
                        setError(error.response.data.error)
                    });
                }).catch(error =>{
                    console.log(error);
                    setError(error.message)
                    return
                });
                
            }else{
                console.log(user);
                axios.patch(UPDATE_USER,{
                    id: user.id,
                    name
                },{...config()}).then(result => {
                    console.log(result.data.data);
                    setLoading(false)
                    localStorage.setItem("user",JSON.stringify(result.data.data))
                }).catch(error => {
                    setLoading(false)
                    console.log(error);
                });
            }

            
        
        console.log(getCloudinaryId(2, image_url));
    }

    return (
        <div>
            <h1 className=' font-Space-Grotesk '>Profile Page</h1>
            <form onSubmit={(e)=>handleSubmit(e)} className=' border-2 flex flex-col justify-center text-center gap-4 p-8 w-1/2 mb-4 transition-all mx-auto'>
                {error && <p className=' text-sm text-red-600'>{error}</p>}
                {editMode?
                    <label htmlFor="dropzone-file" 
                        style={{ border: isDragging ? '2px dashed blue' : ''}}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        onDragLeave={handleDragLeave} className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-copy bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div className="flex flex-col items-center justify-center pt-2 pb-3">
                                <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                <p className="mb-2 text-2xs text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                <p className=" text-3xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                        </div>
                        <div className=' w-16 rounded-full overflow-hidden'>
                            <img src={preview? preview:image_url? image_url: profile_image} alt={name}/>
                        </div>
                        {/* input data goes here */}
                        <input id="dropzone-file" type="file" className="hidden" onChange={handleFile} />
                    </label>
                    :
                    <div className=' w-32 rounded-full overflow-hidden mx-auto'>
                        <img src={preview? preview:image_url? image_url: profile_image} alt={name}/>
                    </div>
                }
                
                
                <div>
                    {editMode?
                        <input type='text' disabled={!editMode} onChange={(e)=> {setName(e.currentTarget.value)}}  className=' disabled:bg-transparent bg-slate-300 md:text-base text-sm font-Space-Grotesk font-bold' value={name} />
                        :
                        <p className=' md:text-base text-sm font-Space-Grotesk font-bold'>{name}</p>
                    }
                    <p className=' md:text-sm text-2xs'>{user.email}</p>
                </div>
                <p className='text-2xs'>Created: {new Date(user?.created_at).toDateString()}</p>
                <div className='flex gap-4 mx-auto w-1/2 justify-center'>
                    <button type='button' className='text-sm font-Space-Grotesk font-bold bg-gray-500 py-2 px-4 rounded-md hover:bg-gray-600 hover:text-white transition-all text-gray-200' onClick={() => setEditMode(!editMode)}>{editMode? "Save" : "Edit"}</button>
                    <button type='submit' className='text-sm font-Space-Grotesk font-bold bg-gray-500 py-2 px-4 rounded-md disabled:bg-slate-300 hover:bg-gray-600 hover:text-white transition-all text-gray-200' disabled={editMode}>
                    {loading?
                    <div className=' mx-auto'>
                        <Bars
                            height="20"
                            width="50"
                            color="#FFBF00"
                            ariaLabel="bars-loading"
                            wrapperStyle={{}}
                            wrapperClassName=" mx-auto"
                            visible={true}
                            />
                        </div>:
                        "Submit"
                    }
                        </button>
                </div>
            </form>
        </div>
    )
}
