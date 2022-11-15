import React from 'react';
import { connect } from "react-redux";
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children, isAuthenticated }) {
    return isAuthenticated ? children : <Navigate to="/login" />;
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    };
}

export default connect(mapStateToProps)(PrivateRoute);