import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

export default function Schedule(){

    const params = useParams();
    const API = 'https://mock-api.driven.com.br/api/v5/cineflex/movies/' + params.idFilme + '/showtimes';
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const promise = axios.get(API);

        promise.then(response => {
            setMovie(response.data);
        });

    }, []);

    console.log(movie)

    if(movie === null){
        return "";
    }

    return (
        <>
        <Select>Selecione o horário</Select>
        <Sessions>
            {(movie.days).map((render, index) => 
                (<Session date={render.date} weekday={render.weekday} showtimes={render.showtimes} key={index} />)
            )} 
        </Sessions>
        <Footer image={movie.posterURL} title={movie.title}/>
        </>
    );

}

function Session(props){

    const { date, weekday, showtimes } = props;
    
    return (
        <>
            <Date>{weekday} - {date}</Date>
            <HourContainer>
                {showtimes.map((render, index) => 
                    (<MovieHour hour={render.name} key={index} />)
                )}
            </HourContainer>
        </>
    );

}

function MovieHour(props){

    return (
        <Hour>{props.hour}</Hour>
    );

}

function Footer(props){

    const { image, alt, title } = props;

    return (
        <FooterInfo>
            <div><img src={image} alt={title} /></div>
            {title}
        </FooterInfo>
    );
    
}

const Select = styled.div `
    width: 100%;
    height: 110px;
    font-size: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 70px;
`

const Sessions = styled.div `
    margin: 0px 0px 150px 25px;
`

const Date = styled.div `
    font-size: 20px;
    margin-bottom: 25px;
`

const HourContainer = styled.div `
    display: flex;
    margin-bottom: 25px;
`

const Hour = styled.div `
    width: 85px;
    height: 45px;
    background-color: #E8833A;
    font-size: 18px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    margin-right: 10px;
`

const FooterInfo = styled.div `
    width: 100%;
    height: 120px;
    background-color: #DFE6ED;
    display: flex;
    align-items: center;
    font-size: 26px;
    border: 1px #9EADBA;
    position: fixed;
    bottom: 0px;
    left: 0px;

    div {
        width: 65px;
        height: 90px;
        background-color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0px 10px 0px 10px;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
        border-radius: 2px;
    }

    img {
        width: 50px;
        height: 70px;
    }
`