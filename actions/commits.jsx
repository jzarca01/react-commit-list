import * as types from '../constants/ActionTypes';
import axios from 'axios';
import idx from 'idx';

export function fetchingCommits() {
  return { type: types.FETCH_COMMITS };
}

export function fetchHasErrored() {
  return { type: types.FETCH_ERROR }
}

export function loadData(url) {
  return dispatch => {
    dispatch(fetchingCommits())
    return axios.get(url, { responseType: 'json' })
        .then(response => response.data)
        .then(data => data.map(commit => sanitizeData(commit)))
        .then(data => dispatch(dataLoaded(data)))
        .catch(err => {
          console.log(err)
          return dispatch(fetchHasErrored())
        })
    };
}


function sanitizeData(commit) {
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

export function dataLoaded(items) {
  return {
    type: types.DATA_LOADED,
    commits : items
  }
}

export function filterByName(name) {
  return {
    type: types.FILTER_NAME,
    searchTerm: name
  }
}

export function filterByDate(date) {
  return {
    type: types.FILTER_DATE,
    searchTerm: date
  }
}

export function resetFilter() {
  return {
    type: types.RESET_FILTER
  }
}