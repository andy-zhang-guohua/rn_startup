import {combineReducers} from 'redux'

const initialStateCounter = {
    counter: 0,
    updateTime: new Date(),
};

function userReducer(state = '', action) {
    if (typeof action === 'undefined') {
        return state;
    }

    const userName = action.userName;
    switch (action.type) {
        case 'SET_USERNAME':
            if (typeof userName === 'undefined') {
                return state;
            }
            return userName;
        case 'CLEAR_USERNAME':
            return "";
        default:
            return state;
    }
}

function counterReducer(state = initialStateCounter, action) {
    const counter = state.counter;
    const now = new Date();
    switch (action.type) {
        case 'INCREMENT':
            return {...state, counter: counter + 1, updateTime: now};
        case 'DECREMENT':
            return {...state, counter: counter - 1, updateTime: now};
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    counter: counterReducer,
    user: userReducer,
});

export default rootReducer;