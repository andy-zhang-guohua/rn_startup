/** 
 * 本模块模拟使用移动端本地存储保存应用程序的配置:
 * 1.在应用程序关闭时这些配置存在于移动端本地存储并不会丢失
 * 2.应用层程序启动时会读取这些配置
*/

import React, { Component } from 'react'
import { AsyncStorage, Alert } from 'react-native'
import { log } from '../utils/LogUtils'

class AppPreferenceService {
    constructor() {
        // 在应用程序生命周期内将用户名称缓存在内存中
        this.username = '';
    }

    getUsername(callback) {
        log('将要读取应用配置参数:用户名');

        if (this.username) {
            callback(this.username);
            return;
        }

        AsyncStorage.getItem("username").then((value) => {
            log('从应用配置文件读取到用户名 : ' + value);
            this.username = value;
            callback(value);
        });
    }

    setUsername(username) {
        log('设置应用配置参数:用户名=' + username);

        this.username = username;
        AsyncStorage.setItem("username", username);
    }

    removeUsername() {
        log("删除应用配置参数:用户名");

        this.username = '';
        AsyncStorage.removeItem("username");
    }
}

export let appPreference = new AppPreferenceService();