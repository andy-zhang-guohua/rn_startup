import React, {Component} from 'react';
import {Alert, Button, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {createStore} from 'redux';
import store from './reduxTest/store';


class ReduxTestScreen extends Component {
    static navigationOptions = {
        title: 'Redux尝试',
    };

    constructor() {
        super();

        this.state = {counter: store.getState()};

        store.subscribe(() => {
                console.log(store.getState());
                this.setState({counter: store.getState()});
            }
        );

    }

    componentDidMount() {

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
                    {store.getState()}
                </Text>
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