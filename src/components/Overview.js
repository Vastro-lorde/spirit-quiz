import { NavLink } from "react-router-dom";

export const Overview = () => {
    let categories = []
    categories = categories.concat(...Object.values(JSON.parse(localStorage.getItem('categories'))));

    return (
        <div>
            <h1 className=" font-bold text-2xl text-center m-4">Overview</h1>
            <h2 className=" text-center">Select Subject</h2>
            <div className=" overflow-y-auto h-72 p-4 border border-amber-600 w-1/2 mx-auto rounded-lg">
                {categories? categories.map((category, index) =>(
                    <NavLink to={`quiz?category=${category}`} key={index} className=" block border border-slate-200 m-2 px-2 py-1 shadow-md cursor-pointer hover:shadow-sm w-max">
                        {category}
                    </NavLink>
                )): <p>loading</p>}
            </div>
        </div>
    )
}
