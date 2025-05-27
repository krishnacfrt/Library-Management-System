import React from "react";
import {Route, Routes} from 'react-router-dom'
import Home from "../Components/Home";
import StudentDashbaord from "../Components/StudentDashboard";
import AdminDashbaord from "../Components/AdminDashbaord";

export default function AppRoutes (){
    return (
            <Routes>
                <Route path='/' element={<Home/>}></Route>
                <Route path='/students' element={<StudentDashbaord />}></Route>
                <Route path='/librarian' element={<AdminDashbaord/>}></Route>
            </Routes>
    )
}