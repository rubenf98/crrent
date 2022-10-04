import React, { Component } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./globalStyles";
import { light, dark } from "./themes"
import { connect } from "react-redux";

class Layout extends Component {
    render() {
        return (
            <ThemeProvider theme={this.props.theme === 'light' ? light : dark}>
                <GlobalStyles />
                {this.props.children}
            </ThemeProvider>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        theme: state.application.theme,
    };
};


export default connect(
    mapStateToProps,
    null
)(Layout);