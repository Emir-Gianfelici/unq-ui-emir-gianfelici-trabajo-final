import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Questions.css";
import Api from "../services/Api";

const Questions = ({ difficulty }) => {

    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [actualQuestion, setActualQuestion] = useState(0);
    const [canNextQuestion, setCanNextQuestion] = useState(true);
    const [cantCorrectAnswer, setCantCorrectAnswer] = useState(0);
    const [alreadyAnswered, setAlreadyAnswered] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [element, setElement] = useState(null);
    const navigate = useNavigate();


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
    const handle_answer = async (question_id, option) => {

        setAlreadyAnswered(true);
        const answer = { questionId : question_id, option : option };
        const textElement = document.getElementById(option);
        setElement(textElement);
        Api.post_answer(answer)
            .then(response => {
                check_answer(response.data.answer);
                response.data.answer ? textElement.className = "correctAnswer" : textElement.className = "incorrectAnswer";
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
        
        element.className = "answer";

        if (actualQuestion < questions.length - 1) {
            setActualQuestion(actualQuestion + 1);
            setAlreadyAnswered(false);
        }
        else {
            setCanNextQuestion(false);            
        };

    }

    const first_letter_to_uppercase = (string) => {

        const first_letter = string.charAt(0);
        const rest_string = string.substring(1);
        return (first_letter.toUpperCase() + rest_string);
    };

    const play_again = () => {
        navigate("/");
    }
    
    return (
        
        <div className="app">
            <div className="mainContainer">
                <div className="errorMessage">
                    {errorMessage == "" ? "" : errorMessage}
                </div>
                <div>
                    {
                        isLoading ?
                        <div className="loader"></div>

                        :

                        <div className="questionContainer">
                            <p className="difficultyText">Dificultad: {<span className="difficulty">{first_letter_to_uppercase(difficulty)}</span>}</p>
                            <p className="correctAnswersText">Respuestas Correctas: {<span className="results">{cantCorrectAnswer}/{questions.length}</span>}</p>
                            <p className="questionText">{questions[actualQuestion].Question}</p>
                            <div className="optionsButtonsContainer">
                                {
                                    questions[actualQuestion].Answers.map(answer =>
                                        <button onClick={() => handle_answer(questions[actualQuestion].Id, answer.option)}
                                                key={answer.option}
                                                disabled={alreadyAnswered}
                                                className="optionButton">
                                            <span id={answer.option} className="answer">{answer.answer_text}</span>
                                        </button>
                                    )
                                }
                            </div>
                            <div>
                                {
                                    canNextQuestion ?
                                    <button onClick={() => go_to_next_question()} disabled={!canNextQuestion} className="nextQuestionButton">
                                        <span className="actual-text">&nbsp;Next&nbsp;</span>
                                        <span aria-hidden="true" className="hover-text">&nbsp;Next&nbsp;</span>
                                    </button>
                                    :
                                    <button onClick={() => play_again()} className="againButton">
                                        <span className="actual-text">&nbsp;Again&nbsp;</span>
                                        <span aria-hidden="true" className="hover-text">&nbsp;Again&nbsp;</span>
                                    </button>
                                }
                            </div>
                        </div>
                        
                    }
                </div>
            </div>
        </div>

    );
};

export default Questions;