import React, {Component} from 'react';
import {Alert, Button, StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';

import Moment from 'moment';
import RNFetchBlob from 'react-native-fetch-blob'
import {log} from '../utils/LogUtils'


class DropDownMenuTestScreen extends Component {
    static navigationOptions = {
        title: '下拉菜单有关测试',
    };

    constructor() {
        super();

        this.state = {

        };


    }


    componentDidMount() {

    }




    render() {
        return (
            <View style={styles.container}>

            </View>
        );
    }
}

export default DropDownMenuTestScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        margin: 10,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#CCCC00',
        borderColor: `#33f`,
        borderWidth: 0.5,
    },
    report: {
        fontSize: 14,
        textAlign: 'left',
        margin: 10,
        color: `#fff`
    },
    button: {
        alignItems: 'center',
        justifyContent: `center`,
        backgroundColor: '#33f',
        padding: 10,
        margin: 4
    },
    buttonText: {
        fontSize: 20,
        textAlign: 'center',
        color: `#fff`
    },
});