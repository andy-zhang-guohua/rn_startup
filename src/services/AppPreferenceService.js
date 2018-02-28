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
        this.username = '';
    }

    getUsername(callback) {
        log('读取用户名');

        AsyncStorage.getItem("username").then((value) => {
            callback(value);
        });
    }

    setUsername(username) {
        log('保存用户名:' + username);

        AsyncStorage.setItem("username", username);
    }

    removeUsername() {
        log("删除本地记录的用户名");
        
        AsyncStorage.removeItem("username");
    }
}

export let appPreference = new AppPreferenceService();