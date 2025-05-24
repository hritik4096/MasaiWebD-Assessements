import { createStore } from 'redux';
import counterReducer from './reducer.js';

const store = createStore(counterReducer);

export default store;
