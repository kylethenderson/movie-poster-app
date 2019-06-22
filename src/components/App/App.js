import React, { Component } from 'react';
import './App.css';
import { HashRouter as Router, Route } from 'react-router-dom'

// Components
import Header from '../Header/Header'
import MovieList from '../MovieList/MovieList'
import Details from '../Details/Details'
import Edit from '../Edit/Edit'
import Footer from '../Footer/Footer'

class App extends Component {
  // Renders the entire app on the DOM
  render() {
    return (
      <div className="App">
        <Router>
          <Header />
          <Route exact path="/" component={MovieList} />
          <Route exact path="/details" component={Details} />
          <Route exact path="/edit" component={Edit} />
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
