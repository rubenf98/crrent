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
    width: 60%;
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
        :last-child {
            div::after {
                content: "";
            }
        }
    }

    .link--active{
        color: black;
        font-weight: bold;
        ::before {
            width: 105%;
        }
    }
`;

const LinkWithSeparator = styled(NavLink)`
    text-decoration: none;
    font-size: 1.2em;
    display: inline-block;
    padding: 0 10px;
    margin: auto 5px;
    position: relative;
    cursor: pointer;
    -webkit-transition: 0.3s;
    -moz-transition: 0.3s;
    -o-transition: 0.3s;
    transition: 0.3s;
    border-bottom: 6px solid white;
    margin: 0 20px;
    text-transform: uppercase;
    font-size: 1em;
    color: black;

    &:hover {
        color: black;
    }

    @media (max-width: ${dimensions.sm}){
        font-size: .9em;
        margin: 0 10px;
    }



    ::after {
        position: absolute;
        content: "•";
        color: #777;
        right: -25px;

        @media (max-width: ${dimensions.sm}){
            right: -15px;
        }
    }

    :last-child {
        ::after {
        content: "";
        }
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
                    </li>
                </TabList>

            </NavBarContainer>
        </Container>
    )
}


export default Navbar;
