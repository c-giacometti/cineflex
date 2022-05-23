import styled from 'styled-components';


export default function Footer(props){

    const { image, title, day, hour } = props;

    return (
        <FooterInfo>
            <div>
                <img src={image} alt={title} />
            </div>
            <span>
                <span>{title}</span>
                <span>{day} {hour}</span>
            </span>
        </FooterInfo>
    );
}

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