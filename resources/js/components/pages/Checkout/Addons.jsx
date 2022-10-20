import React from 'react'
import styled, { withTheme } from "styled-components";
import { DoorsIcon, GasIcon, PeopleIcon, ShiftIcon } from '../../../icons';
import { Button, maxWidthStyle } from '../../styles';
import { Checkbox, DatePicker } from 'antd';
import TitleContainer from './Common/TitleContainer';

const Container = styled.section`
    box-sizing: border-box;
    ${maxWidthStyle}
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin: 120px auto;
`;

const Insurance = styled.div`
    width: 50%;
`;

const Extra = styled.div`
    width: 50%;

    h2 {
        font-size: 40px;
        font-weight: 700;
        margin-bottom: 0px;
    }

    .checkbox-container {
        display: flex;
        justify-content: space-between;
        align-items: middle;

        .ant-checkbox-wrapper {
            font-size: 16px;

            .ant-checkbox {
                margin-right: 10px;
            }

        }

        
        p {
            font-size: 20px;
            font-weight: 700;

            span {
                opacity: .5;
                font-weight: 400;

            }
        }
    }

`;

const PackageContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 35px;

    .border {
        border: 2px solid;
        border-color: ${props => props.border}; 
    }
`;


const Package = styled.div`
    padding: 30px 20px;
    box-sizing: border-box;
    opacity: ${props => props.active ? 1 : .5};
    border: ${props => props.active ? "2px solid" : "0px"};
    border-color: ${props => props.border};
    box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.15);
    width: 40%;

    h3 {
        font-size: 20px;
        font-weight: 700;
        text-align: center;
    }

    ul {
        margin: 40px 0px;
    } 

    li {
        font-size: 16px;
    }

    p {
        font-size: 20px;
        text-align: center;
        margin: auto;
        margin-top: 5px;
        text-decoration: line-through;
    }
`;



function Addons({ theme }) {

    return (
        <Container underline={theme.secundary}>

            <Insurance>
                <TitleContainer title="Seguro" />


                <PackageContainer>
                    <Package>
                        <h3>Basico</h3>
                        <ul>
                            <li>Collision Damage Protection</li>
                            <li>Thelf Protection</li>
                            <li>Windscreen, Glass</li>
                        </ul>
                        <Button disabled style={{ margin: "auto" }}>
                            Selecionar
                        </Button>
                        <p>
                            TOTAL 0.00€
                        </p>
                    </Package>

                    <Package border={theme.primary} active>
                        <h3>Premium</h3>
                        <ul>
                            <li>Collision Damage Protection</li>
                            <li>Thelf Protection</li>
                            <li>Windscreen, Glass</li>
                        </ul>
                        <Button style={{ margin: "auto" }} background={theme.primary}>
                            Selecionar
                        </Button>
                        <p>
                            TOTAL 21.00€
                        </p>
                    </Package>
                </PackageContainer>
            </Insurance>
            <Extra>
                <TitleContainer title="Extras" />

                <div className='checkbox-container'><Checkbox>Condutor Adicional</Checkbox> <p>30€ <span>/ por Dia</span></p></div>
                <div className='checkbox-container'><Checkbox>GPS</Checkbox> <p>30€ <span>/ por Dia</span></p></div>
                <div className='checkbox-container'><Checkbox>Cadeira de Bebé</Checkbox> <p>30€ <span>/ por Dia</span></p></div>
            </Extra>

        </Container>
    )
}

export default withTheme(Addons)