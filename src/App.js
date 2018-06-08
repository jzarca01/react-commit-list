import React, { Component } from 'react';
import axios from 'axios';
import idx from 'idx';
import logo from './logo.svg';
import './App.css';
import config from './config'

import CircularProgress from '@material-ui/core/CircularProgress';
import ErrorComponent from './Components/error-component'
import CommitComponent from './Components/commit-component';

class App extends Component {

  constructor() {
    super()
    this.state = {
      isLoading: false,
      isError: false,
      result: null,
    }
  }

  async fetchGithub() {
    return await axios.get(config.urlToFetch)
  }

  async componentDidMount() {
    try {
      this.setState({isLoading: true})
      const response = await this.fetchGithub()
      this.setState({isLoading: false, result: response.data.map(el => this.sanitizeData(el))})
    }
    catch(err) {
      this.setState({isLoading: false, isError: true})
    }
  }

  sanitizeData(commit) {
    return {
      "author": {
        "login": idx(commit, _ => _.author.login),
        "profile_url": idx(commit, _ => _.author.html_url),
        "image": idx(commit, _ => _.author.avatar_url),
        "name": idx(commit, _ => _.commit.author.name),
        "email": idx(commit, _ => _.commit.author.email)
      },
      "commit": {
        "date": commit.commit.author.date,
        "message": commit.commit.message,
        "url": commit.commit.url
      }
    }
  }

  createList(result) {
    return result.map((commit, index) => <CommitComponent key={index} commit={commit} />)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to the Linux Commit List</h1>
        </header>
        <div>
          {this.state.isLoading && <CircularProgress />}
          {this.state.isError && <ErrorComponent />}
          {this.state.result && this.createList(this.state.result)}
        </div>
      </div>
    );
  }
}

export default App;
