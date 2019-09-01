import React, { Component } from 'react';
import axios from 'axios';

export default class Pokemon extends Component {
  state = {
    name: '',
    pokemonIndex: '',
    imageUrl: '',
    types: [],
    description: '',
    stats: {
      hp: '',
      attack: '',
      defense: '',
      speed: '',
      specialAttack: '',
      specialDefense: '',
    },
    height: '',
    weight: '',
    eggGroup: '',
    abilities: '',
    genderRationMale: '',
    genderRatioFemale: '',
    evs: '',
    hatchSteps: '',
  };
  async componentDidMount() {
    const { pokemonIndex } = this.props.match.params;

    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;
    const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`;
    const pokemonRes = await axios.get(pokemonUrl);
    const name = pokemonRes.data.name;
    const imageUrl = pokemonRes.data.sprites.front_default;
    let { hp, attack, defense, speed, specialAttack, specialDefense } = '';
    pokemonRes.data.stats.map((stat) => {
      switch (stat.stat.name) {
        case 'hp':
          hp = stat['base_stat'];
          break;
        case 'attack':
          attack = stat['base_stat'];
          break;
        case 'defense':
          defense = stat['base_stat'];
          break;
        case 'speed':
          speed = stat['base_stat'];
          break;
        case 'special-attack':
          specialAttack = stat['base_stat'];
          break;
        case 'special-defense':
          specialDefense = stat['base_stat'];
          break;
        default:
          break;
      }
    });

    const height =
      Math.round((pokemonRes.data.height * 0.328084 + 0.00001) * 100) / 100;
    const weight =
      Math.round((pokemonRes.data.weight * 0.220462 + 0.00001) * 100) / 100;

    const types = pokemonRes.data.types.map((type) => type.type.name);
    const abilities = pokemonRes.data.abilities
      .map((ability) => {
        return ability.ability.name
          .toLowerCase()
          .split('-')
          .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
          .join(' ');
      })
      .join(', ');

    const evs = pokemonRes.data.stats
      .filter((stat) => {
        if (stat.effort > 0) {
          return true;
        }
        return false;
      })
      .map((stat) => {
        return `${stat.effort} ${stat.stat.name
          .toLowerCase()
          .split('-')
          .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
          .join(' ')}`;
      })
      .join(', ');

    await axios.get(pokemonSpeciesUrl).then((res) => {
      let description = '';
      res.data.flavor_text_entries.some((flavor) => {
        if (flavor.language.name === 'en') {
          description = flavor.flavor_text;
          return;
        }
      });
      const femaleRate = res.data['gender_rate'];
      const genderRatioFemale = 12.5 * femaleRate;
      const genderRatioMale = 12.5 * (8 - femaleRate);

      const catchRate = Math.round(100 / 255 * res.data['capture_rate']);

      const eggGroups = res.data['egg_groups']
        .map((group) => {
          return group.name
            .toLowerCase()
            .split(' ')
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
        })
        .join(', ');

      const hatchSteps = 255 * (res.data['hatch_counter'] + 1);

      this.setState({
        description,
        genderRatioFemale,
        genderRatioMale,
        catchRate,
        eggGroups,
        hatchSteps,
      });
    });

    this.setState({
      imageUrl,
      pokemonIndex,
      name,
      types,
      stats: {
        hp,
        attack,
        defense,
        speed,
        specialAttack,
        specialDefense,
      },

      height,
      weight,
      abilities,
      evs,
    });
  }
  render() {
    return (
      <div className="col">
        <div className="card">
          <div className="card-header colorear">
            <div className="row">
              <div className="col-5">
                <h5>{this.state.pokemonIndex}</h5>
              </div>
              <div className="col-7">
                <div className="float-right">
                  {this.state.types.map((type) => (
                    <span key={type} className="hierva">
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="row align-items-center">
              <div className="col-md-3">
                <img
                  src={this.state.imageUrl}
                  className="card-img-top imagen2 rounded mx-auto mt-2"
                />
              </div>
              <div className="col-md-9 infor">
                <h2 className="mx-auto nombrepo text-center ">
                  {this.state.name
                    .toLowerCase()
                    .split(' ')
                    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                    .join(' ')}
                </h2>

                <div className="row align-items-center">
                  <div className="col-12 col-md-3">
                    <h4 className="card-title text-center">
                      Perfil de Pokemon
                    </h4>
                    <div className="row">
                      <div className="col-6">
                        <h5 className="float-right">Altura:</h5>
                      </div>
                      <div className="col-6">
                        <h5 className="float-left">{this.state.height}</h5>
                      </div>
                      <div className="col-6">
                        <h5 className="float-right">Peso:</h5>
                      </div>
                      <div className="col-6">
                        <h5 className="float-left">{this.state.weight} lbs</h5>
                      </div>
                      <div className="col-6">
                        <h5 className="float-right">Captura</h5>
                      </div>
                      <div className="col-6">
                        <h5 className="float-left">{this.state.catchRate}%</h5>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-md-9">
                    <h4 className="card-title text-center">
                      Habilidades de Pokemon
                    </h4>
                    <div className="row">
                      <div className="col-6">
                        <h5 className="float-right">Grupo Pokemon:</h5>
                      </div>
                      <div className="col-6">
                        <h5 className="float-left">{this.state.eggGroups} </h5>
                      </div>
                      <div className="col-6">
                        <h5 className="float-right">Pasos encontrados:</h5>
                      </div>
                      <div className="col-6">
                        <h5 className="float-left">{this.state.hatchSteps}</h5>
                      </div>
                      <div className="col-6">
                        <h5 className="float-right">Habilidades:</h5>
                      </div>
                      <div className="col-6">
                        <h5 className="float-left">{this.state.abilities}</h5>
                      </div>
                      <div className="col-6">
                        <h5 className="float-right">Ataque especial:</h5>
                      </div>
                      <div className="col-6">
                        <h5 className="float-left">{this.state.evs}</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer">
            <div className="row">
              <div className="mt-1">
                <div className="col">
                  <p className="descri">{this.state.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
