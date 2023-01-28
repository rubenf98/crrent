import React, { useEffect, useState } from 'react'
import styled, { withTheme } from "styled-components";
import { Button, maxWidthStyle } from '../../styles';
import { Checkbox } from 'antd';
import TitleContainer from './Common/TitleContainer';
import { dimensions, maxWidth } from '../../helper';
import { fetchExtras } from "../../../redux/extra/actions";
import { fetchInsurances } from "../../../redux/insurance/actions";
import { connect } from "react-redux";

const Container = styled.section`
    box-sizing: border-box;
    ${maxWidthStyle}
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    margin: 120px auto;
    max-width: calc(${maxWidth} - 200px);

    @media (max-width: ${dimensions.md}) {
        padding: 0px;
    }
`;

const Insurance = styled.div`
    width: 60%;

    @media (max-width: ${dimensions.xl}) {
        width: 60%;
    }

    @media (max-width: ${dimensions.lg}) {
        width: 100%;
        margin-bottom: 100px;
    }
`;

const Extra = styled.div`
    width: 40%;

    @media (max-width: ${dimensions.xl}) {
        width: 40%;
    }

    @media (max-width: ${dimensions.lg}) {
        width: 100%;
    }

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

            @media (max-width: ${dimensions.md}) {
                font-size: 18px;
            }

            .opacity {
                opacity: .5;
                font-weight: 400;

            }

            .hide {
                @media (max-width: ${dimensions.sm}) {
                    display: none;
                }
            }
        }
    }

`;

const PackageContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 35px;

    @media (max-width: ${dimensions.lg}) {
        justify-content: space-around;
    }

    .border {
        border: 2px solid;
        border-color: ${props => props.border}; 
    }
`;


const Package = styled.div`
    padding: 20px;
    box-sizing: border-box;
    opacity: ${props => props.active ? 1 : .5};
    border: 1px solid;
    border-color: ${props => props.active ? props.border : "transparent"};
    box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.15);
    width: 40%;
    cursor: pointer;

    @media (max-width: ${dimensions.lg}) {
        width: 45%;
    }

    @media (max-width: ${dimensions.md}) {
        width: 100%;
    }

    h3 {
        font-size: 20px;
        font-weight: 700;
        text-align: center;
    }

    ul {
        margin: 40px 0px;
    } 

    li {
        font-size: 14px;
    }

    p {
        font-size: 14px;
        text-align: center;
        margin: auto;
        margin-top: 10px;
        
    }

    .discount {
        text-decoration: line-through;
    }
`;



function Addons({ fetchInsurances, insurances, text, theme, fetchExtras, data, extras, setExtras, extraPrice,
    setExtraPrice, days, language, activeInsurance, setActiveInsurance }) {

    useEffect(() => {
        fetchExtras();
        fetchInsurances();
    }, [])

    useEffect(() => {
        if (insurances.length) {
            var price = insurances.filter((insurance) => {
                return insurance.id == 2;
            })

            setActiveInsurance(price[0]);
        }
    }, [insurances])

    function handleClick(value, extra) {
        const index = extras.indexOf(extra.id);

        var extrasCopy = [...extras];
        var aPrice = extra.type == "uni" ? extra.price : (extra.price * days);

        if (index >= 0 && !value) {
            extrasCopy.splice(index, 1);
            setExtraPrice(extraPrice - aPrice);
        } else if (index < 0 && value) {
            extrasCopy.push(extra.id);
            setExtraPrice(extraPrice + aPrice);
        }

        setExtras(extrasCopy);
    }


    return (
        <Container underline={theme.secundary}>

            <Insurance>
                <TitleContainer title={text.titles[1]} />


                <PackageContainer>
                    {insurances.map((insurance) => (
                        <Package key={insurance.id} border={theme.primary} active={activeInsurance.id == insurance.id} onClick={() => setActiveInsurance(insurance)}>
                            <h3>{insurance.name[language]}</h3>
                            <ul>
                                <li>{insurance.description[language]}</li>
                                <li>{insurance.description_one[language]}</li>
                            </ul>
                            <Button disabled style={{ margin: "auto" }}>
                                {text.insurance.button}
                            </Button>
                            <p>
                                {insurance.price}€ + ({parseFloat(insurance.price) ? "0.00" : "1500"}€) Security Deposit
                            </p>
                        </Package>
                    ))}
                </PackageContainer>
            </Insurance>
            <Extra>
                <TitleContainer title={text.titles[2]} />

                {data.map((extra) => (
                    <div key={extra.id}>
                        {parseInt(extra.visible) ?
                            <div className='checkbox-container'>
                                <Checkbox checked={extras.includes(extra.id)} onChange={(e) => handleClick(e.target.checked, extra)}>
                                    {text.extras[extra.name]}
                                </Checkbox>
                                <p>{extra.price}€ <span className='opacity'>/ <span className='hide'>{text.prices.per}</span> {text.prices[extra.type]}</span></p>
                            </div>
                            : <></>}
                    </div>

                ))}
            </Extra>

        </Container>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchExtras: () => dispatch(fetchExtras()),
        fetchInsurances: () => dispatch(fetchInsurances()),
    };
};

const mapStateToProps = (state) => {
    return {
        data: state.extra.data,
        loading: state.extra.loading,
        language: state.application.language,
        insurances: state.insurance.data,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Addons));