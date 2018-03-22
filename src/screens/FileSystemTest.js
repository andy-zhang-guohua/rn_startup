import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    Button,
    View,
    Alert,
} from 'react-native';

import RNFetchBlob from 'react-native-fetch-blob'
import {log} from '../utils/LogUtils'


class FileSystemTestScreen extends Component {
    static navigationOptions = {
        title: '文件系统有关测试',
    };

    constructor() {
        super();

        this.state = {};
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    你也可以
                </Text>
            </View>
        );
    }
}

export default FileSystemTestScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        margin: 10,
    },
});