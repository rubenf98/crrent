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
    border: 0px;
    cursor: pointer;

    p, a {
        margin: 0px;
        color: white;
    }

    img {
        margin-right: 15px;
        width: 20px;
        height: 20px;
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
