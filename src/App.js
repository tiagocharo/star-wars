import React, { Component } from 'react';
import './styles/app.css';
import './styles/background.css';

const api = 'https://swapi.co/api';
const options = { 
  method: 'GET',
  headers: {
    'Accept': 'application/json'
  },
  mode: 'no-cors'
}

class App extends Component {

  constructor() {
    super();
    this.state = {
      planets: 0,
      planetName: '',
      population: '',
      climate: '',
      terrain: '',
      featured: 0
    };
  }

  componentWillMount() {
    this.getAllPlanets()
  }

  getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getPlanet() {
    let count = this.getRandom(1, this.state.planets);

    fetch(`${api}/planets/${count}`, {options})
    .then(res => res.json())
    .then(res => {
      console.log(res)
      this.setState({
        planetName: res.name,
        population: res.population,
        climate: res.climate,
        terrain: res.terrain,
        featured: res.films.length
      })
    })
  }

  getAllPlanets() {
    fetch(`${api}/planets`, {options})
    .then(res => res.json())
    .then(data => {
      this.setState({
        planets: data.count
      }, () => this.getPlanet())
    })
  }
  render() {
    let {
      planetName,
      population,
      climate,
      terrain,
      featured
    } = this.state;

    return (
      <React.Fragment>
      <div className="app">
        <div className="box">
        <div className="container-title">
          <h1 className="title">{planetName}</h1>
        </div>
        <p className="population">{`Population: ${population}`}</p>
        <p className="climate">{`Climate: ${climate}`}</p>
        <p className="terrain">{`Terrain: ${terrain}`}</p>
        <p className="featured">{`This planet was featured in ${featured} film(s) `}</p>
        </div>
        <div className="container-button">
          <button 
            className="action-button shadow animate yellow" 
            onClick={() => this.getPlanet()}>NEXT</button>
        </div>
      </div>
      <div id='stars'></div>
      <div id='stars2'></div>
      <div id='stars3'></div>
      </React.Fragment>
    );
  }
}

export default App;
