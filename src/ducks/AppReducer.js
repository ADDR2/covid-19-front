import axios from 'axios';

const actions = {
    create: 'APP_CREATE',
    update: 'APP_UPDATE',
    clear: 'APP_CLEAR'
};

export const create = payload => {
    return {
        type: actions.create,
        payload
    };
};

export const update = payload => {
    return {
        type: actions.update,
        payload
    };
};

export const clear = () => {
    return {
        type: actions.clear
    };
};

export const fetchData = () => async dispatch => {
    try {
        const options = {
            headers: {
                origin: 'https://www.arcgis.com',
                referer: 'https://www.arcgis.com/apps/opsdashboard/index.html'
            }
        };

        const { data: { features } } = await axios.get(
            process.env.REACT_APP_FETCH_BY_COUNTRY,
            options
        );

        dispatch(update({
            regions: features.map(({ attributes }) => ({ ...attributes }))
        }));

        const { data: { features: [ { attributes: { value: confirmed } } ] } } = await axios.get(
            process.env.REACT_APP_FETCH_CONFIRMED,
            options
        );

        dispatch(update({
            confirmed
        }));

        const { data: { features: [ { attributes: { value: deaths } } ] } } = await axios.get(
            process.env.REACT_APP_FETCH_DEATHS,
            options
        );

        dispatch(update({
            deaths
        }));

        const { data: { features: [ { attributes: { value: recovered } } ] } } = await axios.get(
            process.env.REACT_APP_FETCH_RECOVERED,
            options
        );

        dispatch(update({
            recovered
        }));

        const { data: { features: [ { attributes: { value: active } } ] } } = await axios.get(
            process.env.REACT_APP_FETCH_ACTIVE,
            options
        );

        dispatch(update({
            active
        }));

        return true;
    } catch(error) {
        console.warn(error);
        return false;
    }
}
  

const initialState = {
    regions: [],
    confirmed: 0,
    deaths: 0,
    recovered: 0,
    active: 0,
    currentTab: 'Home'
};

export default (state = initialState, action) => {
    switch (action.type) {
        case actions.create: return action.payload;
        case actions.update: return { ...state, ...action.payload };
        case actions.clear: return initialState;
        default: return state;
    }
};