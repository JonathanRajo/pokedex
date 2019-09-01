import React, { Component } from 'react';
import PokemonList from '../pokemon/PokemonLista';

export default class Dashboard extends Component {
  render() {
    return (
      <div className="row">
        <div className="col">
          <PokemonList />
        </div>
      </div>
    );
  }
}
