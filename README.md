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

		Getting started : https://reactnavigation.org/docs/getting-started.html 
		Hello React Navigation : https://reactnavigation.org/docs/hello-react-navigation.html
		StackNavigator reference : https://reactnavigation.org/docs/stack-navigator.html
		Moving between screens : https://reactnavigation.org/docs/navigating.html
		
		2.4 Props & States : https://unbug.gitbooks.io/react-native-training/content/23_states_&_props.html
		2.5 Events : https://unbug.gitbooks.io/react-native-training/content/24_events.html
	2. 安装 react-navigation 

		npm install --save react-navigation	
		// react-navigation@1.1.2			
    
	3. 点击按钮时的页面切换
		
6. 分屏代码模块化实验(ES6功能)	
    
	1. App.js 定义一个App类,该类只渲染一个StackNavigator对象到屏幕,该StackNavigator组件包含四个屏幕 Main,Login,Register,UserProfile,缺省屏幕为 Main;
		屏幕设计 : 
			Main : 主屏幕，用户登录与否都可查看该页，应用程序缺省屏幕 , 可以跳转到 Login, Register 屏幕 ; 如果有用户登录会显示当前用户信息;
			Login : 登录屏幕，输入用户名密码执行登录逻辑，成功后跳转到 UserProfile 屏幕 ;
			Register : 注册屏幕,输入用户名，密码，确认密码完成注册，注册成功后自动跳转到 Main 屏幕 ;
			UserProfile : 用户登录成功时进入的用户个人信息屏幕，上有 退出登录 按钮， 可以退出当前用户，并在成功时跳转到 Main 屏幕 ;
	
	
	2. index.js 定义应用程序启动时直接进入 App

7. 使用 Google Chrome 浏览器查看控制台输出
	1. 应用运行时打开浏览器 http://localhost:8081/debugger-ui/ ;
	2. Windows 平台上 Ctrl+Shift + J 打开 Chrome Developer Tools;
	3. 切换到控制台 Console Tab ;
	
	** 注意 : 这里只能看到 console.log() 之类的输出，并不能使用 Chrome Developer Tools 的 Inspect 功能查看应用的控件属性和布局等信息 **
8. Inspector 控件属性和布局
    
	1. 打开 Dev tools;
	
	2. Toggle Inspector ;
	
9. 安装 React Developer Tools
	
	npm install -g react-devtools
	
	react-devtools依赖于electron，而electron需要到国外服务器下载二进制包，所以国内用户这一步很可能会卡住。
	此时请在环境变量中添加electron专用的国内镜像源：ELECTRON_MIRROR="https://npm.taobao.org/mirrors/electron/"，
	然后再尝试安装react-devtools。

10. 实现 Login 页面布局
	TODO : 尚未实现数据获取，验证，用户登录逻辑
	
	