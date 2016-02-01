import React from 'react';
import AsyncProps from 'async-props';
import 'isomorphic-fetch';

import ReactDOM from 'react-dom';
import { Router } from 'react-router';

import { routes } from './routes';

import createBrowserHistory from 'history/lib/createBrowserHistory';

ReactDOM.render(
  <Router
    routes={routes}
    history={createBrowserHistory()}
    RoutingContext={AsyncProps} />,
  document.getElementById('app')
)
