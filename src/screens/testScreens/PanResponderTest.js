'use strict';

import React, {Component} from 'react';
import {Alert, PanResponder, StyleSheet, Text, TouchableOpacity, View} from 'react-native';


/**
 * 参考 : https://github.com/jabez128/jabez128.github.io/issues/1
 */
class PanResponderTestScreen extends Component {
    static navigationOptions = {
        title: 'PanResponder有关测试',
    };

    constructor() {
        super();

        this.state = {
            backgroundColor: 'white',
            top: 0,
            left: 0
        };
    }


    componentWillMount() {
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                this._top = this.state.top
                this._left = this.state.left
                this.setState({backgroundColor: 'red'})
            },
            onPanResponderMove: (event, gestures) => {
                console.log(gestures.dx + ' ' + gestures.dy)
                this.setState({
                    top: this._top + gestures.dy,
                    left: this._left + gestures.dx
                })
            },
            onPanResponderRelease: (event, gestures) => {
                this.setState({
                    backgroundColor: 'white',
                    top: this._top + gestures.dy,
                    left: this._left + gestures.dx
                })
            }
        })
    }


    render() {
        return (
            <View style={styles.container}>
                <View
                    {...this._panResponder.panHandlers}
                    style={[styles.rect, {
                        "backgroundColor": this.state.backgroundColor,
                        "top": this.state.top,
                        "left": this.state.left
                    }]}></View>
            </View>
        );

    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    rect: {
        width: 100,
        height: 100,
        borderWidth: 1,
        borderRadius: 50,
        borderColor: 'black',
        position: 'absolute',
    }
});

export default PanResponderTestScreen;
