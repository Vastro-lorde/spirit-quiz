import { Outlet } from "react-router-dom"
import { Header } from "./Header"
import { Footer } from "./Footer"
import { Suspense } from "react"
import { Bars } from 'react-loader-spinner';

 const Dashboard = () => {
    return (
        <div className=" flex flex-col justify-between h-screen">
            <Header/>
            <div className=' overflow-y-auto h-full px-8 py-4'>
                <Suspense fallback={
                    <Bars
                    height="100"
                    width="300"
                    color="#FFBF00"
                    ariaLabel="bars-loading"
                    wrapperStyle={{}}
                    wrapperClassName=" mx-auto"
                    visible={true}
                    />
                }>
                    <Outlet />
                </Suspense>
            </div>
            <Footer/>
        </div>
    )
}

export default Dashboard;