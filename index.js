import { AppRegistry } from 'react-native'
import App from './App'
import AppDemoTab from './AppDemoTab'
import AppDemoTabWithStack from './AppDemoTabWithStack'
import AppDemoDrawer from "./AppDemoDrawer"
import AppCarousel from "./AppCarousel"

AppRegistry.registerComponent('rn_startup', () => App);

// 去除调试环境下反复出现的警告框，小心，可能错过一些重要信息
console.disableYellowBox = true;