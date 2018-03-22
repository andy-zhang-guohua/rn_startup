import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Alert,
    TouchableOpacity
} from 'react-native';

import * as PasswordUtils from '../utils/PasswordUtils'
import {log} from '../utils/LogUtils'
import {userService} from '../services/UserService'
import {appPreference} from '../services/AppPreferenceService'

class TestEntryScreen extends Component {
    static navigationOptions = {
        title: '测试入口',
    };

    constructor() {
        super();

        this.state = {};
        this._gotoFileSystemTestScreen = this._gotoFileSystemTestScreen.bind(this);
        this._gotoAnimationTestScreen = this._gotoAnimationTestScreen.bind(this);
    }


    _gotoFileSystemTestScreen() {
        this.props.navigation.navigate('FileSystemTest');
    }

    _gotoAnimationTestScreen() {
        this.props.navigation.navigate('AnimationTest');
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this._gotoFileSystemTestScreen} style={styles.button}>
                    <Text style={styles.buttonText}>
                        文件系统
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this._gotoAnimationTestScreen} style={styles.button}>
                    <Text style={styles.buttonText}>
                        动画效果
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default TestEntryScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        margin: 10,
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