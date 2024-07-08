import { useState, useEffect } from "react";
import "./Questions.css";
import Api from "../services/Api";

const Questions = ({ difficulty }) => {

    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [actualQuestion, setActualQuestion] = useState(0);
    const [canNextQuestion, setCanNextQuestion] = useState(true);
    const [cantCorrectAnswer, setCantCorrectAnswer] = useState(0);
    const [alreadyAnswered, setAlreadyAnswered] = useState(false);
    const [button, setButton] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");


    useEffect(() => {

        const get_questions = async () => {

            Api.get_questions(difficulty)
                .then(response => {
                    prepare_questions(response.data);
                    setIsLoading(false);
                })
                .catch(error => {
                    setIsLoading(false);
                    setErrorMessage("Ocurrio un error al cargar las preguntas.");
                });
        };

        get_questions();

    }, [Api]);


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
    const handle_answer = async (question_id, option, element) => {

        setAlreadyAnswered(true);
        setButton(element);

        const answer = { questionId : question_id, option : option };

        Api.post_answer(answer)
            .then(response => {
                check_answer(response.data.answer);
                response.data.answer ? element.target.className = "correctAnswerButton" : element.target.className = "incorrectAnswerButton";
            })
            .catch(error => {
                setErrorMessage("Ocurrio un error al verificar la respuesta.");
            });
    }

    const check_answer = (answer_result) => {
        
        if (answer_result) {
            setCantCorrectAnswer(cantCorrectAnswer + 1);
        };
    };

    const go_to_next_question = () => {
        
        if (actualQuestion < questions.length - 1) {
            setActualQuestion(actualQuestion + 1);
            setAlreadyAnswered(false);
            button.target.className = "";
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
            <div className="errorMessage">
                {errorMessage == "" ? "" : errorMessage}
            </div>
            <p>Dificultad: {difficulty}</p>
            <p>Respuestas Correctas: {cantCorrectAnswer} / {questions.length}</p>
            {
                questions[actualQuestion].Question
            }
            <div>
                {
                    questions[actualQuestion].Answers.map(answer =>
                        <button onClick={(e) => handle_answer(questions[actualQuestion].Id, answer.option, e)}
                                key={answer.option}
                                disabled={alreadyAnswered}>
                            {answer.answer_text}
                        </button>
                    )
                }
            </div>
            <button onClick={() => go_to_next_question()} disabled={!canNextQuestion}>Next</button>
        </div>

    );
};

export default Questions;