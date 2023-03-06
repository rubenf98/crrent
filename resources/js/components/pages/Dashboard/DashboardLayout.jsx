import React, { useEffect } from 'react'
import styled from 'styled-components';
import PrivateRoute from '../../common/PrivateRoute';
import moment from "moment";
import Navbar from './Navbar';
import ThemeContainer from '../../ThemeContainer';
import { Menu } from 'antd';
import { AirIcon, MailIcon } from '../../../icons';
import { Link } from 'react-router-dom';
import { fetchGlobalParameters } from '../../../redux/globalParameter/actions';
import { connect } from 'react-redux';

const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    font-family: 'Lato';
    background-color: #ececec;
`;

const Content = styled.div`
    padding: 20px 50px 20px 50px;
    box-sizing: border-box;
    flex: 1;
`;

const SideMenu = styled.div`
    min-height: 100vh;
    width: 250px;

    .ant-menu {
        height: 100%;
        width: 250px;

        .icon {
            width: 18px;
            height: auto;
            margin: auto;
        }
    }

   

    .ant-menu-item:nth-child(1) {
        margin-bottom: 30px !important;
        margin-top: 20px !important;
        height: 60px;
        pointer-events: none;
        cursor: default;

    }

    .ant-menu.ant-menu-dark {
        background-color: #340e54;
    }

    .ant-menu-item-selected {
        background-color: #7B2CBF !important;
    }
    
    
`;

const Footer = styled.section`
    margin-top: 50px;
    
    img {
        width: 120px;
        margin: auto;
        display: block;
    }

    p {
        text-align: center;
        margin: 20px auto;
    }

`;


const Logo = styled.img`
    width: 150px;
    margin: auto;
    display: block;

`;

function DashboardLayout({ children, fetchGlobalParameters }) {

    useEffect(() => {
        fetchGlobalParameters();
    }, [])

    const items = [
        {
            label: <Logo src="/image/logo_navbar.png" alt="logo" />,
        },

        {
            label: <Link to="/painel/">Página Inicial</Link>,
            key: '',
            icon: <img className='icon' src="/icon/dashboard/dashboard.svg" />
        },
        {
            label: <Link to="/painel/reservas">Reservas</Link>,
            key: 'reservas',
            icon: <img className='icon' src="/icon/dashboard/reservations.svg" />
        },
        {
            label: <Link to="/painel/datas">Datas Bloqueadas</Link>,
            key: 'datas',
            icon: <img className='icon' src="/icon/dashboard/blocked.svg" />
        },
        {
            label: <Link to="/painel/carros">Veículos</Link>,
            key: 'carros',
            icon: <img className='icon' src="/icon/dashboard/car.svg" />
        },
        {
            label: <Link to="/painel/extras">Extras</Link>,
            key: 'extras',
            icon: <img className='icon' src="/icon/dashboard/extras.svg" />
        },
        {
            label: <Link to="/painel/precos">Preços</Link>,
            key: 'precos',
            icon: <img className='icon' src="/icon/dashboard/price.svg" />
        },
        {
            label: <Link to="/painel/clientes">Clientes</Link>,
            key: 'clientes',
            icon: <img className='icon' src="/icon/dashboard/client.svg" />
        },
        {
            label: <Link to="/painel/agencias">Agências</Link>,
            key: 'agencias',
            icon: <img className='icon' src="/icon/dashboard/agency.svg" />
        },
        {
            label: <Link to="/painel/configuracao">Configuração</Link>,
            key: 'configuracao',
            icon: <img className='icon' src="/icon/dashboard/config.svg" />
        },
        {
            label: <Link to="/painel/logs">Logs</Link>,
            key: 'logs',
            icon: <img className='icon' src="/icon/dashboard/config.svg" />
        },


    ];

    return (
        <ThemeContainer>

            <PrivateRoute >

                <Container>
                    <SideMenu>
                        <Menu
                            theme="dark"
                            defaultSelectedKeys={['']}
                            mode="vertical"
                            items={items}
                        />
                    </SideMenu>
                    {/* <Navbar /> */}
                    <Content>
                        {children}
                        <Footer>
                            <img src="/image/logo.png" alt="logo" />
                            <p>© {moment().year()} CR Rent. All Rights Reserved.</p>
                        </Footer>
                    </Content>

                </Container>

            </PrivateRoute>
        </ThemeContainer>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchGlobalParameters: () => dispatch(fetchGlobalParameters())
    };
};

export default connect(null, mapDispatchToProps)(DashboardLayout);