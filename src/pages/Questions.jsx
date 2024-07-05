import { useState, useEffect } from "react";
import axios from "axios";

const Questions = ({ difficulty }) => {

    const [questions, setQuestions] = useState([]);

    useEffect(() => {

        const get_questions = async () => {
            try {
                const url = `https://preguntados-api.vercel.app/api/questions?difficulty=${difficulty}`;
                const response = await axios.get(url);
                setQuestions(response.data);
                console.log(response.data);
            }
            catch (e) { //Mejorar el handleo.
                console.log(e);
            };
        };

        get_questions();

    }, [axios]);

    return (
        
        <div>
            {

            }
        </div>

    );
};

export default Questions;