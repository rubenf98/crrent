import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled, { withTheme, keyframes, css } from "styled-components";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { dimensions } from '../../helper';
import { SecundaryButton } from "../../styles";
import { confirmReservation } from '../../../redux/reservation/actions';

const Container = styled.section`
    padding: 0px 0px;
    box-sizing: border-box;
    padding: 180px 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 50px auto;

    img {
        width: 50%;
        margin: auto;
        display: block;
        margin-bottom: 50px;
        max-width: 350px;
    }

    h2 {
        text-align: center;
        margin: auto;
        font-size: 30px; /* Fallback value */
        font-size: clamp(20px, 3vw, 38px);
    }

    p {
        text-align: center;
        opacity: .7;
        width: 60%;
        margin: auto;
        font-size: 18px;
    }

    @media (max-width: ${dimensions.md}) {
        padding: 150px 0px;
        img {
            width: 80%;
        }

        p {
            width: 90%;
        }
    }
`;

const Button = styled(Link)`
    margin: 50px auto auto auto;
    display: block;
    text-align:center;
`;
function Confirmation({ language, theme, confirmReservation, loading }) {
    let navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const { text } = require('../../../../assets/' + language + "/reservation");

    useEffect(() => {
        var token = searchParams.get("token");

        if (token) {
            confirmReservation({ token: token });
        }
    }, [])


    return (
        <Container>
            {loading ? <p>loading</p> :
                <div>
                    <img src="/image/other/confirmation.svg" alt="email" />
                    <h2>{text.confirmation.title}</h2>
                    <p>{text.confirmation.text}</p>

                    <Button to="/">
                        <SecundaryButton type='search' primary={theme.primary}>
                            {text.confirmation.button}
                        </SecundaryButton>
                    </Button>
                </div>}

        </Container>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        confirmReservation: (data) => dispatch(confirmReservation(data)),
    };
};

const mapStateToProps = (state) => {
    return {
        loading: state.application.loading,
        language: state.application.language,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Confirmation));