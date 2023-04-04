import { Outlet } from "react-router-dom"
import { Header } from "./Header"
import { Footer } from "./Footer"

export const Dashboard = () => {
    return (
        <div className=" flex flex-col justify-between h-screen">
            <Header/>
            <div className=' overflow-y-auto h-full px-8 py-4'>
                <Outlet />
            </div>
            <Footer/>
        </div>
    )
}
