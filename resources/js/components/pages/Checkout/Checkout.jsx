import { Form } from 'antd';
import React, { useEffect } from 'react'
import styled, { withTheme } from "styled-components";
import { dimensions, maxWidth } from '../../helper';
import { Button, maxWidthStyle } from '../../styles';
import Addons from './Addons';
import Client from './Client';
import Driver from './Driver';
import { useNavigate } from 'react-router-dom'
import GeneralInfo from './GeneralInfo';
import { connect } from "react-redux";

const Container = styled.section`
    width: 100%;
    position: relative;
    margin: auto;
    padding: 180px 0px;
    
    @media (max-width: ${maxWidth}) {
        box-sizing: border-box;
        padding: 0px 20px;
    }

    @media (max-width: ${dimensions.md}) {
        margin: 100px 0px;
    }

`;

const Title = styled.h1`
    font-size: 64px;
    text-transform: uppercase;
    font-weight: 700;
    text-align: center;
    margin: 10px auto 60px auto;

    @media (max-width: ${dimensions.md}) {
        font-size: 40px;
    }
`;

const ButtonContainer = styled.div`
    ${maxWidthStyle}
`;

const Price = styled.div`
    position: fixed;
    right: 0px;
    top: 300px;
    padding: 10px 20px;
    box-sizing: border-box;
    max-width: 200px;
    color: white;
    z-index: 2;
    background-color: ${props => props.background};

    h3 {
        color: inherit;
        text-transform: uppercase;
        font-weight: 700;
        font-size: 20px;
        margin-bottom: 0px;
    }
    p {
        margin-top: 0px;
        font-weight: 400;
        font-size: 16px;
        opacity: .8;
    }
    .price {
        text-transform: uppercase;
        font-weight: 700;
        font-size: 40px;
        margin-bottom: 0px;
    }

    @media (max-width: ${dimensions.lg}) {
        top: auto;
        bottom: 0;

        h3 {
            font-size: 18px;
        }

        .price {
            font-size: 36px;
        }
    }
`;

function Checkout({ theme, current }) {
    const [form] = Form.useForm();
    let navigate = useNavigate();
    
    useEffect(() => {
        if (!Object.values(current).length) {
            navigate("/");
        }
    }, [])


    const onFinish = (values) => {
        console.log('Success:', values);
        navigate("/summary");
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Container>
            <Title>Dados da sua reserva</Title>
            <Price background={theme.primary}>
                <h3>total</h3>
                <p>Inclui taxa de 22%</p>
                <div className='price'>
                    240€
                </div>
            </Price>
            <Form
                form={form}
                name="reservation"
                layout="vertical"
                requiredMark={false}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                {Object.values(current).length &&
                    <>
                        <GeneralInfo car={current} />
                        <Addons />
                        <Client />
                        <Driver />
                    </>
                }


                <ButtonContainer>
                    <Button background={theme.primary} type="primary"> reservar </Button>
                </ButtonContainer>
            </Form>
        </Container>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCars: () => dispatch(fetchCars()),
    };
};

const mapStateToProps = (state) => {
    return {
        current: state.car.current,
        loading: state.car.loading,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Checkout));