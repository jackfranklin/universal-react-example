import 'isomorphic-fetch';
import express from 'express';
import http from 'http';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RoutingContext } from 'react-router';
import AsyncProps, { loadPropsOnServer } from 'async-props';

import { routes } from './routes';

const app = express();

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('*', (req, res) => {
  match({ routes, location: req.url }, (err, redirectLocation, props) => {
    if (err) {
      res.status(500).send(err.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (props) {
      loadPropsOnServer(props, (err, asyncProps, scriptTag) => {
        const markup = renderToString(<AsyncProps {...props} {...asyncProps} />);
        res.render('index', { markup, scriptTag })
      });

    } else {
      res.sendStatus(404);
    }
  });
});

const server = http.createServer(app);

server.listen(3003);
server.on('listening', () => {
  console.log('Listening on 3003');
});
