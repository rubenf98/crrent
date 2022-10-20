import { DatePicker } from 'antd';
import React from 'react'
import styled, { withTheme } from "styled-components";
import { dimensions, maxWidth } from '../../helper';
import moment from 'moment';
import { InstagramIcon, MailIcon, WhatsappIcon } from '../../../icons';

const RangePickerContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 0px;
    position: relative;
`;


const RangePicker = styled(DatePicker.RangePicker)`
    width: 50%;
    margin: 0px;
    padding: 25px;
    box-sizing: border-box;
    -webkit-box-shadow: -8px 0px 30px 0px #0000002f; 
    box-shadow: -8px 0px 30px 0px #0000002f;

    .ant-picker-input {
        background-image: url("/icon/calendar.svg");
        background-repeat: no-repeat;
        background-size: 23px 25px;
        text-indent: 20px;
        padding-left: 50px;
        box-sizing: border-box;
    }
    .ant-picker-input > input::placeholder {
        color: black;
        opacity: .8;
        font-weight: 400;
        text-transform: uppercase;
        font-size: 20px;
    }
`;

const Search = styled.button`
    padding: 25px;
    box-sizing: border-box;
    background-color: ${props => props.background};
    color: white;
    font-weight: 700;
    font-size: 20px;
    border: 0px;
    cursor: pointer;
    text-transform: uppercase;
    -webkit-box-shadow: 8px 0px 30px 0px #0000002f; 
    box-shadow: 8px 0px 30px 0px #0000002f;
`;

const Container = styled.section`
    width: 100%;
    min-height: 100vh;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    margin: auto;
    padding-top: 120px;
    
    @media (max-width: ${maxWidth}) {
        box-sizing: border-box;
        padding: 0px 20px;
    }

`;

const TitleContainer = styled.div`
    display: block;
    width: 100%;
    box-sizing: border-box;
    position: relative;
    max-width: ${maxWidth};
    margin: 120px auto;

    h1 {
        font-size: 128px;
        font-weight: 700;
        line-height: 94%;
        color: ${props => props.color};
        text-align: left;
        text-transform: uppercase;
    }


    @media (max-width: ${dimensions.md}) {

        h1 {
            width: 100%;
            font-size: 42px;
        }
    }
`;

const Image = styled.img`
    width: 50%;
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

const Content = styled.div`
    width: 100%;
`;

const LinksContainer = styled.div`
    bottom: 0px;
    left: 60px;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 100px;
    opacity: .7;
`;

const Accent = styled.div`
    width: 100px;
    height: 270px;
    top: -50px;
    left: -50px;
    position: absolute;
    z-index: -1;
    background-color: ${props => props.background};
`;

function Header({ theme }) {
    return (
        <Container id="header">
            <Content>
                <TitleContainer color={theme.primary}>
                    <Accent background={theme.secundary} />
                    <h1>Rent o <br /> seu carro <br />com razão</h1>

                </TitleContainer>
                <RangePickerContainer>
                    <LinksContainer>
                        <WhatsappIcon />
                        <MailIcon />
                        <InstagramIcon />
                    </LinksContainer>
                    <RangePicker showTime={{
                        format: "HH:mm"
                    }}
                        format="YYYY-MM-DD HH:mm"
                        placeholder={["data levantamento", "data devolução"]}
                        suffixIcon={(<></>)}
                    />
                    <Search background={theme.primary} type='submit'>pesquisar</Search>
                </RangePickerContainer>
            </Content>

            <Image src="/image/homepage/header_1920.jpg" />
        </Container>
    )
}

export default withTheme(Header)