import React from 'react'
import styled from "styled-components";
import BlockLevel from '../BlockLevel/BlockLevel';
import BlockCar from '../BlockCar/BlockCar';


const Container = styled.div`
    width: 100%;
`;


function Block() {
    return (
        <Container>
            <BlockLevel />
            <BlockCar />
        </Container>
    )
}


export default Block;