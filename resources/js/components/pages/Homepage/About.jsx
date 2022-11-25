import React from 'react'
import styled, { withTheme } from "styled-components";
import { dimensions } from '../../helper';
import { maxWidthStyle } from '../../styles';

const Container = styled.section`
    margin: 200px 0px;

    @media (max-width: ${dimensions.md}) {
        margin: 100px 0px;
    }
`;

const TitleContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;

    img {
        width: 55%;
        min-height: 400px;
        object-fit: cover;
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

            @media (max-width: ${dimensions.lg}) {
                font-size: 60px;
            }

            @media (max-width: ${dimensions.md}) {
                font-size: 40px;
            }
            
        }

        h2 {
            line-height: 90%;
        }

        h3 {
            font-size: 40px;
            padding-left: 5px;
            box-sizing: border-box;

            @media (max-width: ${dimensions.lg}) {
                font-size: 36px;
            }

            @media (max-width: ${dimensions.md}) {
                font-size: 24px;
            }
        }

        .accent {
            position: absolute;
            height: 100%;
            width: 100px;
            left: -50px;
            bottom: 0;
            z-index: -1;
            background-color: ${props => props.background};

            @media (max-width: ${dimensions.md}) {
                width: 60px;
                left: -20px;
            }
        }
    }

    
`;

const AboutContainer = styled.div`
    ${maxWidthStyle}
    display: flex;
    justify-content: center;
    align-items: flex-end;
    flex-wrap: wrap;
    margin-top: -100px;

    img {
        width: 50%;
        height: 100%;
        object-fit: cover;
        z-index: -3;
    }

    .info-container {
        width: 50%;
        padding: 100px 100px 0px 30px;
        box-sizing: border-box;

        p {
            font-size: 20px;
            font-weight: 400;

            @media (max-width: ${dimensions.md}) {
                font-size: 16px;
                text-align: justify;
            }
        }

        h3 {
            font-size: 40px;
            font-weight: 700;
            text-transform: uppercase;

            @media (max-width: ${dimensions.md}) {
                font-size: 24px;
            }
        }
    }

    @media (max-width: ${dimensions.lg}) {
        justify-content: space-between;
        padding: 0px;

        img {
            width: 80%;
            order: 1;
            margin-left: auto;
        }

        .info-container {
            width: 100%;
            order: 2;
            padding: 0px 20px;
            margin: 50px auto 0px auto;
        }
    }
    
`;

function About({ theme, text }) {
    return (
        <Container id="about">
            <TitleContainer background={theme.secundary}>
                <img src="/image/homepage/about1.jpg" alt="" />
                <div className='info-container'>
                    <div className='accent' />
                    <h2>CR Rent</h2>
                    <h3>{text.title}</h3>
                </div>
            </TitleContainer>
            <AboutContainer>
                <div className='info-container'>
                    <h3>{text.subtitle}</h3>
                    <p>{text.paragraph}</p>
                </div>
                <img loading='lazy' src="/image/homepage/about2.jpg" alt="" />
            </AboutContainer>
        </Container>
    )
}

export default withTheme(About)