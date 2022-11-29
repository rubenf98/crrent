import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { dimensions } from "../../helper";

const Container = styled.div`
    h1 {
        text-align: center;
        font-size: 36px;
        text-align: center;
        padding: 50px 0;
    }
`;

const Content = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;

    @media (max-width: ${dimensions.md}){
        flex-wrap: wrap;
    }
`;

const CardContent = styled.div`
    width: 30%;
    box-sizing: border-box;
    text-align: center;
    min-width: 200px;
    border-radius: 6px;
    box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.2);
    transition: .3s ease-in-out;
    padding: 20px;
    box-sizing: border-box;
    
    &:hover {
        transform: scale(1.01);
        box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.15);
    }

    @media (max-width: ${dimensions.md}){
        width: 100%;
    }

    img {
        width: 80%;
        margin: auto;
        display: block;
    }

    p {
        font-weight: bold;
        margin: 15px auto;
        font-size: 16px;
        color: #222222;
    }
`;

const CardContainer = ({ img, text, to }) => (
    <CardContent>

        <Link to={to}>
            <img src={img} alt="iPhone icon" />
            <p className="card-text">{text}</p>
        </Link>

    </CardContent>
);

class Dashboard extends Component {
    render() {
        return (
            <Container>
                <h1>Bem vindo de volta ao painel de controlo</h1>
                <Content >

                    <CardContainer
                        img="/icon/dashboard/reservation.svg"
                        text="Listagem de reservas"
                        to="/painel/reservas"
                    />

                    <CardContainer
                        img="/icon/dashboard/blocked.svg"
                        text="Datas bloqueadas"
                        to="/painel/bloqueado"
                    />

                    <CardContainer
                        img="/icon/dashboard/car.svg"
                        text="Carros na plataforma"
                        to="/painel/carros"
                    />

                    <CardContainer
                        img="/icon/dashboard/extra.svg"
                        text="Extras disponibilizados"
                        to="/painel/extras"
                    />

                    <CardContainer
                        img="/icon/dashboard/promotion.svg"
                        text="Preços e promoções"
                        to="/painel/precos"
                    />

                </Content>

            </Container>
        );
    }
}

export default Dashboard;
