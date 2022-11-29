import React from 'react'
import { connect } from 'react-redux';
import styled, { withTheme, keyframes, css } from "styled-components";
import { dimensions } from '../../helper';

const Container = styled.section`
    padding: 0px 0px;
    box-sizing: border-box;
    padding: 180px 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 50px auto;

    img {
        width: 50%;
        margin: auto;
        display: block;
        margin-bottom: 50px;
        max-width: 350px;
    }

    h2 {
        text-align: center;
        margin: auto;
        font-size: 30px; /* Fallback value */
        font-size: clamp(20px, 3vw, 38px);
    }

    p {
        text-align: center;
        opacity: .7;
        width: 60%;
        margin: auto;
        font-size: 18px;
    }

    @media (max-width: ${dimensions.md}) {
        padding: 150px 0px;
        img {
            width: 80%;
        }

        p {
            width: 90%;
        }
    }
`;

function Success({ language }) {
    const { text } = require('../../../../assets/' + language + "/reservation");

    return (
        <Container>
            <div>
                <img src="/image/other/email.svg" alt="email" />
                <h2>{text.success.title}</h2>
                <p>{text.success.text}</p>
            </div>
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {

        language: state.application.language,
    };
};

export default connect(mapStateToProps, null)(Success);