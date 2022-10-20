import React from 'react'
import styled, { withTheme } from "styled-components";

const Container = styled.div`
    .underline {
        width: 100px;
        height: 10px;
        background-color: ${props => props.underline};
        margin-bottom: 70px;
    }

    h2 {
    font-size: 40px;
    font-weight: 700;
    margin-bottom: 0px;
}
`;


function TitleContainer({ theme, title }) {
    return (
        <Container underline={theme.secundary}>
            <h2>{title}</h2>
            <div className='underline' />
        </Container>
    )
}

export default withTheme(TitleContainer)