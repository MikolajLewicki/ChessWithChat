import React, {useEffect, useState} from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainView from "./views/MainVIew/MainView";
import PreviewView from "./views/PreviewView/PreviewView";
import ChangeAccessView from "./views/ChangeAccessView/ChangeAccessView";

const App = () => {

    return(
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<Navigate to={`/home`} /> } />  
                <Route path="/home" element={<MainView />} />
                <Route path="/preview" element={<PreviewView />} />
                <Route path="/changeAccess" element={<ChangeAccessView />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App