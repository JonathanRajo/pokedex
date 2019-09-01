import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import spinner from '../pokemon/126.gif';

const Sprite = styled.img`
  width: 18em;
  height: 18em;
  display: none;
`;
const Card = styled.div`
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
  -moz-user-select: none;
  -website-user-select: none;
  user-select: none;
  -o-user-select: none;
`;
const StyledLink = styled(Link)`
  text-decoration: none;
  color: black; 
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active{
    text-decoration: none;
  }
`;

export default class PokemonCard extends Component {
  state = {
    name: '',
    imageUrl: '',
    pokemonIndex: '',
  };

  componentDidMount() {
    const name = this.props.name;
    const url = this.props.url;
    const pokemonIndex = url.split('/')[url.split('/').length - 2];
    const imageUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`;
    this.setState({
      name,
      imageUrl,
      pokemonIndex,
      imageLoading: true,
      toManyRequests: false,
    });
  }
  render() {
    return (
      <div className="col-md-3 col-sm-6 mb-5">
        <StyledLink to={`pokemon/${this.state.pokemonIndex}`}>
          <Card className="card">
            <h5 className="card-header d-flex justify-content-end">
              {this.state.pokemonIndex}
            </h5>
            {this.state.imageLoading ? (
              <img
                src={spinner}
                style={{ width: '5em', height: '5em' }}
                className="card-img-top rounded mx-auto d-block mt-2"
              />
            ) : null}
            <Sprite
              className="card-img-top rounded mx-auto mt-2"
              onError={() => this.state({ toManyRequests: true })}
              onLoad={() => this.setState({ imageLoading: false })}
              src={this.state.imageUrl}
              style={
                this.state.toManyRequests ? (
                  { display: 'none' }
                ) : this.state.imageLoading ? null : (
                  { display: 'block' }
                )
              }
            />
            {this.state.toManyRequests ? (
              <h6 className="mx-auto">
                <span className="badge badge-danger mt-2">
                  Muchas solicitudes
                </span>
              </h6>
            ) : null}
            <div className="card-body">
              <h2 className="card-title text-center mx-auto">
                {this.state.name
                  .toLowerCase()
                  .split('')
                  .map(
                    (letter) =>
                      letter.charAt(0).toUpperCase() + letter.substring(1)
                  )
                  .join('')}
              </h2>
            </div>
          </Card>
        </StyledLink>
      </div>
    );
  }
}
