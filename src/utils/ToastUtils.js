import Toast from 'react-native-root-toast';
import React, {Component} from 'react';

class ToastUtils extends Component {

    constructor() {
        super()
    }

    show(message) {
        Toast.show(message, {
            duration: Toast.durations.SHORT,
            position: Toast.positions.CENTER,
            shadow: true,
            animation: false,
            hideOnPress: true,
            delay: 0,
            backgroundColor: 'black'
        });
    }

    showAtBottom(message) {
        Toast.show(message, {
            duration: Toast.durations.SHORT,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: false,
            hideOnPress: true,
            delay: 0,
            backgroundColor: 'black'
        });
    }
}

export default toast = new ToastUtils()