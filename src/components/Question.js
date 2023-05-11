
export const Question = (props) => {
    const { question, questionNumber } = props;

    
  return (
    <div className=' p-4'>
      <p className=" font-semibold">Question {questionNumber+1}</p>
      <p className=" text-sm">{question.text}</p>
    </div>
  );
}

export default Question;
