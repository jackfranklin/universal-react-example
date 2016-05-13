import express from 'express';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import bodyParser from 'body-parser';

import { routes } from './routes';

import validateEmailForm from './components/validate-email-form';

const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get('*', (req, res) => {
  // routes is our object of React routes defined above
  match({ routes, location: req.url }, (err, redirectLocation, props) => {
    if (err) {
      // something went badly wrong, so 500 with a message
      res.status(500).send(err.message);
    } else if (redirectLocation) {
      // we matched a ReactRouter redirect, so redirect from the server
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (props) {
      // if we got props, that means we found a valid component to render
      // for the given route
      const markup = renderToString(<RouterContext {...props} />);

      // render `index.ejs`, but pass in the markup we want it to display
      res.render('index', { markup })

    } else {
      // no route match, so 404. In a real app you might render a custom
      // 404 view here
      res.sendStatus(404);
    }
  });
});

app.post('/submit-email-form', (req, res) => {
  const { email } = req.body;
  const result = validateEmailForm(email);

  if (result.valid === true) {
    // here you would save this to a database, or whatever you want
    // db.addEmail(email)

    res.redirect(`/about?success=true&value=${email}`);
  } else {
    res.redirect(`/about?errors=${result.errors.join(',')}&success=false&value=${email}`);
  }
});

app.listen(3003, 'localhost', (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Listening at http://localhost:3003');
});
