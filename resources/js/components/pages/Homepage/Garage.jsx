import React, { useRef } from 'react'
import styled, { withTheme } from "styled-components";
import { getCarouselBreakpoints } from '../../helper';
import { maxWidthStyle } from '../../styles';
import { PreviousIcon, NextIcon } from '../../../icons';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const Container = styled.section`
    ${maxWidthStyle}
    margin: 200px auto 100px auto;
`;

const TitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    h2 {
        font-size: 64px;
        text-transform: uppercase;
        font-weight: 700;
        margin: 0px;
    }
`;

const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 40px;

    span, button {
        font-size: 24px;
        text-transform: uppercase;
        font-weight: 400;
    }

    button {
        background-color: white;
        padding: 20px 60px;
        border: 2px solid;
        border-color: ${props => props.borderColor};
        cursor: pointer;
    }
`;

const Filter = styled.span`
    .rectangle{
        display: inline-block;
        margin-right: 15px;
        width: 20px;
        height: 20px;
        background-color: ${props => props.background};
    }
`;

const ArrowContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
    font-size: 24px;
    font-weight: 700;
    margin: 50px auto;

    svg {
        width: 10px;
        height: 20px;
        margin: 0px 20px;
    }

    .separator {
        width: 180px;
        opacity: .3;
        height: 2px;
        background-color: ${props => props.background};
    }
`;

const Car = styled.div`
    width: 100%;
    padding: 30px;
    box-sizing: border-box;
    
    .image-container {
        width: 100%;
        position: relative;
        padding: 30px 0px;
        box-sizing: border-box;

        img {
            width: 100%;
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
        }
    }

    .info-container {
        h3, h4 {
            text-align: center;
            color: ${props => props.primary};
        }

        h3 {
            font-size: 20px;
            font-weight: 700;
            margin: 20px 0px 0px 0px;
        }

        h4 {
            font-size: 16px;
            font-weight: 400;
            opacity: .5;
            margin: 0px 0px 40px 0px;
        }

        .price-container {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 30px;
            color: ${props => props.primary};

            span {
                opacity: .5;
            }

            button, p {
                background-color: transparent;
                border: 0px;
                font-size: 16px;
                font-weight: 700;
                margin: 0px;
            }

            button {
                cursor: pointer;
            }
        }
    }
`;

const cars = [
    { id: 1, level: "A", image: "/image/garage/template.png", title: "Peugeot 308", subtitle: "Allure", price: 30 },
    { id: 2, level: "B", image: "/image/garage/template.png", title: "Peugeot 308", subtitle: "Allure", price: 30 },
    { id: 3, level: "C", image: "/image/garage/template.png", title: "Peugeot 308", subtitle: "Allure", price: 30 },
    { id: 4, level: "A", image: "/image/garage/template.png", title: "Peugeot 308", subtitle: "Allure", price: 30 },
    { id: 5, level: "B", image: "/image/garage/template.png", title: "Peugeot 308", subtitle: "Allure", price: 30 },
    { id: 6, level: "C", image: "/image/garage/template.png", title: "Peugeot 308", subtitle: "Allure", price: 30 }
]

function Garage({ theme }) {
    const carouselRef = useRef(null);

    function handleClick(action) {
        if (action == "next") {
            carouselRef.current.next();
        } else {
            carouselRef.current.previous();
        }
    }

    const CarSection = ({ info }) => (
        <Car primary={theme.primary} background={theme.levels[info.level]}>
            <div className='image-container'>
                <div className='car-background' />
                <img src={info.image} alt={info.title} />
            </div>

            <div className='info-container'>
                <h3>{info.title}</h3>
                <h4>{info.subtitle}</h4>

                <div className='price-container'>
                    <p>{info.price}€ <span>/ por Dia</span></p>
                    <button>Reservar</button>
                </div>
            </div>
        </Car>
    )

    return (
        <Container id="garage">
            <TitleContainer>
                <h2>Garagem</h2>
                <FilterContainer borderColor={theme.primary}>
                    <Filter background={theme.levels.A}><div className="rectangle" />GAMA A</Filter>
                    <Filter background={theme.levels.B}><div className="rectangle" />GAMA B</Filter>
                    <Filter background={theme.levels.C}><div className="rectangle" />GAMA C</Filter>
                    <Filter background={theme.levels.E}><div className="rectangle" />GAMA E</Filter>
                    <button type='search'>ver mais</button>

                </FilterContainer>
            </TitleContainer>

            <Carousel arrows={false} responsive={getCarouselBreakpoints([1, 1, 3, 3, 3])} draggable={false} autoPlay={false} ref={carouselRef} >
                {cars.map((car) => (
                    <CarSection index={car.id} info={car} />
                ))}
            </Carousel>

            <ArrowContainer background={theme.primary}>
                <div onClick={() => handleClick("previous")}><PreviousIcon /> 1</div>
                <div className='separator' />
                <div onClick={() => handleClick("next")}> 3 <NextIcon /></div>
            </ArrowContainer>


        </Container>
    )
}

export default withTheme(Garage)