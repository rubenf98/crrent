import React from 'react'
import styled from "styled-components";

const Container = styled.div`
    padding: 10px 20px;
    box-sizing: border-box;
    border-radius: 6px;
    box-shadow: 0px 0px 5px 0px #c6c6c6;
    background-color: white;
    
    h2 {
        opacity: .7;
        display: inline-block;
        font-weight: bold;
        border-bottom: 1px solid #00000040;
        padding: 10px 0px;
        margin-bottom: 30px;
    }
`;

function CardContainer({ children, text }) {
    return (
        <Container>
            <h2>{text}</h2>
            {children}
        </Container>
    )
}

export default CardContainer