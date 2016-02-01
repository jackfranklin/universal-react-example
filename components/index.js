import React from 'react';

export default class IndexComponent extends React.Component {

  static loadProps(params, cb) {
    fetch('https://api.github.com/users/jackfranklin').then((data) => {
      return data.json();
    }).then((github) => {
      cb(null, { github });
    }).catch((e) => {
      cb(e);
    });
  };

  render() {
    const { github } = this.props;

    return (
      <div>
        <p>This is the index page</p>

        <h3>My GitHub Stats</h3>
        <ul>
          <li>Username: { github.login }</li>
          <li>Repos: { github.public_repos }</li>
        </ul>
      </div>
    );
  }
}
