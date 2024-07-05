import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Home.css"


const Home = () => {

    const [difficulties, setDifficulties] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const get_difficulties = async () => {
            const url = "https://preguntados-api.vercel.app/api/difficulty";
            const response = await axios.get(url);
            setDifficulties(response.data);
        };

        get_difficulties();

    }, [axios]);

    const go_to_questions_with_difficulty = (difficulty) => {
        navigate(`/${difficulty}`);
    }

    return (

        <div className="homeMainContainer">
            <h1>Bienvenido!</h1>
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