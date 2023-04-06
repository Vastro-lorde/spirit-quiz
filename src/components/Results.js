import { useEffect, useState } from 'react';
import { firebaseDb } from '../services/firebase';
import { getUser } from '../services/hooks';
import { onValue, ref } from 'firebase/database';


export const Results = () => {
    const [results, setResults] = useState([]);
    const resultItemStyle = ' w-48';
    const user= getUser();
useEffect(() => {
    let resultref = ref(firebaseDb ,"users/"+user.full_name.replace(' ',''));
        onValue(resultref, (snapshot)=>{
            console.log(snapshot.val());
            setResults(snapshot.val())
        })
}, [user])
    return (
        <div>
            <h1 className=' font-Space-Grotesk font-bold text-xl mb-4'>Spirit Quiz Results</h1>
            <ol className=' w-2/3'>
                    <li className=' flex gap-2 bg-amber-200 p-4'>
                        <p className={resultItemStyle}>Category</p>
                        <p className={resultItemStyle}>Score</p>
                        <p className={resultItemStyle}>Finish</p>
                    </li>
                {results?.length > 0? results.map((result, index)=> (
                    <li className=' flex gap-2 p-4'>
                        <p className={resultItemStyle}>{result.category}</p>
                        <p className={resultItemStyle}>{result.score}</p>
                        <p className={resultItemStyle}>{result.finishedTime}</p>
                    </li>
                )): <p className='p-4'>no results</p>}
            </ol>
        </div>
    )
}
