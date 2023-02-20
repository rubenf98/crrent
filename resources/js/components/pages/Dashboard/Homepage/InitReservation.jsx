import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DateFormItem from "../../../common/DateFormItem";
import { Row, Tag } from 'antd';
import moment from "moment";
import { SecundaryButton, SmallPrimaryButton } from "../../../styles";
import { fetchCarCategorySelector } from "../../../../redux/carCategory/actions";
import { connect } from "react-redux";
import { getCarPrice, getDaysDifference, getInsurancePrice, getPriceRounded, getPromotions } from "../../../functions";
import { fetchPromotions } from "../../../../redux/promotion/actions";
import { fetchInsurances } from "../../../../redux/insurance/actions";
import { dimensions } from "../../../helper";

const Container = styled.div`
    width: 100%;
    padding: 30px 20px;
    box-sizing: border-box;
    background-color: white;
    border-radius: 6px;
    box-shadow: 0px 0px 5px 0px #c6c6c6;

    .ant-empty {
        margin: 0px !important;
    }

    .title {
        border-bottom: 1px solid #00000040;
        padding: 10px 0px;
        opacity: .7;

        h2 {
            display: inline-block;
            font-weight: bold;
        }

        span {
            border: 1px solid #00000040;
            font-size: 18px;
            margin-left: 5px;
            padding: 0px 5px;
        }
    }

    th {
        font-weight: bold !important;
        opacity: .7;
    }
`;

const Car = styled.div`
    width: 100%;
    padding: 10px;
    margin: 10px auto;
    box-sizing: border-box;

    h3 {
        font-weight: 700;
        font-size: 30px;
        margin: 0px 0px 0px 0px;

        @media (max-width: ${dimensions.md}) {
            margin: 0px;
            margin-top: 10px;
            font-size: 16px;
        }
    }

    h4 {
        margin: 0px 0px 10px 0px;
        font-size: 16px;
        opacity: .7;
        font-weight: 400;

    }

    .price { 
        display: flex;
        justify-content: space-between;
        align-items: center;

        .warning {
            opacity: .5;
            font-weight: 400;
            margin: 0px;
            font-weight: bold;
        }

        .value {
            color: #580058;
            font-size: 42px;
            font-weight: 700;

            @media (max-width: ${dimensions.md}) {
                font-size: 32px;
            }
        }
    } 
    
`;


function InitReservation(props) {
    const [dates, setDates] = useState([undefined, undefined]);
    const [days, setDays] = useState(0);
    const [hasSearch, setHasSearch] = useState(false);


    const { data, insurances, promotions } = props;

    useEffect(() => {
        props.fetchInsurances()
    }, [])

    const handleSearch = () => {
        if (dates[0] && dates[1]) {
            var difference = getDaysDifference(dates[0], dates[1]);

            setDays(difference);

            props.fetchPromotions();

            props.fetchCarCategorySelector({ from: dates[0], to: dates[1] });
            setHasSearch(true);
        }
    }



    const CarSection = ({ info, aInsurances }) => {
        var newFactors = getPromotions(promotions, dates[0], days, info.level.id);
        var pricing = getCarPrice(info.level.prices, days, newFactors);
        var insurance = getInsurancePrice(aInsurances, days);
        return (
            <Car>

                <h3>{info.title}</h3>

                <div className='price'>
                    <div>
                        <p className='warning'>Preço para {days} dias sem inclusão de taxas, extras e valores do seguro</p>
                        <p className='warning'>Ao valor total acresce {insurance}€ de seguro, totalizando {pricing + insurance}€</p>
                    </div>
                    <div className='value'>{getPriceRounded(pricing)}€</div>
                </div>

                {/* <SmallPrimaryButton onClick={() => handleCarSelection(info)}>
                    continuar
                </SmallPrimaryButton> */}

            </Car>
        )
    }

    return (
        <Container>
            <div className="title">
                <h2>Pesquisa de valores</h2>
            </div>
            <br />
            <Row type="flex" justify="flex-start">
                <DateFormItem text={["data levantamento", "horário levantamento", "data devolução", "horário devolução"]} dates={dates} setDates={setDates} />
                <SecundaryButton onClick={handleSearch} style={{ margin: "0px 0px 24px 16px" }}>pesquisar</SecundaryButton>
            </Row>

            {(hasSearch && insurances.length) && data.map((car) => (
                <CarSection key={car.id} info={car} aInsurances={insurances} />
            ))}
        </Container>
    )
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchCarCategorySelector: (filters) => dispatch(fetchCarCategorySelector(filters)),
        fetchPromotions: (car) => dispatch(fetchPromotions(car)),
        fetchInsurances: () => dispatch(fetchInsurances()),
    };
};

const mapStateToProps = (state) => {
    return {
        data: state.carCategory.selector,
        loading: state.carCategory.loading,
        promotions: state.promotion.data,
        insurances: state.insurance.data
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(InitReservation);
