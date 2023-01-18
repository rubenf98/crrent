import { Calendar, Badge, Popover, Row, Col, Tag } from 'antd'
import React from 'react'
import moment from "moment"
import styled from "styled-components";
import CardContainer from '../Common/CardContainer';
import { connect } from 'react-redux';

const dateFormat = "YYYY-MM-DD";

const Container = styled.section`
    margin-bottom: 50px;
    width: 100%;

    h1 {
        font-size: 36px;
        text-align: left;
        padding: 50px 0;
    }

    .ant-picker-calendar-date-content {
        height: 60px !important;
    }
`;

const PopoverContainer = styled(Row)`
    background-color: transparent;
    padding: 0px;
    min-width: 400px;

    .ant-col {
        padding: 10px 20px;
        box-sizing: border-box;
        background-color:white;

        .value, .title {
            margin: 0px;
            font-size: 12px;
        }

        .title {
            
            color: #3a3a3a;
            text-transform: uppercase;
        }

        .value {
            margin-bottom: 10px;
            font-weight: bold;
        }
    }
    
    

    .background {
        background-color: ${({ theme }) => theme.primary};
        color: white;

        .title {
            color: #e8e8e8;
        }

    }

`;

function CalendarContainer({ data, loading, handleFilters }) {
    const content = (data) => (
        <PopoverContainer type="flex">
            <Col className='background' span={10}>
                <p className='title'>id</p>
                <p className='value'>{data.id}</p>

                <p className='title'>estado</p>
                <p className='value'>{data.confirmed_at ? <Tag color="success">Confirmado</Tag>
                    : moment().diff(moment(data.pickup_date)) > 0 ? <Tag color="error">Cancelado</Tag> : <Tag color="warning">Pendente</Tag>}</p>

                <p className='title'>data</p>
                <p className='value'>{moment(data.created_at).format("DD-MM-YYYY HH:mm")}</p>
            </Col>
            <Col span={14}>
                <p className='title'>cliente</p>
                <p className='value'>{data.client.name}</p>

                <p className='title'>dias</p>
                <p className='value'>{data.days}, {data.pickup_place}</p>

                <p className='title'>levantamento</p>
                <p className='value'>{moment(data.pickup_date).format("DD-MM-YYYY HH:mm")}</p>

                <p className='title'>entrega</p>
                <p className='value'>{moment(data.return_date).format("DD-MM-YYYY HH:mm")}</p>

                <p className='title'>total</p>
                <p className='value'>{data.price}€</p>
            </Col>
        </PopoverContainer>
    );

    const dateCellRender = (value) => {
        var listData = [];

        data.map((reservation) => {

            if (moment(reservation.pickup_date).isSame(value, 'day')) {
                listData.push({
                    type: 'error',
                    content: 'Levantamento (#' + reservation.id + ')',
                    reservation: reservation
                },)
            }

            if (moment(reservation.return_date).isSame(value, 'day')) {
                listData.push({
                    type: 'error',
                    content: 'Devolução (#' + reservation.id + ')',
                    reservation: reservation
                },)
            }
        })

        return (
            <div>
                {listData.map((item) => (
                    <Popover style={{ padding: "0px" }} key={item.content} content={() => content(item.reservation)}>
                        <p >
                            <Badge status={item.type} text={item.content} />
                        </p>
                    </Popover>
                ))}
            </div>
        );
    };

    const handlePanelChange = (date) => {
        var startDate = moment(date).startOf('month').startOf('day').subtract(5, 'days').format(dateFormat);
        var endDate = moment(date).endOf('month').endOf('day').add(10, 'days').format(dateFormat);
        handleFilters({ dates: [startDate, endDate] });
    }

    return (
        <Container>
            <CardContainer text="Calendário De Reservas">
                <Calendar onPanelChange={handlePanelChange} loading={loading} dateCellRender={dateCellRender} />
            </CardContainer>
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        loading: state.reservation.loading,
        data: state.reservation.dataPerMonth,
    };
};

export default connect(mapStateToProps, null)(CalendarContainer);
