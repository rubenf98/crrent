import React, { Component } from "react";
import styled from "styled-components";
import Footer from "./common/Footer";
import Navbar from "./common/Navbar";
import ThemeContainer from "./ThemeContainer";


const Container = styled.div`
    width: 100%;
    min-height: 100%;
    margin: auto;
    display: block;
    position: relative;
    box-sizing: border-box;
    overflow-x: hidden;
`;

class Layout extends Component {
    render() {
        return (
            <ThemeContainer>
                <Container>
                    <Navbar />
                    <div> {this.props.children} </div>
                    <Footer />
                </Container>
            </ThemeContainer>
        );
    }
}


export default Layout;