import React from 'react'
import styled from 'styled-components';
import PrivateRoute from '../../common/PrivateRoute';
import moment from "moment";
import Navbar from './Navbar';
import ThemeContainer from '../../ThemeContainer';
import { Menu } from 'antd';
import { MailIcon } from '../../../icons';
import { Link } from 'react-router-dom';

const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    font-family: 'Lato';
    background-color: #ededed;
`;

const Content = styled.div`
    padding: 20px 50px 20px 50px;
    box-sizing: border-box;
    flex: 1;
`;

const SideMenu = styled.div`
    min-height: 100vh;
    width: 300px;

    .ant-menu {
        height: 100%;
        width: 300px;
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

function DashboardLayout({ children }) {
    function getItem(label, key, icon, children, type) {
        return {
            key,
            icon,
            children,
            label,
            type,
        };
    }

    const items = [
        {
            label: <Logo src="/image/logo_navbar.png" alt="logo" />,
        },

        {
            label: <Link to="/painel/">Página Inicial</Link>,
            key: '',
        },
        {
            label: <Link to="/painel/reservas">Reservas</Link>,
            key: 'reservas',
        },
        {
            label: <Link to="/painel/datas">Datas Bloqueadas</Link>,
            key: 'datas',
        },
        {
            label: <Link to="/painel/carros">Carros</Link>,
            key: 'carros',
        },
        {
            label: <Link to="/painel/extras">Extras</Link>,
            key: 'extras',
        },
        {
            label: <Link to="/painel/precos">Preços</Link>,
            key: 'precos',
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

export default DashboardLayout;