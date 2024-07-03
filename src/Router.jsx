import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Questions from "./pages/Questions";


const Router = () => {

    return (

        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/:difficulty" element={<Questions />}/>
            </Routes>
        </BrowserRouter>

    );

};

export default Router;