import React, { Component } from 'react';

import './App.css';

class App extends Component {
  state={
    open: false
  }
  handlePersonFetchClick = () => {
    this.props.fetchStarWarsRequest();
    this.setState({open:true})
  }

  handlePlanetsFetchClick = () => {
    this.props.fetchStarWarsPlanetsRequest();
  }

  handleConfirmClick = () => {
    this.props.confirmFetchRequest();
    this.setState({open:false})
  }
  render() {
    return (
      <div>
        <h1>Redux Saga</h1>
        <div>
          <h2>People of Star Wars</h2>
          {
            this.props.starWars.people.map(
              (person, i) => <h4 key={i}>{person.name}</h4>
            )
          }
        </div>
        <div>
          <h2>Planets of Star Wars</h2>
          {
            this.props.starWars.planets.map(
              (planet, i) => <h4 key={i}>{planet.name}</h4>
            )
          }
        </div>
        {/* used for modal now only in index-notes.js
        <div>
          <div
            style={!this.state.open ? {display:'none'} : {}} 
            className="modal">
            <button onClick={this.handleConfirmClick}>Confirm</button>
          </div>
        </div>
        */}
        <button onClick={this.handlePersonFetchClick}>Load More People</button>
        <button onClick={this.handlePlanetsFetchClick}>Load More Planets</button>
      </div>
    );
  }
}

export default App;
