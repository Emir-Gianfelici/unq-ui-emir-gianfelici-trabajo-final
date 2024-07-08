import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css"
import Api from "../services/Api";

const Home = () => {

    const [difficulties, setDifficulties] = useState([]);
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const get_difficulties = async () => {
            setIsLoading(true);
            Api.get_difficulties()
                .then(response => {
                    setDifficulties(response.data);
                    setIsLoading(false);
                })
                .catch(error => {
                    setErrorMessage("Ocurrio un error al cargar la pagina.");
                    setIsLoading(false);
                });
        };

        get_difficulties();

    }, [Api]);

    const go_to_questions_with_difficulty = (difficulty) => {
        navigate(`/${difficulty}`);
    }

    const first_letter_to_uppercase = (string) => {

        const first_letter = string.charAt(0);
        const rest_string = string.substring(1);
        return (first_letter.toUpperCase() + rest_string);
    };

    return (

        <div className="app">
            <div className="homeMainContainer">
                <h1 className="appTitle">Preguntados App</h1>
                <div className="errorMessage">
                    {errorMessage == "" ? "" : errorMessage}
                </div>
                <div>
                    <h2 className="selectDifficultyText">Seleccione la dificultad de las preguntas: </h2>
                </div>
                <div>
                    {
                    isLoading ?
                        <div className="loader"></div>
                    :
                        <div>
                            {difficulties.map(
                                difficulty =>
                                    <div className="difficultyButtonContainer" key={difficulty}>
                                        <button className="difficultyButton" onClick={() => go_to_questions_with_difficulty(difficulty)}>
                                            <p>{first_letter_to_uppercase(difficulty)}</p>
                                        </button>
                                    </div>
                            )}
                        </div>
                    }
                </div>
            </div>
            
        </div>
    );

};

export default Home;