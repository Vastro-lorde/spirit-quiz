import axios from 'axios';
import {useEffect, useState} from 'react';
import { NavLink, useSearchParams } from "react-router-dom";
import { GET_RANDOM_20QUESTIONS } from '../services/links';
import Question from './Question';
import { getUser, shuffleArray } from '../services/hooks';
import { ProgressBar } from './ProgressBar';
import { ToastContainer, toast } from 'react-toastify';
import { ReactComponent as Like } from "../assets/like.svg";
import { push, ref } from 'firebase/database';
import { firebaseDb } from '../services/firebase';

export const Quiz = () => {
    const user = getUser()
    const totalquestions = 20
    const [params] = useSearchParams();
    const [questions, setQuestions] = useState([]);
    // const [pastQuestions, setPastQuestion] = useState([]);
    const [endExam, setEndExam] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [error, setError] = useState('');
    const [question, setQuestion] = useState('');
    const [questionNumber, setQuestionNumber] = useState(0);
    const [options, setOptions] = useState([]);
    const [started, setStarted] = useState(false);
    const [finishedTime, setFinishedTime] = useState(0);
    const [time, setTime] = useState(300);
    const instructionStyle = ' text-slate-800 text-sm my-2'

    const category = params.get('category');
    document.title= category+ " quiz"
    useEffect(() => {
        const controller = new AbortController();
        axios.get(GET_RANDOM_20QUESTIONS+category).then(result=>{
            result.data.forEach(element => {
                setQuestions((prev)=> [...prev,{...element,selectedAnswer:''}])
            });
        }).catch(error=>{
            console.log(error);
        })
        return () => controller.abort();
    }, [category])


    const startQuiz = () => {
        console.log(questions);
        setStarted(true);
        setQuestion(questions[questionNumber].question);
        let newOptions = [...questions[questionNumber+1].incorrectAnswers,questions[questionNumber+1].correctAnswer,];
        setOptions(()=> shuffleArray(newOptions));
    }

    const answerQuestion = (option) =>{
        if (questions[questionNumber].correctAnswer === option) {
            setScore(score +(1/totalquestions * 100))
        }
        setSelectedAnswer(option)
        const updatedQuestions = questions.map((question)=>{
            if (question.question === question) {
                return{...question, selectedAnswer: option};
            }
            return question;
        })
        setQuestions(updatedQuestions)
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
            push(ref(firebaseDb,'user/'+user.full_name.replace(' ','')+'/result'),{
                user: getUser(),
                finishedTime: 300 - time,
                score,
                category,
                questions
            });
            setEndExam(true)
        }else{
            // const newPastQuestion = {
            //     question,
            //     selectedAnswer: selectedAnswer,
            //     correctAnswer: questions[questionNumber].correctAnswer,
            //     options
            // }
            // if (pastQuestions.includes(newPastQuestion)) {
            //     const updatedPastQuestion = pastQuestions.map(pastQuestion => {
            //         if (pastQuestion.question === newPastQuestion.question) {
            //           return { newPastQuestion };
            //         }
            //         return pastQuestion;
            //       });
            //       setPastQuestion(updatedPastQuestion);
            // }
            // setPastQuestion((prev)=> [...prev,newPastQuestion]);
            setQuestionNumber(questionNumber+1);
            setQuestion(questions[questionNumber+1].question)
            setSelectedAnswer('');
            let newOptions = [...questions[questionNumber+1].incorrectAnswers,questions[questionNumber+1].correctAnswer,];
            console.log(questionNumber);
            setOptions(shuffleArray(newOptions));
        }
        
    }

    const previousQuestion = () =>{
        setQuestionNumber(questionNumber-1);
        console.log(questionNumber);
            setQuestion(questions[questionNumber-1].question)
            setSelectedAnswer(questions[questionNumber-1].selectedAnswer);
            let newOptions = [...questions[questionNumber-1].incorrectAnswers,questions[questionNumber-1].correctAnswer];
            console.log(questionNumber);
            setOptions(shuffleArray(newOptions));
    }


    useEffect(() => {
        const intervalID = setInterval(() => {
            setTime(time-1);
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
            <h1 className=' font-Space-Grotesk font-bold mt-8 text-3xl'>{category.toLocaleUpperCase().replace(/_+/g,' ')} QUIZ</h1>
            {!started && <div>
                <p>Welcome to the Spirit Quiz! Please read the instructions carefully before starting:</p>
                <ul className=' border border-amber-600 md:w-2/4 w-full p-4 rounded-md my-2'>
                    <li className={instructionStyle}>&#9752; This quiz contains {totalquestions} questions, and you will have 30 seconds to answer each question.</li>
                    <li className={instructionStyle}>&#9752; Once you start the quiz, you are not allowed to leave the tab or the quiz will automatically end.</li>
                    <li className={instructionStyle}>&#9752; You cannot go back to previous questions once you have moved on to the next one.</li>
                    <li className={instructionStyle}>&#9752; Select the best answer for each question from the options provided</li>
                    <li className={instructionStyle}>&#9752; You will receive a score at the end of the quiz based on the number of correct answers.</li>
                </ul>
                <button type="button" onClick={startQuiz} className=' px-4 py-1 text-white bg-lime-800 rounded-md'>Start</button>
            </div>}
            {started && <div>
                <ProgressBar progress={(questionNumber+1)/20*100} progressWidth={2.0}/>
                {time > 0 && <p>Seconds {time} left.</p>}
                <Question question={question} questionNumber={questionNumber}/>
                <div className=' px-8 text-sm mb-6'>
                    {options? options.map((option, index)=>(
                        <div onClick={()=>answerQuestion(option)} className={`${selectedAnswer === option? ' bg-slate-400 ': ''} +' my-2 p-2 border-l-2 hover:bg-slate-300 cursor-pointer w-max'`} key={index}>
                            <p>{option}</p>
                        </div>
                    )): <p>options loading</p>}
                </div>
                <button type="button" disabled={questionNumber < 1} onClick={()=> previousQuestion()} className=' px-4 py-1 hidden text-white bg-lime-800 rounded-md'>Previous</button>
                <button type="button" onClick={()=> nextQuestion()} className=' px-4 py-1 text-white bg-lime-800 rounded-md'>{questionNumber+1 >= questions.length? "Finish": "Next"}</button>
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
            </div>}
        </div>
    )
}
