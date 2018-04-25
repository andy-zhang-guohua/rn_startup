import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import store from './redux/store';


class ReduxTestScreen extends Component {
    static navigationOptions = {
        title: '使用Redux',
    };

    constructor(props) {
        super(props);

        // 使用store中的状态初始化该组件的本地状态
        const state = store.getState();
        this.state = {counter: state.counter.value, userName: state.user};

        const changeListener = () => {
            // 当 store 中的状态发生变化时，
            // 将 store 中的新状态通过this.setState 设置到本组件,
            // 从而触发本组件被重新渲染输出
            console.log("in subscribe():");
            console.log(store.getState());

            const state = store.getState();
            this.setState({counter: state.counter.value, userName: state.user});
        };
        store.subscribe(changeListener);
    }


    componentDidMount() {

    }

    /**
     * 向 store 发送dispatch 指令action,将状态变量用户名 userName 设置为 TOM
     * @private
     */
    _setUserNameTOM() {
        store.dispatch({type: 'SET_USERNAME', userName: 'TOM'});
    }

    /**
     * 向 store 发送dispatch 指令action,将状态变量用户名 userName 设置为 ''
     * @private
     */
    _clearUserName() {
        store.dispatch({type: 'CLEAR_USERNAME'});
    }

    /**
     * 向 store 发送dispatch 指令action,将状态变量计数器 counter 增加 1
     * @private
     */
    _increaseCounterBy1() {
        store.dispatch({type: 'INCREMENT'});
    }

    /**
     * 向 store 发送dispatch 指令action,将状态变量计数器 counter 减少 1
     * @private
     */
    _decreaseCounterBy1() {
        store.dispatch({type: 'DECREMENT'});
    }

    render() {
        const output = this.state.userName ? this.state.userName + ":" + this.state.counter : this.state.counter;
        return (
            <View style={styles.container}>
                <Text style={styles.outputText}>
                    {output}
                </Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={this._setUserNameTOM} style={styles.button}>
                        <Text style={styles.buttonText}>
                            设置用户名
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._clearUserName} style={styles.button}>
                        <Text style={styles.buttonText}>
                            清除用户名
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={this._increaseCounterBy1} style={styles.button}>
                        <Text style={styles.buttonText}>
                            +1
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._decreaseCounterBy1} style={styles.button}>
                        <Text style={styles.buttonText}>
                            -1
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default ReduxTestScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        margin: 0,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        margin: 0,
    },
    button: {
        height: 20,
        alignItems: 'center',
        justifyContent: `center`,
        backgroundColor: 'blue',
        padding: 4,
        margin: 8
    },
    outputText: {
        fontSize: 60,
        fontWeight: 'bold',
        textAlign: 'center',
        color: `#f00`
    },
    buttonText: {
        fontSize: 14,
        textAlign: 'center',
        color: `#fff`
    },
});