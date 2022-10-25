import { Drawer } from 'antd'
import styled, { withTheme } from "styled-components";
import React from 'react'
import { connect } from "react-redux";
import { CloseIcon, InstagramIcon, MailIcon, WhatsappIcon } from '../../icons';
import { handleMenu } from "../../redux/application/actions";

const Container = styled(Drawer)`

    .ant-drawer-content {
        background-color: ${props => props.background};

        box-sizing: border-box;
        
    }

    .ant-drawer-body {
        display: flex;
        flex-direction: column;
    }
`;

const LogoContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    img {
        width: 90px;
    }

    svg {
        cursor: pointer;
    }

    .ant-drawer-content {
        background-color: ${props => props.background};
    }
`;

const LinksContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    
    p {
        color: white;
        font-size: 32px;
        font-weight: 700;
        line-height: 30px;
        text-align: center;
        margin: 20px 0px;
        text-transform: uppercase;
        cursor: pointer;
    }
`;

const SocialContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 40px;

    path {
        fill: #fff !important;
    }

    svg {
        width: 25px;
        height: 25px;
        cursor: pointer;
    }

`;

const Phone = styled.div`
    color: ${props => props.color};
    padding: 10px 20px;
    margin: 30px auto;
    box-sizing: border-box;
    background-color: white;
    font-size: 20px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;

    p {
        margin: 0px;
        font-weight: 700;
        font-size: 20px;
    }

    img {
        margin-right: 15px;
        width: 20px;
        height: 20px;
    }
`;

function NavbarMenu({ theme, handleMenu, menuVisible }) {

    const handleClick = (filter) => {
        if (pathname == "/") {
            var element = document.getElementById(filter);
            window.scrollTo({ top: element.offsetTop, behavior: 'smooth' });
        } else return navigate("/#" + filter);

        handleMenu(false)
    }


    return (
        <Container
            background={theme.primary}
            title=""
            closable={false}
            height="100%"
            open={menuVisible}
            placement="top"
        >
            <LogoContainer>
                <img src="/image/logo_navbar.png" alt="logo" />

                <div onClick={() => handleMenu(false)} >
                    <CloseIcon />
                </div>

            </LogoContainer>

            <LinksContainer>
                <p onClick={() => handleClick('header')}>home</p>
                <p onClick={() => handleClick('garage')}>garagem</p>
                <p onClick={() => handleClick('about')}>sobre nós</p>
                <p onClick={() => handleClick('contact')}>contactos</p>
            </LinksContainer>

            <SocialContainer>
                <WhatsappIcon />
                <MailIcon />
                <InstagramIcon />
            </SocialContainer>


            <Phone color={theme.primary}>
                <img src="/icon/phone_primary.svg" alt="phone" />
                <p>+351 934 953 682</p>
            </Phone>

        </Container>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleMenu: (state) => dispatch(handleMenu(state)),
    };
};

const mapStateToProps = (state) => {
    return {
        menuVisible: state.application.menuVisible,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(NavbarMenu));