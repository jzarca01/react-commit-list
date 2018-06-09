import React, { Component, PropTypes } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../components/Header';
import * as CommitsActions from '../actions/commits';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CircularProgress from '@material-ui/core/CircularProgress';

import ListCommits from '../components/ListCommits';
import ErrorComponent from '../components/Error';
import config from '../constants/config';

const defaultStyle = {
  margin: 20
};

class App extends Component {

  componentDidMount() {
    this.props.actions.loadData(config.urlToFetch)
  }

  render() {
    const { commits, actions, isLoading, isError } = this.props;
    return (
      <div>
        <MuiThemeProvider>
          <div>
            <Header />
            <div className="actualBody" style={defaultStyle}>
              {isLoading && <CircularProgress />}
              {isError && <ErrorComponent />}
              {commits.length > 0 && <ListCommits commits={commits} />}
            </div>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

App.propTypes = {
  commits: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return state.commits;
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(CommitsActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
