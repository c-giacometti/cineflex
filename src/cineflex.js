import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './header'
import MovieChoice from './MovieChoice'
import Schedule from './schedule'

export default function Cineflex(){

    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path='/' element={<MovieChoice />} />
                <Route path='/sessoes/:idFilme' element={<Schedule />} />
            {/*    <Route path='/assentos/:idSessao' element={<Seats />} />
                <Route path='/sucesso' element={<Confirmation />} /> */}
            </Routes>
        </BrowserRouter>
    );
    
}