import React, { Component } from 'react';
import Dimensions from 'Dimensions';
import {
	StyleSheet,
	TouchableOpacity,
	Text,
	Image,
	View,
} from 'react-native';

import spinner from '../../images/loading.gif';

export default class ButtonSubmit extends Component {
	constructor() {
		super();

		this.state = {
			isLoading: false,
		};

		this._onPress = this._onPress.bind(this);

		
	}

	_onPress() {
		if (this.state.isLoading) return;

		this.setState({ isLoading: true });
	}


	render() {
		return (
			<View style={styles.container}>
				<TouchableOpacity
					style={styles.button}
					onPress={this._onPress}
					activeOpacity={1} >
					{this.state.isLoading ?
						<Image source={spinner} style={styles.image} />
						:
						<Text style={styles.text}>登录</Text>
					}
				</TouchableOpacity>
			</View>
		);
	}
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const HEIGHT = 40; // 控件高度
const MARGIN_H = 40;// 水平方向左右两边的边缘宽度
const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	button: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#F035E0',
		height: HEIGHT,
		width: DEVICE_WIDTH - MARGIN_H,
		borderRadius: 20,
		zIndex: 100,
	},
	text: {
		color: 'white',
		backgroundColor: 'transparent',
	},
	image: {
		width: 24,
		height: 24,
	},
});
