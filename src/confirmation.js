import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

export default function Confirmation(){

    const location = useLocation();
    const infos = location.state;

    return (
        <Container>
            <Select>Pedido feito com sucesso!</Select>
            <Session movie={infos.movie} day={infos.day} hour={infos.hour} />
            <Seats bookedSeats={infos.seatNumbers} />
            <Buyer name={infos.name} CPF={infos.CPF} />
            <Button />
        </Container>
    );

}

function Session(props){

    const { movie, day, hour } = props;

    return (
        <Section>
            <Title>Filme e sessão</Title>
            <Info>{movie}</Info>
            <Info>{day} - {hour}</Info>
        </Section>
    );

}

function Seats(props){

    const { bookedSeats } = props;

    return (
        <Section>
            <Title>Ingressos</Title>
            {bookedSeats.map((render, index) => <Info key={index}>Assento {render}</Info>)}
        </Section>
    );

}

function Buyer(props){

    const { name, CPF } = props;
    
    return (
        <Section>
            <Title>Comprador</Title>
            <Info>Nome: {name}</Info>
            <Info>CPF: {CPF}</Info>
        </Section>
    );

}

function Button(){

    return (
        <Link to='/'>
            <Home>Voltar para Home</Home>
        </Link> 
    );

}

const Container = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const Select = styled.div `
    width: 50%;
    height: 110px;
    font-size: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #247A6B;
    font-weight: 700;
    text-align: center;
    margin-top: 70px;
`

const Section = styled.div `
    width: 100%;
    min-height: 110px;
    text-align: left;
    display: flex;
    flex-direction: column;
    margin: 0px 0px 20px 50px;
`

const Title = styled.div `
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 10px;
`

const Info = styled.span `
    font-size: 22px;
    font-weight: 400;
    margin-bottom: 5px;
`

const Home = styled.button `
    height: 45px;
    width: 230px;
    background-color: #E8833A;
    border: none;
    border-radius: 3px;
    font-size: 20px;
    color: white;
    cursor: pointer;
    margin-top: 60px;
`