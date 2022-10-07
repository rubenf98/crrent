import React from 'react'
import styled, { withTheme } from "styled-components";
import { dimensions } from '../helper';

const Container = styled.section`
    width: 100vw;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
`;

const Content = styled.section`
    width: 100%;
    height: 120px;
    position: fixed;
    padding: 0px 60px;
    box-sizing: border-box;
    top: 0;
    left: 0;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    flex-wrap: wrap;

    @media (max-width: ${dimensions.md}) {
        height: 100px;
        padding: 0px 35px;
    }
`;

const Phone = styled.div`
    background-color: ${props => props.background};
    padding: 14px 33px;
    box-sizing: border-box;
    color: white;
    font-size: 20px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;

    p {
        margin: 0px;
    }

    img {
        margin-right: 15px;
        width: 20px;
        height: 20px;
    }

    @media (max-width: ${dimensions.md}) {
        font-size: 16px;
        padding: 8px 16px;

        img {
            margin-right: 10px;
            width: 15px;
            height: 15px;
        }
    }
`;

const Logo = styled.img`
    width: 140px;
    height: auto;

    @media (max-width: ${dimensions.md}) {
        width: 120px;
    }
`;

function Navbar({ theme }) {
    return (
        <Container>
            <Content>
                <Logo src="/image/logo.png" alt="logo" />
                <Phone background={theme.primary}>
                    <img src="/icon/phone.svg" alt="phone" />
                    <p>291 597 264</p>

                </Phone>
            </Content>

        </Container>
    )
}

export default withTheme(Navbar)