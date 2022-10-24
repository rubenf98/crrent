import React from 'react'
import styled, { withTheme } from "styled-components";
import { dimensions } from '../helper';
import { Button, maxWidthStyle } from '../styles';


const Container = styled.section`
   ${maxWidthStyle}
`;

const Content = styled.div`
    display: flex;
    flex-wrap: wrap;
    position: relative;
`;

const InfoContainer = styled.div`
    width: 40%;

    @media (max-width: ${dimensions.md}) {
        width: 100%;
    }

    h2 {
        font-size: 64px;
        text-transform: uppercase;
        font-weight: 700;
        color: ${props => props.color};
        white-space: nowrap;

        @media (max-width: ${dimensions.lg}) {
            font-size: 50px;
            white-space: normal;
            line-height: 60px;

            br {
                display: none;
                
            }
        }

        @media (max-width: ${dimensions.md}) {
            font-size: 40px;
            line-height: 50px;
        }
    }
`;

const Map = styled.img`
    width: 60%;
    z-index: -1;

    @media (max-width: ${dimensions.md}) {
        width: 100%;
    }
`;

const Logo = styled.img`
   width: 90%;
   max-width: 170px;
   margin: 30px auto;
   display: block;
`;


const Disclaimer = styled.p`
    text-align: center;
    margin: auto;
    opacity: .5;
    margin-bottom: 40px;

    a {
        color: black;
        font-weight: bold;
        

        &:hover {
            color: black;
        }
    }
`;


const Item = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 70%;
    margin-left: auto;
    font-size: 20px;

    p {
        width: 50%;
    }

    .field {
        opacity: .5;
       
    }

    .value {
        font-weight: bold;
        white-space: nowrap;
    }

    @media (max-width: ${dimensions.lg}) {
        width: 100%;
    }

    @media (max-width: ${dimensions.md}) {
        font-size: 20px;

        br {
            display: none;
        }

        p {
            margin: 0px;
            width: 100%;
        }

        .value {
            margin-bottom: 15px;
            white-space: normal;
        }
    }
`;

const DesktopButtonContainer = styled.div`
    display: inline-block;

    @media (max-width: ${dimensions.md}) {
        display: none;
    }
`;

const MobileButtonContainer = styled.div`
    position: absolute;
    bottom: 50px;
    left: 50%;
    transform: translate(-50%, 0%);
    

    @media (min-width: ${dimensions.md}) {
        display: none;
    }
`;

function Footer({ theme }) {

    const ItemContainer = ({ field, value }) => (
        <Item>
            <p className='field'>{field}</p> <p className='value'>{value}</p>
        </Item>
    )
    return (
        <Container id="contact">
            <Content>
                <InfoContainer color={theme.primary}>
                    <h2>Entre em contacto
                        <br /> connosco</h2>

                    <ItemContainer field="Telemóvel:" value="+351 934 953 682" />
                    <ItemContainer field="Endereço:" value="Av. do Infante 19B · 936 716 627" />
                    <ItemContainer field="Email:" value="info@cr-rent.com" />
                    <ItemContainer field="Horário de funcionamento:" value={(<span>Todos os dias <br /> 07h - 22h</span>)} />
                    <ItemContainer field="" value={(
                        <DesktopButtonContainer>
                            <Button background={theme.primary}>
                                <a href="mailto:info@cr-rent.com" target="_blank" >
                                    vamos falar
                                </a>
                            </Button>
                        </DesktopButtonContainer>
                    )} />

                </InfoContainer>

                <Map loading='lazy' src="/image/footer_map.jpg" alt="map indicaitng the position of our facilities" />
                <MobileButtonContainer>
                    <Button background={theme.primary}>
                        <a href="mailto:info@cr-rent.com" target="_blank" >
                            vamos falar
                        </a>
                    </Button>
                </MobileButtonContainer>
            </Content>
            <Logo loading='lazy' src="/image/logo_complete.png" alt="logo" />
            <Disclaimer>
                © Designed by <a href="https://domdesign.pt/" target="_blank">domdesign</a> and developed by <a href="https://ruben-freitas.pt/" target="_blank">Rúben Freitas</a>
            </Disclaimer>
        </Container>
    )
}

export default withTheme(Footer)