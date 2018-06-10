import { FETCH_COMMITS, DATA_LOADED, FETCH_ERROR, FILTER_NAME, FILTER_DATE, RESET_FILTER } from '../constants/ActionTypes';

const initialState = {
  commits: [],
  isLoading: false,
  isError: false,
  filter: {}
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
        case FILTER_NAME:
            return {
                ...state,
                filter: {
                    type: 'name',
                    searchTerm: action.searchTerm
                }
            }
        case FILTER_DATE:
            return {
                ...state,
                filter: {
                    type: 'date',
                    searchTerm: action.searchTerm
                }
            }
        case RESET_FILTER:
            return {
                ...state,
                filter: {}
            }
        default:
            return state;
    }
  }
  