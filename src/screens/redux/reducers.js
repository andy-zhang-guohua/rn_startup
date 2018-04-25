import {combineReducers} from 'redux'

/**
 * 管理用户名的 reducer, 所管理状态类型为基本数据类型:string
 * @param state 该reducer开始执行时的状态，初始/缺省为零长度字符串
 * @param action
 * @returns {string} 如果发生改动，返回新的状态对象，否则返回原状态对象
 */
function userReducer(state = "", action) {
    if (typeof action === 'undefined') {
        return state;
    }

    switch (action.type) {
        case 'SET_USERNAME':
            // 返回新的状态对象
            return action.userName;
        case 'CLEAR_USERNAME':
            // 返回新的状态对象
            return "";
        default:
            // 没有改动发生，返回原状态对象
            return state;
    }
}

/**
 * 管理计数器的 reducer, 所管理状态类型为对象数据结构: {value: number, updateTime: Date}
 * @param state 该reducer开始执行时的状态，初始/缺省为 {value: 0, updateTime: new Date()}
 * @param action
 * @returns {{value: number, updateTime: Date}} 如果发生改动，返回新的状态对象，否则返回原状态对象
 */
function counterReducer(state = {value: 0, updateTime: new Date()}, action) {
    if (typeof action === 'undefined') {
        return state;
    }

    const value = state.value;
    const now = new Date();
    switch (action.type) {
        case 'INCREMENT':
            // 构造新的状态对象并返回
            return {...state, value: value + 1, updateTime: now};
        case 'DECREMENT':
            // 构造新的状态对象并返回
            return {...state, value: value - 1, updateTime: now};
        default:
            // 没有改动发生，返回原状态对象
            return state;
    }
}

const combinedReducer = combineReducers({
    counter: counterReducer,
    user: userReducer,
});

export default combinedReducer;