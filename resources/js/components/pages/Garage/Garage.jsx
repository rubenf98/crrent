import React, { useState, useEffect } from 'react'
import { DoorsIcon, GasIcon, PeopleIcon, ShiftIcon } from '../../../icons';
import { dimensions, maxWidth } from '../../helper';
import styled, { withTheme } from "styled-components";
import { Button, maxWidthStyle } from '../../styles';
import { useSearchParams, useNavigate } from 'react-router-dom';
import DateFormItem from '../../common/DateFormItem';
import { connect } from "react-redux";
import { fetchCarsSelector, setCurrent } from "../../../redux/car/actions";
import moment from "moment";
import { fetchPromotions } from '../../../redux/promotion/actions';
import { fetchExtras } from '../../../redux/extra/actions';
import { getCarPrice, getPriceRounded, getPromotions } from '../../functions';

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
    margin: 150px 0px;

    @media (max-width: ${dimensions.md}) {
        padding: 0px;
        margin: 100px 0px;
    }
    
    
    .image-container {
        width: 50%;
        position: relative;
        padding: 30px 0px;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;

        @media (max-width: ${dimensions.md}) {
            width: 100%;
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
        width: 50%;
        padding: 0px 50px;
        box-sizing: border-box;

        @media (max-width: ${dimensions.md}) {
            width: 100%;
            padding: 0px;
        }

        h3 {
            font-weight: 700;
            font-size: 40px;
            margin: 0px;

            @media (max-width: ${dimensions.md}) {
                margin: 0px;
                margin-top: 10px;
                font-size: 16px;

            }
        }

        h4 {
            font-weight: 400;
            font-size: 20px;
            opacity: .5;
            margin: 0px;

            @media (max-width: ${dimensions.md}) {
                font-size: 16px;
            }
        }

        .price { 
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 50px;

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
            }

            .value {
                color: ${props => props.primary};
                font-size: 60px;
                font-weight: 700;

                @media (max-width: ${dimensions.md}) {
                    font-size: 40px;
                }
            }
        } 

        .disclaimer, .phone {
            font-weight: 400;
            opacity: .5;
        }

        .disclaimer {
            margin-top: 15px;
        }

        .phone {
            margin: 50px 0px 0px 0px;
        }
    }
`;

const IconContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 30px 0px 60px 0px;

    .border {
        border: 2px solid;
        border-color: ${props => props.border}; 
    }
`;


const Icon = styled.div`
    width: 65px;
    height: 65px;
    
    

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
`;
const dateFormat = "YYYY-MM-DD HH:mm";
function Garage({ fetchExtras, theme, data, fetchCarsSelector, setCurrent, fetchPromotions, language, promotions }) {
    const [dates, setDates] = useState([undefined, undefined]);
    const [days, setDays] = useState(1)
    const [factors, setFactors] = useState([])
    var navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const { text } = require('../../../../assets/' + language + "/garage");

    useEffect(() => {
        var from = searchParams.get("from");
        var to = searchParams.get("to");

        fetchCarsSelector({ from: from, to: to, hasRegistration: 1 });

        from = moment(from);
        to = moment(to);

        var difference = to.diff(from, 'days');

        setDays(difference);
        setDates([from, to]);


        fetchPromotions().then((response) => {
            var newFactors = getPromotions(response.action.payload.data.data, from, difference);
            setFactors(newFactors);
        });

        fetchExtras();

    }, [])

    const handleSearch = () => {
        fetchCarsSelector({ from: dates[0].format(dateFormat), to: dates[1].format(dateFormat), hasRegistration: true });

        var difference = dates[1].diff(dates[0], 'days');

        setDays(difference);
        setDates([dates[0], dates[1]]);

        var newFactors = getPromotions(promotions, dates[0], difference);
        setFactors(newFactors);

    };

    function handleCarSelection(car) {
        setCurrent(car);
        navigate("/checkout?from=" + moment(dates[0]).format(dateFormat) + "&to=" + moment(dates[1]).format(dateFormat));
    }

    const CarSection = ({ info }) => {
        var pricing = getCarPrice(info.level.prices, days, factors);
        return (
            <Car primary={theme.primary} background={theme.levels[info.level.code]}>
                <div className='image-container'>
                    <div className='car-background' />
                    <img src={info.image} alt={info.title} />
                </div>

                <div className='info-container'>
                    <h3>{info.title}</h3>

                    <h4>{info.subtitle}</h4>
                    <IconContainer border={theme.primary}>
                        <Icon><div className='border'><ShiftIcon /></div> <p>{text.descriptions[info.shift_mode]}</p></Icon>
                        <Icon><div className='border'><GasIcon /></div> <p>{text.descriptions[info.gas]}</p></Icon>
                        <Icon><div className='border'><PeopleIcon /></div> <p>{info.people}</p></Icon>
                        <Icon><div className='border'><DoorsIcon /></div> <p>{info.doors}</p></Icon>
                    </IconContainer>

                    <div className='price'>
                        <div>
                            <p className='total'>{text.from}</p>
                            <p className='warning'>{text.notice[0]} {days} {text.notice[1]}</p>
                        </div>
                        <div className='value'>{getPriceRounded(pricing + (15 * days))}€</div>
                    </div>

                    <Button onClick={() => handleCarSelection(info)} background={theme.primary}>
                        {text.continue}
                    </Button>
                    <p className='disclaimer'>{text.disclaimer}</p>

                    <p className='phone'>( +351 ) 934 953 682</p>

                </div>
            </Car>
        )
    }

    return (
        <Container>
            <Title>{text.title}</Title>
            <RangePickerContainer>
                <DateFormItem text={text.button} dates={dates} setDates={setDates} />
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
        fetchCarsSelector: (filters) => dispatch(fetchCarsSelector(filters)),
        setCurrent: (car) => dispatch(setCurrent(car)),
        fetchPromotions: (car) => dispatch(fetchPromotions(car)),
        fetchExtras: () => dispatch(fetchExtras()),
    };
};

const mapStateToProps = (state) => {
    return {
        data: state.car.selector,
        loading: state.car.loading,
        language: state.application.language,
        promotions: state.promotion.data
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Garage));