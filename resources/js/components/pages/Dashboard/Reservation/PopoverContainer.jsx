import { Col, Popover, Row, Tag } from 'antd';
import React from 'react'
import styled from "styled-components";
import moment from "moment";

const Container = styled(Row)`
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

function PopoverContainer({ key, item, children, handleCalendarViewMore }) {
    const content = (data) => (
        <Container type="flex">
            <Col className='background' span={10}>
                <p className='title'>id</p>
                <p className='value'>{data.id}</p>

                <p className='title'>estado</p>
                <p className='value'> <Tag color={data.status == "pendente" ? "warning" : data.status == "confirmado" ? "success" : "error"}>{data.status}</Tag></p>

                <p className='title'>data</p>
                <p className='value'>{moment(data.created_at).format("DD-MM-YYYY HH:mm")}</p>
            </Col>
            <Col span={7}>
                <p className='title'>cliente</p>
                <p className='value'>{data?.client?.name}</p>

                <p className='title'>veículo</p>
                <p className='value'>{data?.car?.category?.title} ({data?.car?.registration})</p>

                <p className='title'>levantamento</p>
                <p className='value'>{moment(data.pickup_date).format("DD-MM-YYYY HH:mm")}</p>

                <p className='title'>entrega</p>
                <p className='value'>{moment(data.return_date).format("DD-MM-YYYY HH:mm")}</p>


            </Col>
            <Col span={7}>
                <p className='title'>total</p>
                <p className='value'>{data.price}€</p>

                <p className='title'>notas</p>
                <p className='value'>{data.notes ? data.notes : "N/A"}</p>

                {handleCalendarViewMore && <a onClick={() => handleCalendarViewMore(data)}>ver mais</a>}
            </Col>
        </Container>
    );

    const noteContent = (data) => (
        <Container>
            <Col span={24}>
                <p className='title'>data bloqueadas pelo administrador</p>
                <p className='value'>{data ? data : "N/A"}</p>
            </Col>
        </Container>
    );
    console.log(item.id);
    return (
        <Popover style={{ padding: "0px" }} key={key} content={item.type == "other" ? () => noteContent(item.content) : () => content(item.content)}>
            {children}
        </Popover>
    )
}

export default PopoverContainer