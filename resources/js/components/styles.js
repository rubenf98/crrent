import styled, { css } from "styled-components";
import { maxWidth } from "./helper";

export const maxWidthStyle = css`
    width: 100%;
    box-sizing: border-box;
    max-width: ${maxWidth};
    margin: auto;

    @media (max-width: ${maxWidth}) {
        padding: 0px 20px;
    }
`;