import { useEffect, useState } from "react";
import { useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import loading from './assets/loading.gif'

export default function Seats(){

    const params = useParams();
    const API = 'https://mock-api.driven.com.br/api/v5/cineflex/showtimes/' + params.idSessao + '/seats';
    const [info, setInfo] = useState(null);
    const [name, setName] = useState("");
    const [CPF, setCPF] = useState("");
    const [seatsArray, setSeatsArray] = useState([]);
    const [seatNumbers, setSeatNumbers] = useState([]);

    useEffect(() => {
        const promise = axios.get(API);

        promise.then(response => 
            {setInfo(response.data);}
        );

        promise.catch(treatError);

    }, [API]);

    if(info === null){
        return (
            <Image>
                <img src={loading} alt='loading' />
            </Image> 
        );
    }

    return (
        <Container>
            <Select>Selecione o(s) assento(s)</Select>
            <SeatChart>
                {(info.seats).map((render, index) => 
                    (<Seat number={render.name} id={render.id} isAvailable={render.isAvailable} seatsArray={seatsArray} 
                    setSeatsArray={setSeatsArray} seatNumbers={seatNumbers} setSeatNumbers={setSeatNumbers} key={index} />)
                )}
            </SeatChart>
            <SeatInfo />
            <Inputs setName={setName} setCPF={setCPF} />
            <Button name={name} CPF={CPF} seatsArray={seatsArray} seatNumbers={seatNumbers} movie={info.movie.title} 
            day={info.day.date} hour={info.name} />
            <Footer image={info.movie.posterURL} title={info.movie.title} day={info.day} hour={info.name} />       
        </Container>
    );

}

function Seat(props){

    const {number, id, isAvailable, seatsArray, setSeatsArray, seatNumbers, setSeatNumbers} = props;
    const [isSelected, setIsSelected] = useState(false);

    function checkSelect(){

        if(isAvailable === false){
            alert('Esse assento não está disponível');
        }

        else if(isSelected === true){
            setIsSelected(false);
            seatsArray.splice(seatsArray.indexOf(id), 1);
            seatNumbers.splice(seatNumbers.indexOf(number), 1);
        }

        else if(isSelected === false){
            setIsSelected(true);
            const newSeatArray = [...seatsArray, id];
            setSeatsArray(newSeatArray);
            const newSeatNumber = [...seatNumbers, number];
            setSeatNumbers(newSeatNumber);
        }
    }

    return (
        <SeatCircle selected={isSelected} isAvailable={isAvailable} onClick={checkSelect}>
            {number}
        </SeatCircle>
    );

}

function SeatInfo(){

    return (
        <Info>
            <div>
                <SeatCircle selected={true} isAvailable={true} />
                <span>Selecionado</span>
            </div>
            <div>
                <SeatCircle selected={false} isAvailable={true} />
                <span>Disponível</span>
            </div>
            <div>
                <SeatCircle selected={false} isAvailable={false} />
                <span>Indisponível</span>
            </div>
        </Info>
    );

}

function Inputs(props){

    const { setName, setCPF } = props;

    return (
        <InputArea>
            <span>Nome do comprador:</span>
            <input placeholder="Digite seu nome..." onChange={((event) => setName(event.target.value))}></input>
            <span>CPF do comprador:</span>
            <input placeholder="Digite seu CPF..." onChange={((event) => setCPF(event.target.value))}></input>
        </InputArea>
    );

}

function Button(props){

    const { name, CPF, seatsArray, seatNumbers, movie, day, hour } = props;
    const navigate = useNavigate();

    function postData(){

        if(name.length > 0 && CPF.length === 11 && seatsArray.length > 0){

            const objectPost = {
                ids: seatsArray,
                name: name,
                cpf: CPF
            }
    
            const promise = axios.post('https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many', objectPost);
    
            promise.then(goToSucess);
            promise.catch(treatError);
        }

        else {
            alert('Selecione um assento e informe dados válidos');
        }

    }

    function goToSucess(){
        navigate('/sucesso', {state:{name, CPF, seatNumbers, movie, day, hour}});
    }

    return (
        <BookSeats onClick={postData}>Reservar assento(s)</BookSeats>
    );

}

function Footer(props){

    const { image, title, day, hour } = props;

    return (
        <FooterInfo>
            <div>
                <img src={image} alt={title} />
            </div>
            <span>
                <span>{title}</span>
                <span>{day.weekday} - {hour}</span>
            </span>
        </FooterInfo>
    );
    
}

function treatError(){
    alert('Ocorreu um erro, tente novamente em instantes');
}

const Image = styled.div `
    margin-top: 100px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        height: 100px;
    }
`

const Container = styled.div `
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const Select = styled.div `
    width: 100%;
    height: 110px;
    font-size: 24px;
    color: #293845;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 70px;
`

const SeatChart = styled.div `
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
`

const SeatCircle = styled.div `
    height: 26px;
    width: 26px;
    border-radius: 13px;
    border: 1px solid ${props => props.isAvailable ? (props.selected ? '#45BDB0' : '#F7C52B') : '#808F9D'};;
    background-color: ${props => props.isAvailable ? (props.selected ? '#8DD7CF' : '#FBE192') : '#C3CFD9'};
    font-size: 11px;
    color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px 7px 5px 0px;
    cursor: pointer;
`

const Info = styled.div `
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin-bottom: 40px;

    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    span {
        display: flex;
        justify-content: space-around;
        font-size: 12px;
        color: #4E5A65;
    }

`

const InputArea = styled.div `
    width: 92%;
    display: flex;
    flex-direction: column;
    align-items: left;
    margin-bottom: 30px;

    input {
        height: 10px;
        font-size: 18px;
        color: #AFAFAF;
        font-style: italic;
        margin: 5px 0px 20px 0px;
        padding: 20px;
    }

`

const BookSeats = styled.button `
    height: 45px;
    width: 230px;
    background-color: #E8833A;
    border: none;
    border-radius: 3px;
    font-size: 20px;
    color: white;
    cursor: pointer;
    margin-bottom: 140px;
`

const FooterInfo = styled.div `
    width: 100%;
    height: 120px;
    background-color: #DFE6ED;
    display: flex;
    align-items: center;
    font-size: 22px;
    border: 1px solid #9EADBA;
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

    span {
        display: flex;
        flex-direction: column;
        color: #293845;
        margin-bottom: 5px;
    }

`