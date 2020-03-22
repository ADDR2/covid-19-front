import React from 'react';
import { connect } from 'react-redux';

// ICONS
import { FaSearch } from 'react-icons/fa';

// STYLES
import './ByCountry.scss';

const ByCountry = ({ regions }) => {
    const [ currentFilter, changeFilter ] = React.useState('');
    const parsedFilter = currentFilter.trim().toLowerCase();
    const filteredRegions = currentFilter ?
        regions.filter(({ Country_Region }) => Country_Region.toLowerCase().includes(parsedFilter))
    :
        regions
    ;


    return (
        <div className="by-country-container">
            <div className="searcher">
                <FaSearch className="searcher-icon" />
                <input
                    className="searcher-input"
                    value={currentFilter}
                    onChange={({ target: { value } }) => changeFilter(value)}
                />
            </div>
            {
                filteredRegions.map(
                    (
                        { Country_Region, Last_Update, Confirmed, Deaths, Recovered, Active },
                        index
                    ) => {
                        const date = new Date(Last_Update);

                        return (
                            <div
                                className="country-item"
                                key={`by-country-item-${index}`}
                            >
                                <h3 className="country-name">{ Country_Region }</h3>

                                <div className="country-values">
                                    <p className="country-value active"><b>Active:</b> { Active.applyComas() }</p>
                                    <p className="country-value confirmed"><b>Confirmed:</b> { Confirmed.applyComas() }</p>
                                    <p className="country-value"><b>Deaths:</b> { Deaths.applyComas() }</p>
                                    <p className="country-value recovered"><b>Recovered:</b> { Recovered.applyComas() }</p>
                                </div>

                                <p
                                    className="country-update"
                                ><b>Last Update:</b> { date.toLocaleDateString() } { date.toLocaleTimeString() }</p>
                            </div>
                        );
                    }
                )
            }
        </div>
    );
};

const mS = ({ AppReducer }) => ({ ...AppReducer });
const mD = {};
export default connect(mS, mD)(ByCountry);