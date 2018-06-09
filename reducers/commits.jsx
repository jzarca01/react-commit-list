import { FETCH_COMMITS, DATA_LOADED, FETCH_ERROR } from '../constants/ActionTypes';

const initialState = {
  commits: [],
  isLoading: false,
  isError: false
};

export default function commits(state = initialState, action) {
    switch (action.type) {
        case FETCH_COMMITS:
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        case DATA_LOADED:
            return {
                ...state,
                isLoading: false,
                isError: false,
                commits: action.commits
            }
        case FETCH_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        default:
            return state;
    }
  }
  