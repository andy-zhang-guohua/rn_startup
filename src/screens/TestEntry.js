import React, {Component} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

class TestEntryScreen extends Component {
    static navigationOptions = {
        title: '测试入口',
    };

    constructor() {
        super();

        this.state = {};
    }


    _gotoFileSystemTestScreen = () => {
        this.props.navigation.navigate('FileSystemTest');
    }

    _gotoAnimationTestScreen = () => {
        this.props.navigation.navigate('AnimationTest');
    }

    _gotoDropDownMenuTestScreen = () => {
        this.props.navigation.navigate('DropDownMenuTest');
    }

    _gotoScrollableTabViewTestScreen = () => {
        this.props.navigation.navigate('ScrollableTabViewTest');
    }

    _gotoAnimatableTestScreen = () => {
        this.props.navigation.navigate('AnimatableTest');
    }

    _gotoReduxTestScreen = () => {
        this.props.navigation.navigate('ReduxTest');
    }


    _gotoNativeVideoPlayerTestScreen = () => {
        this.props.navigation.navigate('NativeVideoPlayerTest');
    }

    _gotoAFPlayerTestScreen = () => {
        this.props.navigation.navigate('AFVideoPlayerTest');
    }

    _gotoStatusBarTestScreen = () => {
        this.props.navigation.navigate('StatusBarTest');
    }

    _gotoResponderTestScreen = () => {
        this.props.navigation.navigate('ResponderTest');
    }


    _gotoPanResponderTestScreen = () => {
        this.props.navigation.navigate('PanResponderTest');
    }

    _gotoAmap3dTestScreen = () => {
        this.props.navigation.navigate('Amap3dTest');
    }


    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this._gotoFileSystemTestScreen} style={styles.button}>
                    <Text style={styles.buttonText}> 文件系统 </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this._gotoAnimationTestScreen} style={styles.button}>
                    <Text style={styles.buttonText}> RN标准动画效果 </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this._gotoDropDownMenuTestScreen} style={styles.button}>
                    <Text style={styles.buttonText}> 下拉菜单 </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this._gotoScrollableTabViewTestScreen} style={styles.button}>
                    <Text style={styles.buttonText}> 三方 react-native-scrollable-tab-view </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this._gotoAnimatableTestScreen} style={styles.button}>
                    <Text style={styles.buttonText}> 三方 react-native-animatable </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this._gotoReduxTestScreen} style={styles.button}>
                    <Text style={styles.buttonText}> Redux </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this._gotoNativeVideoPlayerTestScreen} style={styles.button}>
                    <Text style={styles.buttonText}> Native Video Player </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this._gotoAFPlayerTestScreen} style={styles.button}>
                    <Text style={styles.buttonText}> AF Video Player </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this._gotoStatusBarTestScreen} style={styles.button}>
                    <Text style={styles.buttonText}> 状态条 </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this._gotoResponderTestScreen} style={styles.button}>
                    <Text style={styles.buttonText}> Responder </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this._gotoPanResponderTestScreen} style={styles.button}>
                    <Text style={styles.buttonText}> PanResponder </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this._gotoAmap3dTestScreen} style={styles.button}>
                    <Text style={styles.buttonText}> 高德地图 </Text>
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
        height: 20,
        alignItems: 'center',
        justifyContent: `center`,
        backgroundColor: 'blue',
        padding: 4,
        margin: 4
    },

    buttonText: {
        fontSize: 14,
        textAlign: 'center',
        color: `#fff`
    },
});