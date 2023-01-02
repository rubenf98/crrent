
import React, { useState, useEffect } from 'react'
import styled, { withTheme } from "styled-components";
import { dimensions, maxWidth } from '../../helper';
import { fetchBlocksSelector } from "../../../redux/block/actions";
import { connect } from 'react-redux';

const RangePickerContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 100px;
    position: relative;

    @media (max-width: ${dimensions.md}) {
        margin-top: 100px;
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

    @media (max-width: ${dimensions.md}) {
        font-size: 14px;
        padding: 15px;
        font-weight: 40;
    }
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

    @media (max-width: ${dimensions.md}) {
        padding: 0px;
    }

`;

const TitleContainer = styled.div`
    display: block;
    width: 100%;
    box-sizing: border-box;
    position: relative;
    max-width: calc(${maxWidth});
    margin: auto;

    @media (max-width: ${dimensions.sm}) {
             br {
                display: none;
             }
        }

    h2 {
        width: 70%;
        padding-right: 10px;
        box-sizing: border-box;
        font-size: clamp(16px, 3vw, 30px);

        span {
            text-decoration: underline;
        }

        @media (max-width: ${dimensions.md}) {
            width: 100%;
        }
    } 

    h1 {
        font-size: clamp(50px, 10vw, 90px);
        font-weight: 700;
        line-height: 94%;
        color: ${props => props.color};
        text-align: left;
        text-transform: uppercase;

        @media (max-width: ${dimensions.xxl}) {
            padding-left: 30px;
            box-sizing: border-box;
        }


        @media (max-width: ${dimensions.xl}) {
            font-size: 60px;
        }

        @media (max-width: ${dimensions.md}) {
            width: 100%;
            font-size: 40px;
            padding-left: 0px;
        }

        @media (max-width: ${dimensions.sm}) {
            font-size: 30px;
        }
    }

    
    @media (max-width: ${dimensions.md}) {
        padding: 100px 0px 0px 30px;
        margin: 100px auto 0px auto;
        min-height: 50%;
    }
`;

const Image = styled.img`
    width: 50%;
    height: 100vh;
    position: absolute;
    right: 0;
    bottom: 0;
    object-fit: cover;
    z-index: -2;

    @media (max-width: ${dimensions.md}) {
        height: 45vh;
        width: 100vw;
    }
`;

const Content = styled.div`
    width: 100%;

    @media (max-width: ${maxWidth}) {
        box-sizing: border-box;
        padding: 0px 20px;
    }


    @media (max-width: ${dimensions.md}) {
        height: 100vh;
    }
`;

const LinksContainer = styled.div`
    bottom: 0px;
    left: 60px;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 60px;
    opacity: .8;

    svg {
        width: 30px;
        height: 30px;
        cursor: pointer;
    }

    @media (max-width: ${dimensions.xxl}) {
        gap: 40px;
    }

    @media (max-width: ${maxWidth}) {
        gap: 30px;
        display: none;
    }

    @media (max-width: ${dimensions.md}) {
        display: none;
    }
`;

const Accent = styled.div`
    width: 80px;
    height: 250px;
    top: -50px;
    left: -50px;
    position: absolute;
    z-index: -1;
    background-color: ${props => props.background};

    @media (max-width: ${dimensions.xxl}) {
        left: 0px;
        width: 80px;
        height: 200px;
    }

    @media (max-width: ${maxWidth}) {
        left: 0px;
        top: -20px;
        width: 70px;
        height: 150px;
    }

    @media (max-width: ${dimensions.md}) {
        
        height: 100px;
        width: 55px;
        top: 70px;
    }
`;

function Header({ theme, text, fetchBlocksSelector }) {
    // const [dates, setDates] = useState([undefined, undefined]);
    // var navigate = useNavigate();

    // useEffect(() => {
    //     fetchBlocksSelector();

    // }, [])


    // const handleSearch = () => {
    //     const dateFormat = "YYYY-MM-DD HH:mm";
    //     navigate("/garage?from=" + moment(dates[0]).format(dateFormat) + "&to=" + moment(dates[1]).format(dateFormat))
    // };

    return (
        <Container id="header">
            <Content>
                <TitleContainer color={theme.primary}>
                    <Accent background={theme.secundary} />
                    <h1>{text.title}</h1>

                    <h2>{text.subtitle}</h2>
                </TitleContainer>

            </Content>

            <Image src="/image/homepage/header_1920.jpg" />
        </Container>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {

        fetchBlocksSelector: (level) => dispatch(fetchBlocksSelector(level)),
    };
};


export default connect(null, mapDispatchToProps)(withTheme(Header));