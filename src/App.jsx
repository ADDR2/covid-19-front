import React from 'react';
import {
  withRouter,
  Switch,
  Route
} from "react-router-dom";
import { connect } from 'react-redux';

// CONTAINERS
import Home from './containers/Home';
import ByCountry from './containers/ByCountry';

// ICONS
import { FaGlobe, FaFlag } from 'react-icons/fa';

// SERVICES
import PollHandler from './services/pollerHandler';

// ACTIONS
import { fetchData, update } from './ducks/AppReducer';

import './App.scss';

const App = ({ fetchData, currentTab, update, history }) => {
  const path = history.location.pathname;
  
  React.useEffect(
    () => {
      const poller = new PollHandler(() => {
        fetchData()
          .then(isAllGood => {

          })
          .catch(error => {
            console.warn(error);
          })
        ;
      });

      poller.startPolling();

      return () => {
        poller.stopPolling();
      };
    },
    [ fetchData ]
  );

  React.useEffect(
    () => {
      path === '/by-country' && currentTab !== 'Country' && update({ currentTab: 'Country' });
      path === '/' && currentTab !== 'Home' && update({ currentTab: 'Home' });
    },
    [ path, currentTab, update ]
  );
  
  return (
    <>
      <div className="app-header">
        <h3 className="app-title">COVID 19 status</h3>
      </div>

      <div className="app-content">
        <Switch>
          <Route exact path="/by-country">
            <ByCountry />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </div>

      <div className="app-footer">
        <div
          className={`footer-option ${currentTab === 'Home' ? 'selected' : ''}`}
          onClick={() => {
            if (currentTab !== 'Home') {
              update({ currentTab: 'Home' });
              history.push('/');
            }
          }}
        >
          <FaGlobe className="option-icon" />
          <p className="option-name">Totals</p>
        </div>

        <div
          className={`footer-option ${currentTab === 'Country' ? 'selected' : ''}`}
          onClick={() => {
            if (currentTab !== 'Country') {
              update({ currentTab: 'Country' });
              history.push('/by-country');
            }
          }}
        >
          <FaFlag className="option-icon" />
          <p className="option-name">By Country</p>
        </div>
      </div>
    </>
  );
}

const mS = ({ AppReducer }) => ({ ...AppReducer });
const mD = { fetchData, update };
export default withRouter(connect(mS, mD)(App));
