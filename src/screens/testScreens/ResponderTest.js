'use strict';

import React, {Component} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';


/**
 * 参考 : https://github.com/jabez128/jabez128.github.io/issues/1
 */
class ResponderTestScreen extends Component {
    static navigationOptions = {
        title: 'Responder有关测试',
    };

    constructor() {
        super();

        this.state = {
            backgroundOuterRect: 'white',
            backgroundInnerRect: 'white'
        };
    }


    componentWillMount() {
        this._gestureHandlersOuterRect = {
            // 注意点1 : 如果以下两句放在外层矩形，则内部矩形的手势响应会被屏幕
            // ---->
            //onStartShouldSetResponderCapture: () => true,
            //onMoveShouldSetResponderCapture: ()=> true,
            // <------
            onStartShouldSetResponder: () => true,

            // 注意点2 : 如果这里设置为 true, 在内部区域移动时，外部区域也会变红，并且触摸移动时
            // 外部矩形的 onResponderMove 会执行，而内部矩形的 onResponderMove 不会被执行;
            // 如果这里设置为 false, 在内部区域移动时,外部区域不受影响，内部矩形的 onResponderMove 会被执行;
            onMoveShouldSetResponder: () => false,
            onResponderGrant: () => {
                console.log("外部矩形:触摸开始")
                this.setState({backgroundOuterRect: 'red'})
            },
            onResponderMove: () => {
                console.log("外部矩形:正在触摸移动")
            },
            onResponderRelease: () => {
                // 一旦该元素捕捉到触摸并且不会被抢走，在该元素区域内/外释放都会导致该回调执行，
                // 如果被触摸响应被抢走则该元素的此触摸释放回调不会被执行
                console.log("外部矩形:触摸释放")
                this.setState({backgroundOuterRect: 'white'})
            },
        }
        this._gestureHandlersInnerRect = {
            onStartShouldSetResponder: () => true,
            onMoveShouldSetResponder: () => true,
            onResponderGrant: () => {
                console.log("内部矩形:触摸开始")
                this.setState({backgroundInnerRect: 'green'})
            },
            onResponderMove: () => {
                console.log("内部矩形:正在触摸移动")
            },
            onResponderRelease: () => {
                // 一旦该元素捕捉到触摸并且不会被抢走，在该元素区域内/外释放都会导致该回调执行,
                // 如果被触摸响应被抢走则该元素的此触摸释放回调不会被执行
                console.log("内部矩形:触摸释放")
                this.setState({backgroundInnerRect: 'white'})
            }
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <View
                    {...this._gestureHandlersOuterRect}
                    style={[styles.rectOuter, {
                        "backgroundColor": this.state.backgroundOuterRect
                    }]}>
                    <View
                        {...this._gestureHandlersInnerRect}
                        style={[styles.rectInner, {
                            "backgroundColor": this.state.backgroundInnerRect
                        }]}
                    >

                    </View>
                </View>
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
    rectOuter: {
        width: 200,
        height: 200,
        borderWidth: 1,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    rectInner: {
        width: 100,
        height: 100,
        borderWidth: 1,
        borderColor: 'black'
    }
});

export default ResponderTestScreen;
