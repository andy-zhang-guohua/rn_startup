import React, {Component} from 'react';
import {Alert, Button, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import store from './reduxTest/store';


class ReduxTestScreen extends Component {
    static navigationOptions = {
        title: 'REDUX尝试',
    };

    constructor() {
        super();

        const state = store.getState();
        this.state = {counter: state.counter.counter, userName: state.user};

        store.subscribe(() => {
                console.log("in subscribe():");
                console.log(store.getState());
                const state = store.getState();
                const counter = state.counter.counter;
                const userName = state.user;
                this.setState({counter: counter, userName: userName});
            }
        );

    }


    componentDidMount() {

    }

    _setUserName() {
        store.dispatch({type: 'SET_USERNAME', userName: 'Andy'});
    }

    _clearUserName() {
        store.dispatch({type: 'CLEAR_USERNAME'});
    }

    _increase() {
        store.dispatch({type: 'INCREMENT'});
    }

    _decrease() {
        store.dispatch({type: 'DECREMENT'});
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.number}>
                    {this.state.userName}{this.state.counter}
                </Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={this._setUserName} style={styles.button}>
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
                    <TouchableOpacity onPress={this._increase} style={styles.button}>
                        <Text style={styles.buttonText}>
                            +1
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._decrease} style={styles.button}>
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
        //justifyContent: 'center',
        //alignItems: 'center',
        backgroundColor: '#F5FCFF',
        margin: 0,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        //alignItems: 'center',
        backgroundColor: 'transparent',
        margin: 0,
    },
    button: {
        height: 20,
        alignItems: 'center',
        justifyContent: `center`,
        backgroundColor: 'blue',
        padding: 4,
        margin: 4
    },
    number: {
        fontSize: 60,
        textAlign: 'center',
        color: `#f00`
    },
    buttonText: {
        fontSize: 14,
        textAlign: 'center',
        color: `#fff`
    },
});