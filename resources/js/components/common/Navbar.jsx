import React, { useEffect, useState } from 'react'
import styled, { withTheme } from "styled-components";
import { dimensions, maxWidth } from '../helper';
import { useNavigate, useLocation } from 'react-router-dom'
import { MenuIcon } from '../../icons';
import { connect } from "react-redux";
import { handleMenu } from "../../redux/application/actions";
import { setLanguage } from '../../redux/application/actions';
import { Tooltip } from 'antd';

const Container = styled.section`
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
`;

const Content = styled.section`
    width: 100%;
    height: 120px;
    padding: 0px 60px;
    box-sizing: border-box;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    flex-wrap: wrap;

    @media (max-width: ${dimensions.md}) {
        max-height: 60px;
        padding: 0px 20px;
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
        z-index: 2;

        @media (max-width: ${dimensions.md}) {
            width: 90px;
            margin-right: 0px;
        }
    }

    span {
        padding: 0px 20px;
        box-sizing: border-box;
        text-transform: uppercase;
        color: black;
        cursor: pointer;
        transition: opacity .3s ease;
        opacity: ${props => props.opacity};
        pointer-events: ${props => props.opacity ? "auto" : "none"};
        z-index: ${props => props.opacity ? 10 : -5};

        @media (max-width: ${maxWidth}) {
            display: none;
        }
    }
    
`;
const ButtonContainer = styled.div`
    opacity: ${props => props.opacity};
    z-index: ${props => props.opacity ? 10 : -5};
    transition: all .3s ease;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 16px;
    
    color: white;

    @media (max-width: ${dimensions.md}) {
        display: none;
    }

    .language {
        transition: all .3s ease;
        background: ${props => props.background};
        opacity: .7;
        box-sizing: border-box;
        padding: 12px 16px;
        cursor: pointer;
        pointer-events: ${props => props.opacity ? "auto" : "none"};
        text-transform: uppercase;
        font-weight: bold;
    }

    .phone {
        background-color: ${props => props.background};
        padding: 12px 30px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: ${props => props.opacity ? "auto" : "none"};

        p {
            margin: 0px;
            font-weight: bold;
        }

        .phone-icon {
            margin-right: 10px;
            width: 15px;
            height: 15px;
        }

        .info {
            margin-left: 25px;
            cursor: pointer;
            width: 15px;
            height: 15px;
        }
        
    }
    @media (max-width: ${dimensions.lg}) {
        font-size: 16px;

        img {
            margin-right: 10px;
            width: 15px;
            height: 15px;
        }
    }
 
`;

const MobileMenu = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;

    svg {
        cursor: pointer;
        width: 30px;
        margin: auto;
        display: block;
        height: auto;
    }

    .language {
        background: ${props => props.background};
        padding: 8px 12px;
        box-sizing: border-box;
        color: white;
        font-size: 16px;
        font-weight: 700;
        opacity: .5;
        cursor: pointer;
        text-transform: uppercase;
    }

    @media (min-width: ${dimensions.md}) {
        display: none;
    }    
`;

function Navbar({ theme, handleMenu, setLanguage,
    language }) {
    const [visibleLinks, setVisibleLinks] = useState(true)
    const [opacityLinks, setOpacityLinks] = useState(1)
    let navigate = useNavigate();
    const { pathname } = useLocation();
    const { text } = require('../../../assets/' + localStorage.language + "/navbar");

    useEffect(() => {
        localStorage.setItem("language", language);
    }, [language])

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

    const handleLanguage = () => {
        if (localStorage.language == "pt") {
            localStorage.setItem("language", "en");
            setLanguage("en");
        } else {
            localStorage.setItem("language", "pt");
            setLanguage("pt");
        }
    }

    return (
        <Container>
            <Content>
                <LinksContainer opacity={opacityLinks}>
                    <img onClick={() => handleClick("/")} src="/image/logo.png" alt="logo" />
                    {visibleLinks &&
                        <>
                            <span onClick={() => handleClick('header')}>{text.items[0]}</span>
                            <span onClick={() => handleClick('garage')}>{text.items[1]}</span>
                            <span onClick={() => handleClick('about')}>{text.items[2]}</span>
                            <span onClick={() => handleClick('contact')}>{text.items[3]}</span>
                        </>
                    }

                </LinksContainer>
                <MobileMenu background={theme.primary}>
                    <div className='language'>
                        {language}
                    </div>
                    <div onClick={() => handleMenu(true)}>
                        <MenuIcon />
                    </div>

                </MobileMenu>
                <ButtonContainer background={theme.primary} opacity={opacityLinks}>
                    <div className='language' onClick={handleLanguage}>
                        {language}
                    </div>
                    <div className='phone'>
                        <img className='phone-icon' src="/icon/phone.svg" alt="phone" />
                        <p>+351 934 953 682</p>
                        <Tooltip title={text.disclaimer}>
                            <img className='info' src="/icon/info.svg" alt="info" />
                        </Tooltip>
                    </div>
                </ButtonContainer>
            </Content>
        </Container>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleMenu: (state) => dispatch(handleMenu(state)),
        setLanguage: (state) => dispatch(setLanguage(state)),
    };
};
const mapStateToProps = (state) => {
    return {
        language: state.application.language,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Navbar));