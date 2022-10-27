import React, { useRef, useEffect } from 'react'
import styled, { withTheme } from "styled-components";
import { useNavigate } from 'react-router-dom';
import { dimensions, getCarouselBreakpoints } from '../../helper';
import { maxWidthStyle, titleStyle, SecundaryButton } from '../../styles';
import { fetchCars, setCurrent } from "../../../redux/car/actions";
import { PreviousIcon, NextIcon } from '../../../icons';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { connect } from "react-redux";

const Container = styled.section`
    ${maxWidthStyle}
    margin: 200px auto 100px auto;
    
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

    span {
        font-size: 24px;
        text-transform: uppercase;
        font-weight: 400;
    }
`;

const Filter = styled.span`
    font-size: 18px;

    .rectangle{
        display: inline-block;
        margin-right: 15px;
        width: 20px;
        height: 20px;
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

function Garage({ theme, fetchCars, setCurrent, data }) {
    const carouselRef = useRef(null);
    var navigate = useNavigate();

    useEffect(() => {
        fetchCars();
    }, [])


    function handleClick(action) {
        if (action == "next") {
            carouselRef.current.next();
        } else {
            carouselRef.current.previous();
        }
    }

    const CarSection = ({ info }) => (
        <Car onClick={() => handleCarSelection(info)} primary={theme.primary} background={theme.levels[info.level.code]}>
            <div className='image-container'>
                <div className='car-background' />
                <img loading='lazy' src={info.image} alt={info.title} />
            </div>

            <div className='info-container'>
                <h3>{info.title}</h3>
                <h4>{info.subtitle}</h4>

                <div className='price-container'>
                    <p>{info.level.prices[2].price}€ <span>/ por Dia</span></p>
                    <button>Reservar</button>
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
                <h2>Garagem</h2>
                <FilterContainer borderColor={theme.primary}>
                    <Filter background={theme.levels.A}><div className="rectangle" />GAMA A</Filter>
                    <Filter background={theme.levels.B}><div className="rectangle" />GAMA B</Filter>
                    <Filter background={theme.levels.C}><div className="rectangle" />GAMA C</Filter>
                    <Filter background={theme.levels.E}><div className="rectangle" />GAMA E</Filter>
                    <DesktopButtonContainer>
                        <SecundaryButton type='search' primary={theme.primary}>
                            ver mais
                        </SecundaryButton>
                    </DesktopButtonContainer>


                </FilterContainer>
            </TitleContainer>

            <Carousel arrows={false} responsive={getCarouselBreakpoints([1, 1, 3, 3, 3])} draggable={false} autoPlay={false} ref={carouselRef} >
                {data.map((car) => (
                    <CarSection key={car.id} info={car} />
                ))}
            </Carousel>

            <ArrowContainer background={theme.primary}>
                <div onClick={() => handleClick("previous")}><PreviousIcon /> 1</div>
                <div className='separator' />
                <div onClick={() => handleClick("next")}> 3 <NextIcon /></div>
            </ArrowContainer>

            <MobileButtonContainer>
                <SecundaryButton type='search' primary={theme.primary}>
                    ver mais
                </SecundaryButton>
            </MobileButtonContainer>



        </Container>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCars: () => dispatch(fetchCars()),
        setCurrent: (car) => dispatch(setCurrent(car)),
    };
};

const mapStateToProps = (state) => {
    return {
        data: state.car.data,
        loading: state.car.loading,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Garage));