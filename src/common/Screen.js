
import { Dimensions, Platform, PixelRatio } from 'react-native'

export default {
    //获取屏幕的宽度
    width: Dimensions.get('window').width,
    //获取屏幕的高度
    height: Dimensions.get('window').height,
    // React Native 尺寸单位是 pt，由于移动设备的像素密度不一样，
    // 即 1pt 对应的像素个数是不一样的。为此，React Native 提供了
    // PixelRatio API 来告知开发者当前设备的像素密度
    // 此方法用于计算出不同设备1像素是多少pt
    onePixel: 1 / PixelRatio.get(),
}