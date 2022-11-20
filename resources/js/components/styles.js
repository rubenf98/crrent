import styled, { css } from "styled-components";
import { dimensions, maxWidth } from "./helper";

export const maxWidthStyle = css`
    width: 100%;
    box-sizing: border-box;
    max-width: ${maxWidth};
    margin: auto;

    @media (max-width: ${maxWidth}) {
        padding: 0px 20px;
    }
`;

export const titleStyle = css`
    font-size: 64px;
    font-weight: 700;
    line-height: 94%;
    text-transform: uppercase;

    @media (max-width: ${dimensions.lg}) {
        font-size: 50px;
    }

    @media (max-width: ${dimensions.md}) {
        font-size: 40px;
    }
`;

export const Button = styled.button`
    background-color: ${props => props.background};
    padding: 12px 33px;
    box-sizing: border-box;
    color: white;
    font-size: 20px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    border-color: ${props => props.background};
    cursor: pointer;
    transition: all .3s ease;

    

    p, a {
        margin: 0px;
        color: white;
    }

    img {
        margin-right: 15px;
        width: 20px;
        height: 20px;
    }

    &:hover {
        color: ${props => props.background};
        background-color: white;
        border: 2px solid;

        p, a {
            margin: 0px;
            color: ${props => props.background};
        }
    }

    @media (max-width: ${dimensions.md}) {
        font-size: 16px;
        padding: 8px 16px;

        img {
            margin-right: 10px;
            width: 15px;
            height: 15px;
        }
    }
`;


export const SecundaryButton = styled.button`
    background-color: white;
    border: 2px solid;
    border-color: ${props => props.primary};
    cursor: pointer;
    color: ${props => props.primary};
    padding: 12px 33px;
    box-sizing: border-box;
    font-size: 20px;
    font-weight: bold;
    text-transform: uppercase;
    cursor: pointer;
`;
