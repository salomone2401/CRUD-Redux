import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer/index';

const store = createStore(
    reducer,
    compose(applyMiddleware(thunk),
        //a continuacion va el codigo para utilizar redux developer tools

        typeof window === 'object' &&
            typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ?
            window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    )

);

export default store;


