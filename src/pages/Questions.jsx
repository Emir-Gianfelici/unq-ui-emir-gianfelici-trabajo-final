import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Questions = () => {

    const { difficulty } = useParams();
    const [questions, setQuestions] = useState([]);

    useEffect(() => {

        const get_questions = async () => {
            const url = `https://preguntados-api.vercel.app/api/questions?difficulty=${difficulty}`;
            const response = await axios.get(url);
            setQuestions(response.data);
        };

        get_questions();

    }, [axios]);


    return (
        
        <div>
            {difficulty}
        </div>

    );
};

export default Questions;