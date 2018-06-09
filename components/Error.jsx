import React, { Component } from 'react';

export default class ErrorComponent extends Component {
  render() {
    return (
      <div className="Error">
        <p>Oops... Le chargement a échoué.</p>
      </div>
    );
  }
}