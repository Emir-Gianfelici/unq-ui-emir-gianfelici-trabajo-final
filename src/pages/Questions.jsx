import { useState, useEffect } from "react";
import axios from "axios";

const Questions = ({ difficulty }) => {

    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [actualQuestion, setActualQuestion] = useState(0);
    const [canNextQuestion, setCanNextQuestion] = useState(true);
    const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);


    useEffect(() => {

        const get_questions = async () => {
            try {
                const url = `https://preguntados-api.vercel.app/api/questions?difficulty=${difficulty}`;
                const response = await axios.get(url);
                prepare_questions(response.data);
                setIsLoading(false);
            }
            catch (e) { //Mejorar el handleo.
                console.log(e);
                setIsLoading(false);
            };
        };


        get_questions();

    }, [axios]);


    //Preparando las preguntas.
    const prepare_questions = (questions_to_prepare) => {
        
        var random_questions = [];
        var prepared_questions = [];

        for(var i = 0; i < 5; i++) {
            var random_number = get_random_number(0, questions_to_prepare.length - 1);
            random_questions.push(questions_to_prepare[random_number]);
            questions_to_prepare.splice(random_number, 1);
        };

        random_questions.map(question => 
            prepared_questions.push(
                {
                Id: question.id, 
                Question : question.question, 
                Answers : [
                    {option: 'option1', answer_text: question.option1}, 
                    {option: 'option2', answer_text: question.option2}, 
                    {option: 'option3', answer_text: question.option3},
                    {option: 'option4', answer_text: question.option4}
                ]})
        );

        setQuestions(prepared_questions);
    };

    const get_random_number = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
      
        return (Math.floor(Math.random() * (max - min)) + min);
    };


    //Manejando las respuestas.
    const handle_answer = async (question_id, option) => {
        try {
            const url = `https://preguntados-api.vercel.app/api/answer`;
            const data = {questionId: question_id, option: option};
            const response = await axios.post(url, data);
            setIsCorrectAnswer(response.data.answer);
        }
        catch (e) { //Mejorar el handleo.
            console.log(e);
        };
    }

    const go_to_next_question = () => {
        
        if (actualQuestion < questions.length - 1) {
            setActualQuestion(actualQuestion + 1);
        }
        else {
            setCanNextQuestion(false);
        };

    }


    //Snipper
    if (isLoading) {
        console.log("No hay questions");
        return <div>Loading...</div>;

    };
    

    return (
        
        <div>
            {
                questions[actualQuestion].Question
            }
            <div>
                {
                    questions[actualQuestion].Answers.map(answer =>
                        <button onClick={() => handle_answer(questions[actualQuestion].Id, answer.option)} 
                                key={answer.option}
                                className={isCorrectAnswer ? "correctAnswerButton" : "incorrectAnswerButton"}>
                            {answer.answer_text}
                        </button>
                    )
                }
            </div>
            <button onClick={() => go_to_next_question()} className={canNextQuestion ? "enabledButton" : "disabledButton"}>Next</button>
        </div>

    );
};

export default Questions;