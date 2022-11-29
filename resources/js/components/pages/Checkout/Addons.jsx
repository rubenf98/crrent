import React, { useEffect } from 'react'
import styled, { withTheme } from "styled-components";
import { Button, maxWidthStyle } from '../../styles';
import { Checkbox } from 'antd';
import TitleContainer from './Common/TitleContainer';
import { dimensions } from '../../helper';
import { fetchExtras } from "../../../redux/extra/actions";
import { connect } from "react-redux";

const Container = styled.section`
    box-sizing: border-box;
    ${maxWidthStyle}
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    margin: 120px auto;

    @media (max-width: ${dimensions.md}) {
        padding: 0px;
    }
`;

const Insurance = styled.div`
    width: 50%;

    @media (max-width: ${dimensions.xl}) {
        width: 60%;
    }

    @media (max-width: ${dimensions.lg}) {
        width: 100%;
        margin-bottom: 100px;
    }
`;

const Extra = styled.div`
    width: 50%;

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
    align-items: center;
    flex-wrap: wrap;
    gap: 35px;

    @media (max-width: ${dimensions.lg}) {
        justify-content: space-between;
    }

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
        font-size: 16px;
    }

    p {
        font-size: 20px;
        text-align: center;
        margin: auto;
        margin-top: 5px;
        
    }

    .discount {
        text-decoration: line-through;
    }
`;



function Addons({ text, theme, fetchExtras, data, extras, setExtras, extraPrice,
    setExtraPrice, days }) {

    useEffect(() => {
        fetchExtras();
    }, [])

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
                    <Package>
                        <h3>{text.insurance.basic.title}</h3>
                        <ul>
                            <li>{text.insurance.basic.items[0]}</li>
                            <li>{text.insurance.basic.items[1]}</li>
                        </ul>
                        <Button disabled style={{ margin: "auto" }}>
                            {text.insurance.button}
                        </Button>
                        <p>
                            TOTAL 12.00€
                        </p>
                    </Package>

                    <Package border={theme.primary} active>
                        <h3>{text.insurance.premium.title}</h3>
                        <ul>
                            <li>{text.insurance.premium.items[0]}</li>
                            <li>{text.insurance.premium.items[1]}</li>
                            <li>{text.insurance.premium.items[2]}</li>
                        </ul>
                        <Button disabled type='default' style={{ margin: "auto" }} background={theme.primary}>
                            {text.insurance.button}
                        </Button>
                        <p className='discount'>
                            TOTAL 0.00€
                        </p>
                    </Package>
                </PackageContainer>
            </Insurance>
            <Extra>
                <TitleContainer title={text.titles[2]} />

                {data.map((extra) => (
                    <div key={extra.id}>
                        {extra.visible ?
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
    };
};

const mapStateToProps = (state) => {
    return {
        data: state.extra.data,
        loading: state.extra.loading,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Addons));