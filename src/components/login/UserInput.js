import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import Dimensions from 'Dimensions';
import {
	StyleSheet,
	View,
	TextInput,
	Image,
} from 'react-native';

import { log } from '../../utils/LogUtils'
import { debuger } from '../../utils/DebugUtils'

export default class UserInput extends Component {
	constructor(props) {
		super(props);

		this._onChangeText = this._onChangeText.bind(this);
		this._onChange = this._onChange.bind(this);
	}

	_onChangeText = (text) => {
		this.props.onChangeText(text);
	};

	_onChange = (e) => {
		// 该方法这里仅用作调试用途，用于输出事件对象e
		debuger.dumpObject(e);
	};

	render() {
		log("输入框组件正在渲染,当前状态：" + JSON.stringify(this.state));
	

		return (
			<View style={styles.inputWrapper}>
				<Image source={this.props.iconSource} style={styles.leadingIcon} />
				<TextInput style={styles.input}
					placeholder={this.props.placeholder}
					secureTextEntry={this.props.secureTextEntry}
					autoCorrect={this.props.autoCorrect}
					autoCapitalize={this.props.autoCapitalize}
					returnKeyType={this.props.returnKeyType}
					placeholderTextColor='white'
					underlineColorAndroid='transparent'
					onChangeText={(text) => this._onChangeText(text)}
					onChange={(e) => this._onChange(e)}
				/>
			</View>
		);
	}
}

UserInput.propTypes = {
	iconSource: PropTypes.number.isRequired,
	placeholder: PropTypes.string.isRequired,
	secureTextEntry: PropTypes.bool,
	autoCorrect: PropTypes.bool,
	autoCapitalize: PropTypes.string,
	returnKeyType: PropTypes.string,
};

const MARGIN_H = 40;// 水平方向左右两边的边缘宽度
const HEIGHT = 40; // 控件高度
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
	input: {
		backgroundColor: 'rgba(255, 255, 255, 0.4)',
		width: DEVICE_WIDTH - MARGIN_H,
		height: HEIGHT,
		marginHorizontal: 20,
		paddingLeft: 45,
		borderRadius: 20,
		color: '#ffffff',
	},
	inputWrapper: {
		flex: 1,
	},
	leadingIcon: {
		position: 'absolute',
		zIndex: 99,
		width: 22,
		height: 22,
		left: 35,
		top: 9,
	},
});
