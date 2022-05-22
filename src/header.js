import styled from "styled-components";

export default function Header(){

    return (
        <>
            <Title>CINEFLEX</Title>
        </>
    );

}

const Title = styled.h1 `
    width: 100%;
    height: 70px;
    background-color: #C3CFD9;
    color: #E8833A;
    font-size: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0px;
    left: 0px;
`