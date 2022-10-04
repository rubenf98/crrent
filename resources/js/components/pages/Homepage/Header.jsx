import React from 'react'
import styled, { withTheme } from "styled-components";
import { dimensions, maxWidth } from '../../helper';

const Container = styled.section`
    width: 100%;
    max-width: ${maxWidth};
    min-height: 100vh;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    margin: auto;

    @media (max-width: ${maxWidth}) {
        box-sizing: border-box;
        padding: 0px 20px;
    }

`;

const TitleContainer = styled.div`
    margin: auto;
    display: block;
    width: 100%;
    box-sizing: border-box;
    margin: 10vh 0px 5vh 0px;

    h1 {
        font-size: 6.6vw;
        font-size: 38px;
        font-weight: 700;
        line-height: 94%;
    }

    h2 {
        font-size: 3vw;
        font-size: 22px;
        opacity: .7;
        font-weight: 700;
        line-height: 94%;
    }

    h1, h2 {
        color: ${props => props.color};
        color: #fff;
        text-align: center;
    }


    @media (max-width: ${dimensions.md}) {

        h1 {
            width: 100%;
            font-size: 42px;
        }

        h2 {
            font-size: 24px;
        }
    }
`;

const Image = styled.img`
    width: 70%;
    height: 100vh;
    position: absolute;
    right: 0;
    bottom: 0;
    object-fit: cover;
    z-index: -1;

    @media (max-width: ${dimensions.md}) {
        height: 60vh;
    }

`;

const Logo = styled.img`
    width: 300px;
    margin: auto;
    display: block;

    @media (max-width: ${dimensions.md}) {
        width: 200px;
    }
`;

const Contact = styled.div`
    width: 60%;
    margin: auto;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;

    @media (max-width: ${dimensions.lg}) {
        width: 80%;
    }

    @media (max-width: ${dimensions.md}) {
        width: 100%;
    }
`;


const ContactItem = styled.div`
    color: white;
    width: 40%;
    padding: 14px 33px;
    box-sizing: border-box;
    border:1px solid white;
    font-size: 20px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;

    p {
        margin: 0px;
    }

    a {
        cursor: pointer;
        color: white;
    }

    img {
        margin-right: 15px;
        width: 20px;
    }

    @media (max-width: ${dimensions.md}) {
        font-size: 16px;
        padding: 10px 16px;
        width: 100%;
        margin: 10px 0px;

        img {
            margin-right: 10px;
            width: 15px;
        }
    }
`;

const Content = styled.div`
    width: 100%;
`;

function Header({ theme }) {
    return (
        <Container>
            <Content>
                <Logo src="/image/logo_branco.png" alt="logo" />

                <TitleContainer color={theme.primary}>
                    <h2>brevemente</h2>
                    <h1>Rent o seu carro com razão</h1>
                </TitleContainer>

                <Contact>
                    <ContactItem>
                        <img src="/icon/phone.svg" alt="phone" />
                        <p>+351 934 953 682</p>
                    </ContactItem>
                    <ContactItem>
                        <img src="/icon/mail.svg" alt="mail" />
                        <p><a href="mailto:info@cr-rent.com">info@cr-rent.com</a></p>
                    </ContactItem>
                </Contact>
            </Content>
            {/* <Image src="/image/homepage/header_1920.jpg" /> */}
        </Container>
    )
}

export default withTheme(Header)