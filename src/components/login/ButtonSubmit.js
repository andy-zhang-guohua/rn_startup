import React, { Component } from 'react';
import Dimensions from 'Dimensions';
import {
	StyleSheet,
	TouchableOpacity,
	Text,
	Image,
	View,
	Alert
} from 'react-native';

import { log } from '../../utils/LogUtils'

import spinner from '../../assets/images/loading.gif';

export default class ButtonSubmit extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: this.props.isLoading,
		};

		this._onPress = this._onPress.bind(this);
	}

	// 提供缺省属性,在调用者没有指定属性时生效
	static defaultProps = {
		onPress() {
			Alert.alert('缺省提示', '用户点击了提交按钮,但是调用者没有对该按钮点击事件提供任何处理函数');
		}
	}

	_onPress() {
		if (this.state.isLoading) return;

		this.props.onPress();
	}


	componentWillMount() {
		log('按钮组件即将被挂载');
	}

	componentWillUnmount() {
		log('按钮组件即将被卸载');
	}

	componentWillReceiveProps(nextProps) {
		log("按钮组件接收到新的属性:" + JSON.stringify(nextProps));
		log("按钮组件当前状态：" + JSON.stringify(this.state));

		let changed = nextProps.isLoading !== this.state.isLoading;
		if (changed) {
			this.setState({ isLoading: nextProps.isLoading });
		}
	}

	render() {
		log("按钮组件正在渲染,当前状态：" + JSON.stringify(this.state));

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
