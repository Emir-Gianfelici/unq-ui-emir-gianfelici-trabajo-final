import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Questions from "./pages/Questions";

const Router = () => {

    return (

        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path={"/easy"} element={<Questions difficulty={"easy"}/>} />
                <Route path={"/normal"} element={<Questions difficulty={"normal"}/>} />
                <Route path={"/hard"} element={<Questions difficulty={"hard"}/>} />
                <Route path={"/extreme"} element={<Questions difficulty={"extreme"}/>} />
            </Routes>
        </BrowserRouter>

    );

};

export default Router;