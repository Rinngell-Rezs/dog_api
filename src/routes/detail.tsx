import React from 'react';
import { Icon } from '../components/utils/styled_components';
import { Link } from 'react-router-dom';
import DogDetail from '../components/dogdetail/dogdetail';

function Detail() {
    return (
        <>
            <Link to="/home" style={{ textDecoration: 'none', color: 'black', display: 'flex', alignItems: 'center', gap: '0vh', marginBottom: '2vh' }}>
                <Icon className="material-symbols-outlined" style={{ fontSize: '3vh', cursor: 'pointer' }}>arrow_back</Icon>
                <Icon className="material-symbols-outlined" style={{ fontSize: '3vh', cursor: 'pointer' }}>home</Icon>
                <h2>Volver al inicio</h2>
            </Link>
            <DogDetail />
        </>
    )
}

export default Detail
