import React from 'react'
import Price from '../Price/Price'
import Promotion from '../Promotion/Promotion'
import styled from "styled-components";

const Container = styled.section`
    margin-bottom: 50px;
    width: 100%;
`;

function Value() {
    return (
        <Container>
            <Promotion />
            <Price />
        </Container>
    )
}

export default Value