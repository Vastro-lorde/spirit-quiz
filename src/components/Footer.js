import Clock from "./Clock"

export const Footer = () => {
    
    return (
        <div className=" p-4 bg-amber-50 shadow-sm border border-gray-300">
            <p className=" text-2xs md:text-base"><q>An impossible task is an array of possible tasks, just iterate</q>- Seun Daniel Omatsola</p>
           <Clock/>
        </div>
    )
}
