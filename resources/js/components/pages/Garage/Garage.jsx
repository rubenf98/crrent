import React, { useState } from 'react'
import { DoorsIcon, GasIcon, PeopleIcon, ShiftIcon } from '../../../icons';
import { dimensions, maxWidth } from '../../helper';
import styled, { withTheme } from "styled-components";
import { Button, maxWidthStyle } from '../../styles';
import { Link } from 'react-router-dom';
import DateFormItem from '../../common/DateFormItem';

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

        .title { 
            display: flex;
            justify-content: space-between;
            align-items: flex-end;

            h3 {
                font-weight: 700;
                font-size: 40px;
                margin: 0px;
            }

            

            p {
                font-size: 20px;
                font-weight: 700;
                margin: 10px;

                span {
                    opacity: .5;
                    font-weight: 400;
                }

            }

            @media (max-width: ${dimensions.md}) {
                margin-top: 10px;
                
                h3, p {
                    font-size: 16px;
                    margin: 0px;
                }
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

const cars = [
    { id: 1, level: "A", image: "/image/garage/template.png", title: "Peugeot 308", subtitle: "Allure", price: 240 },
    { id: 2, level: "B", image: "/image/garage/template.png", title: "Peugeot 308", subtitle: "Allure", price: 240 },
    { id: 3, level: "C", image: "/image/garage/template.png", title: "Peugeot 308", subtitle: "Allure", price: 240 },
    { id: 4, level: "A", image: "/image/garage/template.png", title: "Peugeot 308", subtitle: "Allure", price: 240 },
    { id: 5, level: "B", image: "/image/garage/template.png", title: "Peugeot 308", subtitle: "Allure", price: 240 },
    { id: 6, level: "C", image: "/image/garage/template.png", title: "Peugeot 308", subtitle: "Allure", price: 240 }
]


function Garage({ theme }) {
    const [dates, setDates] = useState(undefined);

    const handleSearch = () => {
        const dateFormat = "YYYY-MM-DD HH:mm";
        //navigate("/garage?from=" + moment(dates[0]).format(dateFormat) + "&to=" + moment(dates[1]).format(dateFormat))
    };

    const CarSection = ({ info }) => (
        <Car onClick={() => handleCarSelection(info.id)} primary={theme.primary} background={theme.levels[info.level]}>
            <div className='image-container'>
                <div className='car-background' />
                <img src={info.image} alt={info.title} />
            </div>

            <div className='info-container'>
                <div className='title'>
                    <div>
                        <h3>{info.title}</h3>
                    </div>
                    <p>{info.price}€ <span>/ por Dia</span></p>
                </div>
                <h4>{info.subtitle}</h4>
                <IconContainer border={theme.primary}>
                    <Icon><div className='border'><ShiftIcon /></div> <p>Manual</p></Icon>
                    <Icon><div className='border'><GasIcon /></div> <p>Gasolina</p></Icon>
                    <Icon><div className='border'><PeopleIcon /></div> <p>5</p></Icon>
                    <Icon><div className='border'><DoorsIcon /></div> <p>5</p></Icon>
                </IconContainer>

                <div className='price'>
                    <div>
                        <p className='total'>total</p>
                        <p className='warning'>Inclui taxa de 22%</p>
                    </div>
                    <div className='value'>{info.price}€</div>
                </div>

                <Button background={theme.primary}>
                    <Link to="/checkout?car=1">reservar</Link>

                </Button>
                <p className='disclaimer'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

                <p className='phone'>( +351 ) 934 953 682</p>

            </div>
        </Car>
    )

    return (
        <Container>
            <Title>Nossa oferta</Title>
            <RangePickerContainer>
                <DateFormItem dates={dates} setDates={setDates} />
                <Search onClick={handleSearch} background={theme.primary} type='submit'>pesquisar</Search>
            </RangePickerContainer>

            <FilterContainer borderColor={theme.primary}>
                <Filter background={theme.levels.A}><div className="rectangle" />GAMA A</Filter>
                <Filter background={theme.levels.B}><div className="rectangle" />GAMA B</Filter>
                <Filter background={theme.levels.C}><div className="rectangle" />GAMA C</Filter>
                <Filter background={theme.levels.E}><div className="rectangle" />GAMA E</Filter>

            </FilterContainer>

            {cars.map((car) => (
                <CarSection index={car.id} info={car} />
            ))}
        </Container>
    )
}

export default withTheme(Garage)