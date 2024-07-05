import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Questions from "./pages/Questions";

import { useState, useEffect } from "react";
import axios from "axios";

const Router = () => {

    const [difficulties, setDifficulties] = useState([]);

    useEffect(() => {
        const get_difficulties = async () => {
            const url = "https://preguntados-api.vercel.app/api/difficulty";
            const response = await axios.get(url);
            setDifficulties(response.data);
        };

        get_difficulties();

    }, [axios]);

    return (

        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                {difficulties.map(
                    difficulty => 
                        <Route path={difficulty} element={<Questions difficulty={difficulty}/>} key={difficulty} />
                    )}
            </Routes>
        </BrowserRouter>

    );

};

export default Router;