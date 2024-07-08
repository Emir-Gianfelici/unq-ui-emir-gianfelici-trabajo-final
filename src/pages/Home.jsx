import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css"
import Api from "../services/Api";

const Home = () => {

    const [difficulties, setDifficulties] = useState([]);
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const get_difficulties = async () => {
            Api.get_difficulties()
                .then(response => {
                    setDifficulties(response.data);
                })
                .catch(error => {
                    setErrorMessage("Ocurrio un error al cargar la pagina.");
                });
        };

        get_difficulties();

    }, [Api]);

    const go_to_questions_with_difficulty = (difficulty) => {
        navigate(`/${difficulty}`);
    }

    return (

        <div className="homeMainContainer">
            <h1>Bienvenido!</h1>
            <div className="errorMessage">
                {errorMessage == "" ? "" : errorMessage}
            </div>
            <div>
                <h2>Para comenzar, seleccione la dificultad de las preguntas: </h2>
            </div>
            <div>
                {difficulties.map(
                    difficulty =>
                        <div className="difficultyButtonContainer" key={difficulty}>
                            <button className="difficultyButton" onClick={() => go_to_questions_with_difficulty(difficulty)}>{difficulty}</button>
                        </div>
                )}
            </div>
        </div>
    );

};

export default Home;