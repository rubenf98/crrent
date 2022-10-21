import React from 'react'
import styled, { withTheme } from "styled-components";
import { maxWidthStyle } from '../../styles';

const Container = styled.section`
    margin: 200px 0px;
`;

const TitleContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;

    img {
        width: 55%;
        z-index: -2;
    }

    .info-container {
        position: relative;
        padding: 50px 0px;
        box-sizing: border-box;

        h2, h3 {
            font-size: 96px;
            font-weight: 700;
            text-transform: uppercase;
            margin: 0px;
        }

        h2 {
            line-height: 90px;
        }

        h3 {
            font-size: 40px;
            padding-left: 5px;
            box-sizing: border-box;
        }

        .accent {
            position: absolute;
            height: 100%;
            width: 100px;
            left: -50px;
            bottom: 0;
            z-index: -1;
            background-color: ${props => props.background};
        }
    }

    
`;

const AboutContainer = styled.div`
    ${maxWidthStyle}
    display: flex;
    justify-content: center;
    align-items: flex-end;
    margin-top: -100px;

    img {
        width: 50%;
        z-index: -3;
    }

    .info-container {
        width: 50%;
        padding: 30px 100px 0px 30px;
        box-sizing: border-box;

        p {
            font-size: 20px;
            font-weight: 400;
        }

        h3 {
            font-size: 40px;
            font-weight: 700;
            text-transform: uppercase;
        }
    }

    
`;

function About({ theme }) {
    return (
        <Container id="about">
            <TitleContainer background={theme.secundary}>
                <img src="/image/homepage/about1.jpg" alt="" />
                <div className='info-container'>
                    <div className='accent' />
                    <h2>CR Rent</h2>
                    <h3>sobre nós</h3>
                </div>
            </TitleContainer>
            <AboutContainer>
                <div className='info-container'>
                    <h3>Rent na ilha da Madeira</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. </p>
                </div>
                <img  loading='lazy' src="/image/homepage/about2.jpg" alt="" />
            </AboutContainer>
        </Container>
    )
}

export default withTheme(About)