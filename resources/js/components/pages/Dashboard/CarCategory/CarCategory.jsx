import React, { useState, useEffect } from 'react'
import styled, { withTheme } from "styled-components";
import { connect } from "react-redux";
import { fetchCarCategories, deleteCarCategory, setCurrentCarCategory } from "../../../../redux/carCategory/actions";
import CarCategoryTableContainer from "./CarCategoryTableContainer";
import { dimensions } from '../../../helper';
import CarCategoryFormContainer from './CarCategoryFormContainer';
import CardContainer from '../Common/CardContainer';


const Container = styled.div`
    width: 100%;
`;



function CarCategory({ setCurrentCarCategory, data, meta, loading, fetchCarCategories, deleteCarCategory, current }) {
    const [filters, setFilters] = useState({});
    const [visible, setVisible] = useState(false)
    const [edit, setEdit] = useState(false);

    const handleFilters = (aFilters) => {
        setFilters({ ...filters, ...aFilters });
    }

    useEffect(() => {
        fetchCarCategories(1, filters);
    }, [filters])

    const handlePageChange = (pagination) => {
        fetchCarCategories(pagination.current, filters);
    }

    const handleUpdateClick = (row) => {
        setVisible(true);
        setEdit(true);
        setCurrentCarCategory(row);
    }

    const handleCreateClick = () => {
        setVisible(true);
        setEdit(false);
        setCurrentCarCategory({});
        
    }


    return (

        <Container>
            <CardContainer text="Categorias">

                <CarCategoryTableContainer
                    data={data}
                    loading={loading}
                    onDelete={deleteCarCategory}
                    setVisible={setVisible}
                    handlePageChange={handlePageChange}
                    handleUpdateClick={handleUpdateClick}
                    handleCreateClick={handleCreateClick}
                    handleFilters={handleFilters}
                    meta={meta}
                />

                <CarCategoryFormContainer
                    visible={visible}
                    handleClose={() => setVisible(false)}
                    current={current}
                    edit={edit}
                />
            </CardContainer>
        </Container>


    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCarCategories: (page, filters) => dispatch(fetchCarCategories(page, filters)),
        deleteCarCategory: (id) => dispatch(deleteCarCategory(id)),
        setCurrentCarCategory: (row) => dispatch(setCurrentCarCategory(row)),
    };
};

const mapStateToProps = (state) => {
    return {
        loading: state.carCategory.loading,
        data: state.carCategory.data,
        meta: state.carCategory.meta,
        current: state.carCategory.current,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(CarCategory));