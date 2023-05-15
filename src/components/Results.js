import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { getUser } from '../services/hooks';
import { GET_RESULTS } from '../services/links';
import { config } from '../services/details';


export const Results = () => {
    const [results, setResults] = useState([]);
    const resultItemStyle = ' w-48';
    const user = getUser();
    document.title = user.full_name+ " result";

        const fetchData = useCallback(async (signal) => {
            try {
                console.log(config);
            const result = await axios.get(GET_RESULTS+user.id, {signal,...config()});
            console.log(result.data);
            setResults(() => [...result.data]);
            } catch (error) {
            if (!signal.aborted) {
                console.log(error);
            }
            }
        }, [user.id]);

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
            <h1 className=' font-Space-Grotesk font-bold text-xl mb-4'>Spirit Quiz Results</h1>
            <ol className=' w-2/3'>
                    <li className=' flex gap-2 bg-amber-200 p-4'>
                        <p className={resultItemStyle}>Category</p>
                        <p className={resultItemStyle}>Score</p>
                        <p className={resultItemStyle}>Duration</p>
                        <p className={resultItemStyle}>TimeTaken</p>
                    </li>
                {results?.length > 0? results.map((result, index)=> (
                    <li className=' flex gap-2 p-4' key={index}>
                        <p className={resultItemStyle}>{result.CategoryName}</p>
                        <p className={resultItemStyle}>{result.Score}</p>
                        <p className={resultItemStyle}>{result.Duration}</p>
                        <p className={resultItemStyle}>{new Date(result.CreatedAt).toLocaleDateString()}</p>
                    </li>
                )): <p className='p-4'>no results</p>}
            </ol>
        </div>
    )
}
