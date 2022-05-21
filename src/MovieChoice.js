import { useEffect, useState } from 'react';
import axios from "axios";
import styled from 'styled-components';

export default function MovieChoice(){

    const [movies, setMovies] = useState(null);

    useEffect(() => {

        const promise = axios.get('https://mock-api.driven.com.br/api/v5/cineflex/movies');

        promise.then(response => {
            setMovies(response.data);
        });

    }, []);

    if(movies === null) {
        return "";
    }

    return (
        <>
            <Select>Selecione o filme</Select>
            <Container>
                {movies.map((render, index) => 
                    (<Movie image={render.posterURL} alt={render.title} key={index} />))
                }
            </Container>
        </>
    );

}

function Movie(props){
    
    return (
      <ImageBorder>
          <img src={props.image} alt={props.alt} /> 
      </ImageBorder>
    );

}

const Container = styled.div `

    width: 375px;
    display: flex;
    flex-wrap: wrap;
    margin-left: 30px;

`

const ImageBorder = styled.div `

    height: 210px;
    width: 145px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    margin: 0px 40px 20px 0px;

img {
        width: 130px;
        height: 190px;
    }

`

const Select = styled.div `
    height: 70px;
    font-size: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
`