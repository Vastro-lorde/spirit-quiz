import { useCallback, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { GET_CATEGORIES } from "../services/links";
import axios from "axios";
import { config } from "../services/details";

export const Overview = () => {
    const [categories, setCategories] = useState([]);
    document.title = "Spirit Quiz"

    const fetchData = useCallback(async (signal) => {
        try {
           const result = await axios.get(GET_CATEGORIES, {signal,...config()});
           setCategories(() => [...result.data]);
        } catch (error) {
           if (!signal.aborted) {
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

    return (
        <div>
            <h1 className=" font-bold text-2xl text-center m-4">Overview</h1>
            <h2 className=" text-center">Select Subject</h2>
            <div className=" overflow-y-auto h-72 p-4 border border-amber-600 w-1/2 mx-auto rounded-lg">
                {categories? categories.map((category, index) =>(
                        <NavLink to={`quiz?categoryid=${category.id}&categoryName=${category.name}`} key={index} className=" flex border gap-2 items-center border-slate-200 m-2 px-4 py-2 shadow-md cursor-pointer hover:shadow-sm w-max">
                            <div className=" w-6">
                                <img src={category.image_url} alt={category.name} />
                            </div>
                            <p>{category.name}</p>
                        </NavLink>
                    
                )): <p>loading</p>}
            </div>
        </div>
    )
}
