import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Text,
	Image,
} from 'react-native';

import imageLogo from '../../assets/images/logo.png';

export default class Logo extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Image source={imageLogo} style={styles.image} />
				<Text style={styles.text}>用户登录</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 2,
		alignItems: 'center',
		justifyContent: 'center',
	},
	image: {
		width: 80,
		height: 80,
	},
	text: {
		color: 'white',
		fontWeight: 'bold',
		backgroundColor: 'transparent',
		marginTop: 20,
	}
});
