import React from 'react';
import { connect } from 'react-redux';

// STYLES
import './Home.scss';

const Home = ({ confirmed, active, deaths, recovered }) => {
    return (
        <div className="home-container">
            <div className="app-total-container">
                <h4 className="app-total-value active"><b>Active:</b> {active.applyComas()}</h4>
            </div>

            <div className="app-total-container">
                <h4 className="app-total-value confirmed"><b>Confirmed:</b> {confirmed.applyComas()}</h4>
            </div>

            <div className="app-total-container">
                <h4 className="app-total-value">Deaths: {deaths.applyComas()}</h4>
            </div>

            <div className="app-total-container">
                <h4 className="app-total-value recovered"><b>Recovered:</b> {recovered.applyComas()}</h4>
            </div>
        </div>
    );
};

const mS = ({ AppReducer }) => ({ ...AppReducer });
const mD = {};
export default connect(mS, mD)(Home);