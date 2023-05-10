import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { GET_CATEGORIES } from "../services/links";
import axios from "axios";
import { config } from "../services/details";

export const Overview = () => {
    const [categories, setCategories] = useState([]);
    document.title = "Spirit Quiz"

    useEffect(() => {
        const controller = new AbortController();
        console.log(config.headers.Authorization);
        console.log(process.env.NODE_ENV);
        axios.get(GET_CATEGORIES, config).then(result=>{
            console.log(result);
            Object.values(result.data).forEach(element => {
                setCategories((prev)=> [...prev,...element])
            });
        }).catch(error=>{
            console.log(error);
        })
        return () => controller.abort();
    }, [])

    return (
        <div>
            <h1 className=" font-bold text-2xl text-center m-4">Overview</h1>
            <h2 className=" text-center">Select Subject</h2>
            <div className=" overflow-y-auto h-72 p-4 border border-amber-600 w-1/2 mx-auto rounded-lg">
                {categories? categories.map((category, index) =>(
                    <NavLink to={`quiz?categoryid=${category}`} key={index} className=" block border border-slate-200 m-2 px-2 py-1 shadow-md cursor-pointer hover:shadow-sm w-max">
                        {category}
                    </NavLink>
                )): <p>loading</p>}
            </div>
        </div>
    )
}
