import React, { Component } from "react";
import styled from "styled-components";
import Row from "antd/es/row"
import { NavLink } from "react-router-dom";
import { dimensions } from "../../helper";

const Container = styled(Row)`
    width: 100%;
    height: 80px;
`;

const NavBarContainer = styled(Row)`
    width: 100%;
    text-transform: uppercase;
    margin: auto;

    @media (max-width: ${dimensions.md}){
        width: 100%;
    }
`;

const TabList = styled.ul`
    text-align: center;
    margin: 0 auto;
    display: block;
    padding: 0;

    li {
        display: inline-block;
    }

    .link--active{
        color: black;
        font-weight: bold;
    }
`;

const LinkWithSeparator = styled(NavLink)`
    text-decoration: none;
    font-size: 16px;
    display: inline-block;
    padding: 0 10px;
    margin: auto 5px;
    position: relative;
    cursor: pointer;
    transition: 0.3s;
    margin: 0 10px;
    text-transform: uppercase;
    font-size: 16px;
    color: black;

    &:hover {
        color: black;
    }

    @media (max-width: ${dimensions.sm}){
        font-size: .9em;
        margin: 0 10px;
    }
`;



function Navbar() {

    const NavBarItem = ({ item, name }) => (
        <LinkWithSeparator activeClassName="link--active" to={"/painel/" + item} >
            {name}
        </LinkWithSeparator>
    )

    return (
        <Container type="flex" justify="center" align="middle">
            <NavBarContainer type="flex" justify="space-around" align="middle">

                <TabList>
                    <li>
                        <NavBarItem item="" name="página inicial" />
                        <NavBarItem item="reservas" name="reservas" />
                        <NavBarItem item="datas" name="datas bloqueadas" />
                        <NavBarItem item="carros" name="carros" />
                        <NavBarItem item="extras" name="extras" />
                        <NavBarItem item="precos" name="preços" />
                    </li>
                </TabList>

            </NavBarContainer>
        </Container>
    )
}


export default Navbar;
