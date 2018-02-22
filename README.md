# 2018-02-22 开始React Native 功能学习项目

## 当前 React Native 版本

```
react-native-cli: 2.0.1
react-native: 0.53.3
```

## 学习Button的使用

1. 添加Button到页面
2. Button在容器中的布局
3. Button事件处理逻辑 : 执行一段代码,同时使用了ES6的箭头函数,调用其他函数
4. Button 的 style 怎么设置 : Button 没有 style 属性
5. 基于react navigation的屏幕切换
        
		1. 参考文档 
```
	https://reactnavigation.org/docs/hello-react-navigation.html
```	
        2. 安装 react-navigation 
```
	npm install --save react-navigation	
	// react-navigation@1.1.2
```	
        3. 点击按钮时的页面切换
		
6. 分屏代码模块化(ES6功能)	
    
	1. App.js 定义一个App类,该类只渲染一个StackNavigator对象到屏幕,该StackNavigator组件包含三个屏幕 Main,Login,Register,缺省屏幕为 Main;
    
	2. index.js 定义应用程序启动时直接进入 App