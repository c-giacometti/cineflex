import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './header';
import MovieChoice from './moviechoice';
import Schedule from './schedule';
import Seats from './seats';

export default function Cineflex(){

    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path='/' element={<MovieChoice />} />
                <Route path='/sessoes/:idFilme' element={<Schedule />} />
                <Route path='/assentos/:idSessao' element={<Seats />} />
                {/* <Route path='/sucesso' element={<Confirmation />} />  */}
            </Routes>
        </BrowserRouter>
    );
    
}