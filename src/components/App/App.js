import React, { Component } from 'react';
import './App.css';

// Components
import Header from '../Header/Header'
import MovieList from '../MovieList/MovieList'

import Footer from '../Footer/Footer'

class App extends Component {
  // Renders the entire app on the DOM
  render() {
    return (
      <div className="App">
        <Header />
        <MovieList />
        <Footer />
      </div>
    );
  }
}

export default App;
