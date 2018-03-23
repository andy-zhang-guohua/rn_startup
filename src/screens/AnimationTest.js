import React, {Component} from 'react';
import {Alert, Animated, Button, Easing, Image, StyleSheet, Text, TouchableOpacity, View,StatusBar} from 'react-native';

/**
 * 参考文档 : http://www.alloyteam.com/2016/01/reactnative-animated/
 */
class AnimationTestScreen extends Component {
    static navigationOptions = {
        title: '动画测试',
    };

    constructor() {
        super();

        this.state = {
            fadeInOpacity: new Animated.Value(0),
            rotation: new Animated.Value(0),
            fontSize: new Animated.Value(0),
            bounceValue: new Animated.Value(0),
        };

        this._restart = this._restart.bind(this);
    }

    componentDidMount() {
        this._restart();

        this.state.bounceValue.setValue(2);     // 设置一个较大的初始值
        Animated.spring(                          // 可选的基本动画类型: spring, decay, timing
            this.state.bounceValue,                 // 将`bounceValue`值动画化
            {
                toValue: 0.8,                         // 将其值以动画的形式改到一个较小值
                friction: 1,                          // Bouncier spring
            }
        ).start();                                // 开始执行动画
    }

    _restart() {
        this.setState({
            fadeInOpacity: new Animated.Value(0),
            rotation: new Animated.Value(0),
            fontSize: new Animated.Value(0)
        });

        setTimeout(() =>
            Animated.parallel(['fadeInOpacity', 'rotation', 'fontSize'].map(property => {
                return Animated.timing(this.state[property], {
                    toValue: 1,
                    duration: 1000,
                    easing: Easing.linear
                });
            })).start(), 0);
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this._restart} style={{flex: 1}} >
                    <Animated.View style={[styles.demo, {
                        opacity: this.state.fadeInOpacity,
                        transform: [{
                            rotateZ: this.state.rotation.interpolate({
                                inputRange: [0, 1],
                                outputRange: ['0deg', '1080deg']
                            })
                        }]
                    }]}><Animated.Text style={{
                        fontSize: this.state.fontSize.interpolate({
                            inputRange: [0, 1],
                            outputRange: [8, 24]
                        })
                    }}>我骑着七彩祥云出现了😈💨</Animated.Text>
                    </Animated.View>
                </TouchableOpacity>
                <Animated.Image style={{flex: 1}}                 // 可选的基本组件类型: Image, Text, View
                                source={require('../images/logo.png')}
                                style={{
                                    flex: 1,
                                    transform: [                        // `transform`是一个有序数组（动画按顺序执行）
                                        {scale: this.state.bounceValue},  // 将`bounceValue`赋值给 `scale`
                                    ]
                                }}
                />
            </View>
        );
    }
}

export default AnimationTestScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        margin: 10,
    },
    demo: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
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