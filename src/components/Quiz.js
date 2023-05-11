import axios from 'axios';
import {useCallback, useEffect, useState} from 'react';
import { NavLink, useSearchParams } from "react-router-dom";
import { CREATE_RESULT, GET_OPTIONS, GET_RANDOM_QUESTIONS } from '../services/links';
import Question from './Question';
import { getUser } from '../services/hooks';
import { ProgressBar } from './ProgressBar';
import { ToastContainer, toast } from 'react-toastify';
import { ReactComponent as Like } from "../assets/like.svg";
import { push, ref } from 'firebase/database';
import { firebaseDb } from '../services/firebase';
import { config } from '../services/details';

export const Quiz = () => {
    const user = getUser()
    const [params] = useSearchParams();
    const [questions, setQuestions] = useState([]);
    const totalquestions = questions.length;
    const [endExam, setEndExam] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(true);
    const [selectedOption, setSelectedOption] = useState("")
    const [score, setScore] = useState(0);
    const [error, setError] = useState('');
    const [question, setQuestion] = useState('');
    const [questionNumber, setQuestionNumber] = useState(0);
    const [options, setOptions] = useState([]);
    const [started, setStarted] = useState(false);
    const [finishedTime, setFinishedTime] = useState(0);
    const [time, setTime] = useState(100);
    const instructionStyle = ' text-slate-800 text-sm my-2'

    const categoryId = params.get('categoryid');
    const categoryName = params.get('categoryName');
    document.title= categoryName+ " quiz"
    const fetchQuestions = useCallback(async () => {
        const controller = new AbortController();
        const signal = controller.signal
        try {
           const result = await axios.get(GET_RANDOM_QUESTIONS+categoryId, {signal,...config()});
           result.data? setQuestions(() => [...result.data]): setQuestions([]); ;
           console.log(result.data);
        } catch (error) {
           if (!signal.aborted) {
            console.log(error);
           }
        }
        console.log(signal.reason);
        return () => controller.abort(signal.reason);
     }, [categoryId]);

     const fetchOptions = useCallback(async ( questionId) => {
        const controller = new AbortController();
        const signal = controller.signal
        try {
           const result = await axios.get(GET_OPTIONS+questionId, {signal,...config()});
           setOptions(() => [...result.data]);
           console.log(result.data);
        } catch (error) {
           if (!signal.aborted) {
            console.log(error);
           }
        }
        return controller.abort(signal.reason)
     }, []);

    const createResult = useCallback(async ( userId, categoryId, score) => {
        const controller = new AbortController();
        const signal = controller.signal
        try {
            console.log(config());
           const result = await axios.post(CREATE_RESULT,{signal,...config()},{
            user_id: userId,
            category_id: categoryId,
            score: score
           });
           console.log(result.data);
        } catch (error) {
           if (!signal.aborted) {
            console.log(error);
           }
        }
        return controller.abort(signal.reason)
     }, []);

    useEffect(() => {

       fetchQuestions()

    }, [fetchQuestions])


    const startQuiz = () => {
        console.log(questions);
        setStarted(true);
        const currentQuestion = questions[questionNumber]
        setQuestion(currentQuestion);
        fetchOptions(currentQuestion.id)
        setQuestionNumber(questionNumber+1)
    }

    const answerQuestion = (option) => {
        setSelectedAnswer(option.is_correct)
        setSelectedOption(option.id)
    }

    const nextQuestion = () => {
        console.log(score);
        if (questionNumber+1 >= questions.length) {
            toast('you are doing great', {
                position: "bottom-right",
                closeButton: true,
                autoClose: 30000,
                hideProgressBar: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            setFinishedTime( 300 - time )
            if (selectedAnswer) {
                setScore(score +(1/totalquestions * 100))
            }
            const newResult = {
                user: getUser(),
                finishedTime,
                score: selectedAnswer? score +(1/totalquestions * 100): score,
                categoryName,
                questions,
                createdAt: new Date().toISOString()
            }
            push(ref(firebaseDb,'user/'+user.full_name.split(' ').join('')+'/result'),newResult);
            createResult(newResult.user.id, categoryId, newResult.score)
            setEndExam(true)
        }else{
            if (selectedAnswer) {
                setScore(score +(1/totalquestions * 100))
            }
            const nextQuestion = questions[questionNumber+1]
            setQuestion(nextQuestion);
            fetchOptions(nextQuestion.id)
            console.log(questionNumber);
            setQuestionNumber(questionNumber+1);
            setSelectedAnswer(false)
        }
        
    }


    useEffect(() => {
        const intervalID = setInterval(() => {
            if (started && !endExam) {
                setTime(time-1)
                setFinishedTime(100-time);
            }else{
                setFinishedTime(100-time);
                setTime(time);
            }
          }, 1000);
        if (document.visibilityState ==='hidden' && !endExam && started) {
            setError('changing tab or window attracts a penalty of -2 marks')
            setScore(score-2);
        }
        if (time <= 0 || endExam) {
            setEndExam(true)
            return intervalID? () => clearInterval(intervalID) : null;
          }
      
          return () => clearInterval(intervalID);
    }, [time,endExam,started,score])
    return (
        <div>
            {questions.length > 0 ?
            <>
                <div className="exam-header"><h1 className=' font-Space-Grotesk font-bold mt-8 text-3xl'>{categoryName.toLocaleUpperCase().replace(/_+/g,' ')} QUIZ</h1>
                {!started && <div>
                    <p>Welcome to the Spirit Quiz! Please read the instructions carefully before starting:</p>
                    <ul className=' border border-amber-600 md:w-2/4 w-full p-4 rounded-md my-2'>
                        <li className={instructionStyle}>&#9752; This quiz contains {totalquestions} questions, and you will have 100 seconds to answer all question.</li>
                        <li className={instructionStyle}>&#9752; Once you start the quiz, you are not allowed to leave the tab or the quiz may automatically end.</li>
                        <li className={instructionStyle}>&#9752; You cannot go back to previous questions once you have moved on to the next one.</li>
                        <li className={instructionStyle}>&#9752; Select the best answer for each question from the options provided</li>
                        <li className={instructionStyle}>&#9752; You will receive a score at the end of the quiz based on the number of correct answers.</li>
                    </ul>
                    <button type="button" onClick={startQuiz} className=' px-4 py-1 text-white bg-lime-800 rounded-md'>Start</button>
                    <ToastContainer limit={1} />
                </div>}
                {started && 
                    <div>
                        <ProgressBar progress={(questionNumber+1)/20*100} progressWidth={20}/>
                        <ProgressBar progress={time} progressWidth={2.0}/>
                        {time > 0 && <p>Seconds {time} left.</p>}
                        <Question question={question} questionNumber={questionNumber}/>
                        <div className=' px-8 text-sm mb-6'>
                            {options? options.map((option, index)=>(
                                selectedOption === option.id ?
                                <div onClick={()=>answerQuestion(option)} className={'bg-slate-400 my-2 p-2 border-l-8 hover:bg-slate-300 cursor-pointer w-max'} key={index}>
                                    <p>{option.text}</p>
                                </div> :
                                <div onClick={()=>answerQuestion(option)} className={' my-2 p-2 border-l-8 hover:bg-slate-300 cursor-pointer w-max'} key={index}>
                                    <p>{option.text}</p>
                                </div>
                            )): <p>options loading</p>}
                    </div>
                    {/* <button type="button" disabled={questionNumber < 1} onClick={()=> previousQuestion()} className=' px-4 py-1 hidden text-white bg-lime-800 rounded-md'>Previous</button> */}
                    <button type="button" disabled={endExam} onClick={()=> nextQuestion()} className=' px-4 py-1 text-white bg-lime-800 rounded-md'>{questionNumber+1 >= questions.length? "Finish": "Next"}</button>
                    <ToastContainer limit={1} />
                    {error !== '' && <p className=' text-red-600 text-sm'>{error}</p>}
                </div>}
                {endExam && <div className=' bg-white absolute  top-24 right-0 bottom-o left-0 p-4 m-auto rounded-lg shadow-2xl w-1/3 flex flex-col justify-center text-center z-50'>
                    <div className=' mx-auto'>
                        <Like width={100}/>
                    </div>
                    <p>Nicely done.</p>
                    <p>Here is your score {score}</p>
                    <p>You finished in {finishedTime} seconds</p>
                    <NavLink to='/dashboard' className=' text-amber-700 hover:underline cursor-pointer'>Home</NavLink>
                </div>}</div>
            </>:
            <div className=' bg-white absolute  top-24 right-0 bottom-o left-0 p-4 m-auto rounded-lg shadow-2xl w-1/3 flex flex-col justify-center text-center z-50'>
                <h1>Sorry this quiz is not yet ready</h1>
                <p>Please Try another</p>
                <NavLink to='/dashboard' className=' text-amber-700 hover:underline cursor-pointer'>Home</NavLink>
            </div>
            }
            
            
        </div>
    )
}
