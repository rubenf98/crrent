import React, { useEffect, useState } from 'react'
import styled, { withTheme } from "styled-components";
import { dimensions } from '../helper';
import { useNavigate, useLocation } from 'react-router-dom'

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
    padding: 12px 33px;
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

const LinksContainer = styled.div`
    display: flex;
    align-items: center;
    width: 50%;

    img {
        width: 140px;
        height: auto;
        margin-right: 70px;
        cursor: pointer;

        @media (max-width: ${dimensions.md}) {
            width: 120px;
        }
    }

    span {
        padding: 0px 35px;
        box-sizing: border-box;
        text-transform: uppercase;
        color: black;
        cursor: pointer;
        transition: opacity .3s ease;
        opacity: ${props => props.opacity};
        pointer-events: ${props => props.opacity ? "auto" : "none"};
        z-index: -5;
    }
    
`;

function Navbar({ theme }) {
    const [visibleLinks, setVisibleLinks] = useState(true)
    const [opacityLinks, setOpacityLinks] = useState(1)
    let navigate = useNavigate();
    const { pathname } = useLocation();

    useEffect(() => {
        if (pathname == "/" && !visibleLinks) {
            setVisibleLinks(true)
        }
        else if (pathname != "/" && visibleLinks) {
            setVisibleLinks(false)
        }
    }, [pathname])

    useEffect(() => {

        const setFromEvent = (e) => {
            if (window.scrollY == 0) {
                setOpacityLinks(1);
            } else if (window.scrollY) {
                setOpacityLinks(0);
            }
        };

        window.addEventListener("scroll", setFromEvent);

        return () => {
            window.removeEventListener("scroll", setFromEvent);
        };

    }, []);



    const handleClick = (filter) => {
        if (pathname == "/") {
            var element = document.getElementById(filter);
            window.scrollTo({ top: element.offsetTop, behavior: 'smooth' });
        } else return navigate("/#" + filter);
    }

    return (
        <Container>
            <Content>
                <LinksContainer opacity={opacityLinks}>
                    <img onClick={() => handleClick("/#")} src="/image/logo.png" alt="logo" />
                    {visibleLinks &&
                        <>
                            <span onClick={() => handleClick('header')}>home</span>
                            <span onClick={() => handleClick('garage')}>garagem</span>
                            <span onClick={() => handleClick('about')}>sobre nós</span>
                            <span onClick={() => handleClick('contact')}>contactos</span>
                        </>
                    }

                </LinksContainer>

                <Phone background={theme.primary}>
                    <img src="/icon/phone.svg" alt="phone" />
                    <p>+351 934 953 682</p>
                </Phone>
            </Content>
        </Container>
    )
}

export default withTheme(Navbar)