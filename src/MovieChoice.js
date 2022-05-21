import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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

    console.log(movies);

    if(movies === null) {
        return "";
    }

    return (
        <>
            <Select>Selecione o filme</Select>
            <Container>
                {movies.map((render, index) => 
                    (<Movie image={render.posterURL} alt={render.title} id={render.id} key={index} />))
                }
            </Container>
        </>
    );

}

function Movie(props){

    const { alt, image, id } = props;
    
    return (
      <ImageBorder>
          <Link to={'/sessoes/' + id}>
            <img src={image} alt={alt} /> 
          </Link>
      </ImageBorder>
    );

}

const Container = styled.div `

    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-left: 25px;

`

const ImageBorder = styled.div `

    height: 210px;
    width: 145px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    margin: 0px 25px 20px 0px;

img {
        width: 130px;
        height: 190px;
        cursor: pointer;
    }

`

const Select = styled.div `
    height: 70px;
    font-size: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
`