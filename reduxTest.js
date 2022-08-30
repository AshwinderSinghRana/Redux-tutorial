import redux from "redux";
import axios from "axios";
import thunk from "redux-thunk";
import { applyMiddleware } from "redux";

const Thunk = thunk.default;

//action
const FETCH_REQUEST = "FETCH_REQUEST";
const FETCH_SUCCESS = "FETCH_SUCCES";
const FETCH_FAILURE = "FETCH_FAILURE";

//ACTION CREATOR

function fetchRequest() {
  return {
    type: FETCH_REQUEST,
  };
}
function fetchSuccess(user) {
  return {
    type: FETCH_SUCCESS,
    payload: user.data,
  };
}
function fetchFailure(err) {
  return {
    type: FETCH_FAILURE,
    payload: err.message,
  };
}

//get users
function getUsers() {
  return function (dispatch) {
    dispatch(fetchRequest());
    axios("https://jsonplaceholder.typicode.com/users")
      .then((user) => dispatch(fetchSuccess(user)))
      .catch((err) => dispatch(fetchFailure(err)));
  };
}

//initial state

const initialState = {
  loading: true,
  users: [],
  error: "",
};

//reducer

function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_REQUEST:
      return { ...state, loading: true };
    case FETCH_SUCCESS:
      return { ...state, loading: false, users: action.payload };
    case FETCH_FAILURE:
      return { ...state, loading: false, users: [], error: action.payload };

    default:
      return state;
  }
}

//store

const store = redux.createStore(reducer, applyMiddleware(Thunk));
store.subscribe(() => {
  console.log(store.getState());
});
store.dispatch(getUsers());
