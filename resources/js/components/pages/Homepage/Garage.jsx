import React, { useRef, useEffect, useState } from 'react'
import styled, { withTheme, keyframes } from "styled-components";
import { useNavigate } from 'react-router-dom';
import { dimensions, getCarouselBreakpoints } from '../../helper';
import { maxWidthStyle, titleStyle, SecundaryButton } from '../../styles';
import { fetchCarsSelector, setCurrent } from "../../../redux/car/actions";
import { PreviousIcon, NextIcon } from '../../../icons';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { connect } from "react-redux";

const stretch = keyframes`
  from {
    max-height: 0px;
  }

  to {
    max-height: 10000px;
  }
`;

const Container = styled.section`
    ${maxWidthStyle}
    margin: 200px auto 100px auto;
    position: relative;
    z-index: 3;
    
    @media (max-width: ${dimensions.md}) {
        margin: 100px auto;
    }
`;

const TitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
    margin-bottom: 50px;

    h2 {
        ${titleStyle}
        margin: 0px;
    }
`;

const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 40px;

    @media (max-width: ${dimensions.md}) {
        gap: 20px;
        margin-bottom: 30px;
    }

    @media (max-width: ${dimensions.sm}) {
        gap: 10px;
    }
`;

const Filter = styled.span`
    font-size: 20px;
    text-transform: uppercase;
    font-weight: 400;

    .rectangle{
        display: inline-block;
        margin-right: 15px;
        width: 18px;
        height: 18px;
        background-color: ${props => props.background};
    }

    @media (max-width: ${dimensions.md}) {
        font-size: 16px;
    }
`;

const DesktopButtonContainer = styled.div`
    display: inline-block;

    @media (max-width: ${dimensions.xl}) {
        display: none;
    }
`;

const MobileButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    

    @media (min-width: ${dimensions.md}) {
        display: none;
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
    width: 40%;

    div {
        cursor: pointer;
    }

    svg {
        width: 10px;
        height: 20px;
        margin: 0px 20px;
    }

    .separator {
        opacity: .3;
        height: 2px;
        background-color: ${props => props.background};
        flex: 1;
        cursor: default;
    }
    @media (max-width: ${dimensions.lg}) {
        width: 60%;
    }

    @media (max-width: ${dimensions.md}) {
        gap: 20px;
        font-size: 20px;
        width: 80%;
    }

    @media (max-width: ${dimensions.sm}) {
        width: 100%;
    }
`;

const Car = styled.div`
    width: 100%;
    padding: 30px;
    box-sizing: border-box;
    cursor: pointer;

    
    
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
            transition: width .3s ease-in-out;
        }
    }

    &:hover {
        .car-background {
            width: 70%;
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


const CarContainer = styled.div`

    .content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
    }
    
    overflow: hidden;
    animation: ${stretch} 3s ease-in-out forwards;

    .car-section {
        width: 33%;

        @media (max-width: ${dimensions.md}) {
            width: 100%;
        }
    }
`;

function Garage({ theme, fetchCarsSelector, setCurrent, data, text, promotions }) {
    const carouselRef = useRef(null);
    const [currentSlides, setCurrentSlides] = useState([1, 3])
    const [currentFactor, setCurrentFactor] = useState(1)
    const [seeMore, setSeeMore] = useState(false)
    var navigate = useNavigate();

    useEffect(() => {
        fetchCarsSelector();
    }, []);

    useEffect(() => {
        if (promotions.length) {
            var smallerFactor = 1;
            promotions.map((promotion) => {
                if (promotion.factor < smallerFactor) {
                    smallerFactor = promotion.factor;
                }
            })
            setCurrentFactor(smallerFactor);

        }

    }, [promotions]);



    function handleClick(action) {
        if (action == "next") {
            carouselRef.current.next();
            if (currentSlides[1] < carouselRef.current.state.totalItems) {
                setCurrentSlides([currentSlides[0] + 1, currentSlides[1] + 1])
            }

        } else {
            carouselRef.current.previous();
            if (currentSlides[0] > 1) {
                setCurrentSlides([currentSlides[0] - 1, currentSlides[1] - 1])
            }
        }
    }

    const CarSection = ({ info }) => (
        <Car className='car-section' onClick={() => handleCarSelection(info)} primary={theme.primary} background={theme.levels[info.level.code]}>
            <div className='image-container'>
                <div className='car-background' />
                <img loading='lazy' src={info.image} alt={info.title} />
            </div>

            <div className='info-container'>
                <h3>{info.title}</h3>
                <h4>{info.subtitle}</h4>

                <div className='price-container'>
                    <p><span>{text.car.price[0]}</span>  {info.level.prices[2].price * currentFactor}€ <span>/ {text.car.price[1]}</span></p>
                    <button>{text.car.button}</button>
                </div>
            </div>
        </Car>
    )



    function handleCarSelection(car) {
        setCurrent(car);
        navigate("/checkout");


    }

    return (
        <Container id="garage">
            <TitleContainer>
                <h2>{text.title}</h2>
                <FilterContainer borderColor={theme.primary}>
                    <Filter background={theme.levels.A}><div className="rectangle" />{text.level} A</Filter>
                    <Filter background={theme.levels.B}><div className="rectangle" />{text.level} B</Filter>
                    <Filter background={theme.levels.C}><div className="rectangle" />{text.level} C</Filter>
                    <Filter background={theme.levels.D}><div className="rectangle" />{text.level} D</Filter>
                    <DesktopButtonContainer>
                        <SecundaryButton type='search' primary={theme.primary} onClick={() => setSeeMore(!seeMore)}>
                            {seeMore ? text.button[1] : text.button[0]}
                        </SecundaryButton>
                    </DesktopButtonContainer>
                </FilterContainer>
            </TitleContainer>

            {
                seeMore ?
                    <CarContainer>
                        <div className='content'>
                            {data.map((car) => (
                                <CarSection key={car.id} info={car} />
                            ))}
                        </div>
                    </CarContainer>
                    : <>
                        <Carousel
                            arrows={false}
                            responsive={getCarouselBreakpoints([1, 1, 3, 3, 3])}
                            draggable={false} autoPlay={false} ref={carouselRef}
                        >
                            {data.map((car) => (
                                <CarSection key={car.id} info={car} />
                            ))}
                        </Carousel>

                        <ArrowContainer background={theme.primary}>
                            <div onClick={() => handleClick("previous")}><PreviousIcon /> {currentSlides[0]}</div>
                            <div className='separator' />
                            <div onClick={() => handleClick("next")}> {window.innerWidth < dimensions.md ? 7 : currentSlides[1]} <NextIcon /></div>
                        </ArrowContainer>

                    </>
            }




            <MobileButtonContainer>
                <SecundaryButton type='search' primary={theme.primary} onClick={() => setSeeMore(!seeMore)}>
                    {seeMore ? "ver menos" : "ver mais"}
                </SecundaryButton>
            </MobileButtonContainer>



        </Container>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCarsSelector: () => dispatch(fetchCarsSelector()),
        setCurrent: (car) => dispatch(setCurrent(car)),
    };
};

const mapStateToProps = (state) => {
    return {
        data: state.car.selector,
        loading: state.car.loading,
        promotions: state.promotion.data,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Garage));