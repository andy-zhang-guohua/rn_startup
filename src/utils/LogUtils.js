/**
 * 此模块的演示目的 ：
 *  1.有函数定义，变量定义，
 *  2.但是仅导出函数，不导出变量
 *  3. 模块变量的修改通过对所导出的函数的调用来完成
 */
import { logger } from 'react-native-logger'
import Moment from 'moment';

let enabled = true;

export function log(message) {
    if (!enabled)
        return;

    logger.log(Moment().format(), message);
}

export function disable() {
    enabled = false;
}

export function enable() {
    enabled = true;
}