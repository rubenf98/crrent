import React from 'react'
import styled, { withTheme } from "styled-components";
import { Button, maxWidthStyle } from '../styles';


const Container = styled.section`
   ${maxWidthStyle}
`;
const Content = styled.div`
   display: flex;
`;

const InfoContainer = styled.div`
    width: 40%;

    h2 {
        font-size: 64px;
        text-transform: uppercase;
        font-weight: 700;
        color: ${props => props.color};
        white-space: nowrap;
    }
`;

const Map = styled.img`
   width: 60%;
   z-index: -1;
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
    width: 70%;
    margin-left: auto;
    font-size: 20px;

    .field {
        opacity: .5;
        width: 50%;
    }

    .value {
        width: 50%;
        font-weight: bold;
        white-space: nowrap;
    }
`;


function Footer({ theme }) {

    const ItemContainer = ({ field, value }) => (
        <Item>
            <p className='field'>{field}: </p> <p className='value'>{value}</p>
        </Item>
    )
    return (
        <Container id="contact">
            <Content>
                <InfoContainer color={theme.primary}>
                    <h2>Entre em contacto
                        <br />connosco</h2>

                    <ItemContainer field="Telemóvel" value="+351 934 953 682" />
                    <ItemContainer field="Endereço" value="Av. do Infante 19B · 936 716 627" />
                    <ItemContainer field="Email" value="info@cr-rent.com" />
                    <ItemContainer field="Horário de funcionamento" value={(<span>Todos os dias <br /> 07h - 22h</span>)} />
                    <ItemContainer field="" value={(<Button background={theme.primary}>
                        <a href="mailto:info@cr-rent.com" target="_blank" >
                            vamos falar
                        </a>
                    </Button>)} />

                </InfoContainer>

                <Map src="/image/footer_map.jpg" alt="map indicaitng the position of our facilities" />

            </Content>
            <Logo src="/image/logo_complete.png" alt="logo" />
            <Disclaimer>
                © Designed by <a href="https://domdesign.pt/" target="_blank">domdesign</a> and developed by <a href="https://ruben-freitas.pt/" target="_blank">Rúben Freitas</a>
            </Disclaimer>
        </Container>
    )
}

export default withTheme(Footer)