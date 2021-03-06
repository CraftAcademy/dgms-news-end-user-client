import { createStore } from "redux";
import initialState from "./initialState";
import rootReducer from '../reducers/rootReducer'

const configureStore = () => {
  return createStore(rootReducer, initialState)
}

export default configureStore

