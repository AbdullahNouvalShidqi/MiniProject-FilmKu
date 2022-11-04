import { BrowserRouter, Route, Routes } from "react-router-dom";
import Detail from "../pages/Detail";
import Home from '../pages/Home'
import Login from "../pages/Login";
import SignUp from "../pages/Signup";
import User from "../pages/User";

const Router = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path="/signUp" element={<SignUp/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/detail/:id/:type" element={<Detail/>}/>
                <Route path="/user" element={<User/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;