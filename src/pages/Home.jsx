import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

        <div>
            <div>
                {difficulties.map(
                    difficulty =>
                        <button onClick={() => go_to_questions_with_difficulty(difficulty)} key={difficulty}>{difficulty}</button>
                )}
            </div>
        </div>
    );

};

export default Home;