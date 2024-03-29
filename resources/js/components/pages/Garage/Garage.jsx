import React, { useState, useEffect } from 'react'
import { AirIcon, DoorsIcon, GasIcon, PeopleIcon, ShiftIcon } from '../../../icons';
import { dimensions, maxWidth } from '../../helper';
import styled, { withTheme } from "styled-components";
import { Button, maxWidthStyle } from '../../styles';
import { useSearchParams, useNavigate } from 'react-router-dom';
import DateFormItem from '../../common/DateFormItem';
import { connect } from "react-redux";
import { fetchCarCategorySelector, setCurrentCarCategory } from "../../../redux/carCategory/actions";
import moment from "moment";
import { fetchPromotions } from '../../../redux/promotion/actions';
import { fetchExtras } from '../../../redux/extra/actions';
import { getCarPrice, getDaysDifference, getPriceRounded, getPromotions } from '../../functions';

const Container = styled.section`
    width: 100%;
    position: relative;
    margin: auto;
    padding: 180px 0px;
    ${maxWidthStyle}
    
    @media (max-width: ${maxWidth}) {
        box-sizing: border-box;
        padding: 0px 20px;
    }

    @media (max-width: ${dimensions.md}) {
        margin: 100px 0px;
    }

`;

const Title = styled.h1`
    font-size: 64px;
    text-transform: uppercase;
    font-weight: 700;
    text-align: center;
    margin: 10px auto 60px auto;

    @media (max-width: ${dimensions.md}) {
        font-size: 40px;
    }
`;

const RangePickerContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    position: relative;
`;

const Search = styled.button`
    padding: 25px;
    margin-bottom: 24px;
    margin-left: 16px;
    box-sizing: border-box;
    background-color: ${props => props.background};
    color: white;
    font-weight: 700;
    font-size: 16px;
    border: 0px;
    cursor: pointer;
    text-transform: uppercase;
    -webkit-box-shadow: 8px 0px 30px 0px #0000002f; 
    box-shadow: 8px 0px 30px 0px #0000002f;

    @media (max-width: ${dimensions.md}) {
        font-size: 14px;
        padding: 15px;
        font-weight: 40;
    }
`;

const FilterContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    margin: 50px 0px;
    gap: 40px;
`;

const Filter = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;

    .rectangle{
        display: inline-block;
        margin-right: 15px;
        width: 20px;
        height: 20px;
        background-color: ${props => props.background};
    }
`;

const Car = styled.div`
    width: 100%;
    padding: 30px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: 100px auto;

    @media (max-width: ${dimensions.md}) {
        padding: 0px;
        margin: 100px 0px;
    }
    
    
    .image-container {
        width: 40%;
        position: relative;
        padding: 20px 30px 20px 0px;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;

        @media (max-width: ${dimensions.md}) {
            width: 100%;
            padding: 30px 0px 30px 0px;
        }

        img {
            width: 90%;
            height: auto;
        }

        .car-background {
            position: absolute;
            width: 40%;
            height: 100%;
            z-index: -1;
            background-color: ${props => props.background};
            transform: translate(-50%, 0%);
            bottom: 0;
            left: 50%;
            transition: width .3s ease-in-out;
        }
    }

    .info-container {
        width: 60%;
        padding: 0px 30px;
        box-sizing: border-box;

        @media (max-width: ${dimensions.md}) {
            width: 100%;
            padding: 0px;
        }

        h3 {
            font-weight: 700;
            font-size: 30px;
            margin: 0px 0px 0px 0px;

            @media (max-width: ${dimensions.md}) {
                margin: 0px;
                margin-top: 10px;
                font-size: 16px;
            }
        }

        h4 {
            margin: 0px 0px 30px 0px;
            font-size: 16px;
            opacity: .7;
            font-weight: 400;

        }

        .price { 
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 40px;

            .total {
                font-size: 20px;
                font-weight: 700;
                margin: 0px;
                text-transform: uppercase;
                color: ${props => props.primary};
            }

            .warning {
                opacity: .5;
                font-weight: 400;
                margin: 0px;
                font-weight: bold;
            }

            .value {
                color: ${props => props.primary};
                font-size: 50px;
                font-weight: 700;

                @media (max-width: ${dimensions.md}) {
                    font-size: 40px;
                }
            }
        } 
    }
`;

const IconContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 30px 0px 60px 0px;
    gap: 35px;

    .border {
        border: 2px solid;
        border-color: ${props => props.border}; 
    }
`;


const Icon = styled.div`
    width: 55px;
    height: 55px;

    div {
        padding: 10px;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    p {
        font-size: 14px;
        text-align: center;
        margin: auto;
        margin-top: 15px;
    }

    img {
        width: 100%;
        height: 100%;
    }
`;

const dateFormat = "YYYY-MM-DD HH:mm";
function Garage(props) {
    const [dates, setDates] = useState([undefined, undefined]);
    const [days, setDays] = useState(1)
    var navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { fetchExtras, theme, data, language, promotions } = props;
    const { text } = require('../../../../assets/' + language + "/garage");


    useEffect(() => {
        var from = searchParams.get("from");
        var to = searchParams.get("to");

        props.fetchCarCategorySelector({ from: from, to: to });

        from = moment(from);
        to = moment(to);

        var difference = getDaysDifference(from, to);

        setDays(difference);
        setDates([from, to]);


        props.fetchPromotions();

        fetchExtras();

    }, [])

    const handleSearch = () => {
        props.fetchCarCategorySelector({ from: dates[0].format(dateFormat), to: dates[1].format(dateFormat) });

        var difference = getDaysDifference(dates[0], dates[1]);

        setDays(difference);
        setDates([dates[0], dates[1]]);
    };

    function handleCarSelection(car) {
        props.setCurrentCarCategory(car);
        navigate("/checkout?from=" + moment(dates[0]).format(dateFormat) + "&to=" + moment(dates[1]).format(dateFormat));
    }

    const CarSection = ({ info }) => {
        var newFactors = getPromotions(promotions, dates[0], days, info.level.id);
        var pricing = getCarPrice(info.level.prices, days, newFactors);
        return (
            <Car primary={theme.primary} background={info.level.color}>
                <div className='image-container'>
                    <div className='car-background' />
                    <img src={info.image} alt={info.title} />
                </div>

                <div className='info-container'>
                    <h3>{info.title}</h3>
                    <h4>{info.description[language]}</h4>

                    <IconContainer border={theme.primary}>
                        {info.charateristics.map((charateristic) => (
                            <Icon>
                                <div className='border'>
                                    <img src={charateristic.icon} />
                                </div>
                                <p>{charateristic.pivot.value}</p>
                            </Icon>
                        ))}
                    </IconContainer>

                    <div className='price'>
                        <div>
                            <p className='total'>{text.from}</p>
                            <p className='warning'>{text.notice[0]} {days} {text.notice[1]}</p>
                        </div>
                        <div className='value'>{getPriceRounded(pricing)}€</div>
                    </div>

                    <Button onClick={() => handleCarSelection(info)} background={theme.primary}>
                        {text.continue}
                    </Button>
                </div>
            </Car>
        )
    }

    return (
        <Container>
            <Title>{text.title}</Title>
            <RangePickerContainer>
                <DateFormItem text={text.button.placeholder} dates={dates} setDates={setDates} />
                <Search onClick={handleSearch} background={theme.primary} type='submit'>{text.button.button}</Search>
            </RangePickerContainer>

            <FilterContainer borderColor={theme.primary}>
                <Filter background={theme.levels.A}><div className="rectangle" />{text.level} A</Filter>
                <Filter background={theme.levels.B}><div className="rectangle" />{text.level} B</Filter>
                <Filter background={theme.levels.C}><div className="rectangle" />{text.level} C</Filter>
                <Filter background={theme.levels.D}><div className="rectangle" />{text.level} D</Filter>

            </FilterContainer>

            {data.map((car) => (
                <CarSection key={car.id} info={car} />
            ))}
        </Container>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCarCategorySelector: (filters) => dispatch(fetchCarCategorySelector(filters)),
        setCurrentCarCategory: (car) => dispatch(setCurrentCarCategory(car)),
        fetchPromotions: (car) => dispatch(fetchPromotions(car)),
        fetchExtras: () => dispatch(fetchExtras()),
    };
};

const mapStateToProps = (state) => {
    return {
        data: state.carCategory.selector,
        loading: state.carCategory.loading,
        language: state.application.language,
        promotions: state.promotion.data
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Garage));