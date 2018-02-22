import React, { Component } from 'react';
import Dimensions from 'Dimensions';
import {
	StyleSheet,
	ImageBackground,
	View,
} from 'react-native';

import imageWallpaper from '../../images/wallpaper.png';

export default class Wallpaper extends Component {
	render() {
		return (
		<View style={{ flex: 1}}>
			<ImageBackground style={styles.picture} source={imageWallpaper}>
				{this.props.children}
			</ImageBackground >			
		</View>			
		);
	}
}

const styles = StyleSheet.create({
	picture: {
		flex: 1,
		width: null,
		height: null,
	},
});
