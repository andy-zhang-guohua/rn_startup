import {DeviceEventEmitter} from 'react-native';

/**
 * 基于 DeviceEventEmitter 的事件总线机制
 */
class EventBus {
    constructor() {
    }

    /**
     * 订阅监听某个事件
     * @param event 目标事件
     * @param listener 监听处理逻辑函数
     */
    addListener(event, listener) {
        const subscription = DeviceEventEmitter.addListener(event, listener);
        return subscription;
    }

    /**
     *  取消订阅某个事件
     * @param subscription
     */
    removeListener(subscription) {
        subscription & subscription.remove();
    }

    /**
     * 通知某个事件发生
     * @param event 事件
     * @param parameters 事件参数
     */
    emit(event, ...parameters) {
        DeviceEventEmitter.emit(event, parameters);
    }
}

export default eventBus = new EventBus();