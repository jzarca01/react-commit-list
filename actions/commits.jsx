import * as types from '../constants/ActionTypes';
import axios from 'axios';

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
        .then(response => dispatch(dataLoaded(response.data)))
        .catch(err => dispatch(fetchHasErrored()))
    };
}

export function dataLoaded(items) {
  return {
    type: types.DATA_LOADED,
    commits : items
  }
}