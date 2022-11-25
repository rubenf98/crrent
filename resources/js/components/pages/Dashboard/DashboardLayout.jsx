import React from 'react'
import styled from 'styled-components';
import PrivateRoute from '../../common/PrivateRoute';
import moment from "moment";
import Navbar from './Navbar';
import ThemeContainer from '../../ThemeContainer';

const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    font-family: 'Lato';
`;

const Content = styled.section`
    width: 100%;
    max-width: 1270px;
    flex: 1;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Footer = styled.section`

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

function DashboardLayout({ children }) {
    return (
        <ThemeContainer>
            <PrivateRoute >
                <Container>
                    <Navbar />
                    <Content>{children}</Content>
                    <Footer>
                        <img src="/image/logo.png" alt="logo" />
                        <p>© {moment().year()} CR Rent. All Rights Reserved.</p>
                    </Footer>
                </Container>

            </PrivateRoute>
        </ThemeContainer>
    )
}

export default DashboardLayout