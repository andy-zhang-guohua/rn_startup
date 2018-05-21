# 2018-05-21
- [react-native-pdf](https://github.com/wonday/react-native-pdf)
- [react-native-root-toast](https://github.com/magicismight/react-native-root-toast)
   > npm install react-native-root-toast
   > 使用方法如下：
   ```
   import Toast from 'react-native-root-toast';

   Toast.show('This is a message', {
    duration: Toast.durations.LONG,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    onShow: () => {
        // calls on toast\`s appear animation start
    },
    onShown: () => {
        // calls on toast\`s appear animation end.
    },
    onHide: () => {
        // calls on toast\`s hide animation start.
    },
    onHidden: () => {
        // calls on toast\`s hide animation end.
    }
    ```

# 2018-05-18
* React Native 中播放视频
    * 引入[`react-native-af-video-player`](https://github.com/abbasfreestyle/react-native-af-video-player) 以下为依赖项

```
npm install --save react-native-af-video-player
npm install --save react-native-keep-awake
npm install --save react-native-orientation
npm install --save react-native-linear-gradient
npm install --save react-native-slider

react-native link react-native-keep-awake
react-native link react-native-orientation
react-native link react-native-linear-gradient

```

    - [react-native-video](https://github.com/react-native-community/react-native-video)
```
npm install --save react-native-video

react-native link react-native-video
```
# 2018-05-15
- 引入并尝试 [react-native-native-video-player](https://github.com/matiasfh/react-native-native-video-player)

# 2018-4-25
1. 继续尝试 Redux : 多 reducer, 每个reducer的state使用不同的类型
    > 1. 多 reducer
    >  * userReducer:string, 设置和取消用户名
    >  * counterReducer:{counter,updateTime},自增或者自减计数器同时更新修改时间
    > 2. 使用 combineReducers 合并上面两个 reducer;
    > 3. React Native component 中使用 store.subscribe 订阅 store 的状态变化,store.getState 获取状态， 再通过 this.setState 将store的状态更新到界面上;
    >   * 注意：这里 store 返回的状态的数据结构的变化
# 2018-4-24
- 引入并尝试 [redux](https://github.com/reactjs/redux)
```
npm install --save redux
npm install --save react-redux
npm install --save-dev redux-devtools
```
安装情况 :
```
+ redux@4.0.0
+ react-redux@5.0.7
+ redux-devtools@3.4.1
```


尝试步骤 :

 > 1. 使用一个reducer，使用基础数据类型作为state;
 > 2. React Native component 中使用 store.dispatch action 触发 store 状态变化，没有抽象 action type, action creator 函数;
 > 3. React Native component 中使用 store.subscribe 订阅 store 的状态变化,store.getState 获取状态， 再通过 this.setState 将store的状态更新到界面上;
 > * 注意 : 这里 store 返回的状态的数据结构和这里使用的唯一一个reducer的state的结构是一样的;



# 2018-04-20
- 引入[`react-native-scrollable-tab-view`](https://github.com/skv-headless/react-native-scrollable-tab-view)
```
npm i --save react-native-scrollable-tab-view
```
* DefaultTabBar 缺省TabBar,超出视图后不可滚动
* ScrollableTabBar 可滚动TabBar,超出视图后可以滚动

- 引入[react-native-animatable](https://github.com/oblador/react-native-animatable)
```
npm install react-native-animatable --save
```

# 2018-04-15
- 引入[`react-native-dropdown-menu`](https://github.com/WheelerLee/react-native-dropdown-menu)

    这是一个纯JS控件，可以从模块中剥离出来，定制和二次开发

```
npm i --save react-native-dropdown-menu
```


# 2018-04-10

- 升级到 react-native 0.55.1


# 2018-03-22

1. 引入 `react-native-fetch-blob`测试文件系统相关功能
    - [源代码网址和安装指南](https://github.com/wkh237/react-native-fetch-blob)
    - 在安卓上做实验
        - 列出磁盘使用情况
        - 列出各个目录
        - 新建文件
        - 删除文件
        - 写入文件
        - 读取文件
        - 检查文件存在性
        - 下载文件，展示进度，保存到文件
    - 问题和解决方案
        - 问题: SDK 版本过低
            - 解决方案 : 在`react-native-fetch-blob`安卓项`目的build.gradle`中修改相应的SDK版本
2. 动画测试

# 2018-03-06
1. FlatList ： AppDemoTabWithStack.js

# 2018-03-05
1. React Native 中实现 Splash 屏幕

	- 安卓已验
	[参考文档:react-native-splash-screen](https://github.com/crazycodeboy/react-native-splash-screen)
	
	- iOS未验

2. React Native 中轮播图
	- 方案一 :  react-native-carousel-view
		- 安卓已验,问题 : react-native-carousel-view 和 react navigation 配合使用时内容不显示，有待调查
		[参考文档:react-native-carousel-view](https://github.com/Canner/react-native-carousel-view)

			参考应用 : AppCarousel.js
		
		- iOS未验
	- 方案二 :  f8 ViewPager
	
	// TODO

3. React Native 中展示PDF
	//TODO
4. React Native 中播放音乐

	//TODO
5. React Native 中播放视频
	2018-05-18 解决

6. React Native 中使用地理位置
	
	//TODO
7. React Native 中打电话
	
	//TODO
8. React Native 中滚动视图 ScrollView
	
	//TODO
9. React Native 中使用相机
	
	//TODO
10. React Native 动画效果机制
	
	//TODO
11. React Native 中实现视图下拉刷新/上拉加载
	
	//TODO

12. React Native 上传文件或者图片
	
	//TODO

13. React Native 下载保存文件

	//TODO

# 2018-03-02
1. React Navigation willFocus/didFocus,willBlur/didBlur 屏幕切换事件发生时机观察

# 2018-03-01
1. 应用程序入口暂时接入AppDemoTab,用于学习 Tab Navigator,之前的屏幕基于 Stack Navigator
	
	[参考文档:Tab navigation](https://reactnavigation.org/docs/tab-based-navigation.html)
2. 引入 react-native-vector-icons
	
	目前仅针对安卓平台确认可用
	
	react-native-vector-icons 官网 :
		
	- [源代码](https://github.com/oblador/react-native-vector-icons)
	- [官网首页](https://oblador.github.io/react-native-vector-icons/)

	安装方法 :
	
	1.npm 安装
	
	```
		npm install react-native-vector-icons --save
		react-native link // 注意此命令不要重复执行	
	```	
	
	2.手工编辑 android/app/build.gradle
	
	在 dependencies 块中如果不存在以下行则增加该行 :

	```
		compile project(':react-native-vector-icons')
	```

	其他问题 :
	
	1. 针对以下Ionicons找不到的workaround : 删除 node_modules/react-native/local-cli/core/__fixtures__/files/package.json

	```
	error: bundling failed: Error: While resolving module `react-native-vector-icons/Ionicons`, 
	the Haste package `react-native-vector-icons` was found. However the module `Ionicons` could 
	not be found within the package. 
	```

3. 增加新的应用程序入口AppDemoTabWithStack,用于学习 Tab Navigator 内嵌套 Stack Navigator,以及跟 Modal 的配合(以Login屏幕为例)
   到目前为止 ， 有三个应用程序入口可供选择 : App, AppDemoTab, AppDemoTabWithStack

4. 增加新的应用程序入口AppDemoDrawer,用于学习 Drawer Navigator (目前没有跟其他导航模式的配合)
   到目前为止 ， 有四个应用程序入口可供选择 : App, AppDemoTab, AppDemoTabWithStack,AppDemoDrawer   

5. 增加使用fetch从服务器获取数据的代码例子，在 Main.js 中

	- http : 工作
	- 自签名 ssl 证书的 https : 不工作，请求失败
	- CA认证 ssl 证书的 https : 工作

6. 密码摘要功能 : PasswordUtils.sha256Base64, 基于 crypto-js@3.1.9-1,演示代码在 UserProfile.render()中
	```
	// https://github.com/brix/crypto-js
	npm install crypto-js --save
	```

7. React Navigation 屏幕切换时的生命周期方法控制 : willFocus,didFocus,willBlur,didBlur
   
   [参考文档:Navigation prop reference](https://reactnavigation.org/docs/navigation-prop.html)

# 2018-02-28

1. 引入字符串工具包 understore.string
   ```js
   
   // https://github.com/epeli/underscore.string
   npm install underscore.string --save
   // 注意安装完成后需要重新启动应用
   
   ```
2. 完成登录屏的用户登录逻辑，包括模拟验证用户，错误处理，和屏幕切换
3. 登录成功时屏幕切换携带参数 : 参考登录屏到用户个人信息屏的切换逻辑
4. 使用 AsyncStorage 往移动端本机持久化管理应用配置参数，比如已登录用户等信息，参考 AppPreferenceService.js
5. 使用嵌套导航器解决模态全屏问题

# 2018-02-27
1. 模块中定义类，导出类对象变量在其他地方使用
2. 模块中导出类的例子参考各个自定义React组件定义类的导出即可，比如 `Main.js`

# 2018-02-23

1. 开始使用 VSC 编辑 RN 项目文件(主要是要利用js文件排版自动格式化，关键字高亮等IDE,md编辑器等能力)
2. 实验 : 自定义的`UserInput`组件(`View`内封装了一个`TextInput`,带图标`Image`效果)输入内容变化是传播到父容器组件Form
	
	实现原理 : 
		
	父容器向子容器通过属性(`props`)设置回调函数，子容器在相应的事件发生时回调所指定的回调函数传回相应的变更.

	> **注意 :** 这是 React 的特性，而不是 React Native 的特性。

3. 实验 : 一般 ES6 模块的实现和引用
		
	实验例子 :  
	- 模块 : 代码调试工具 `DebugUtils.js`，
	- 日志输出工具 `LogUtils.js`, 
	
	实验要点 :
	- export 函数 

4. 业务模拟实验 : `UserService.js` 使用 ES6 Map/Module 模拟的一个用户服务，管理用户数据，用于登录时验证用户信息和用户中心获取用户数据，

5. 引入时间处理库 `Moment`

```js
	// https://momentjs.com/docs/
	npm install moment --save
```

6. 引入React Native 日志库 

```js
	// https://www.npmjs.com/package/react-native-logger
	npm install react-native-logger --save
```

7. 键盘事件处理逻辑 : `Login.js`

8. 组件生命周期事件处理逻辑 : `Login.js`

9. 根据组件状态有条件显示子组件 : `Login.js`

10.明确待做事项 TODO

	1. 屏幕旋转处理
	
	2. 不同屏幕大小适配处理
	
	3. 键盘出现时可不可以原来的整屏平移，而不是在剩下的区域中重新布局 ?

	4. 登录提交的处理和屏幕切换逻辑 !!!

	5. ES6 模块导出类 !!!

# 2018-02-22 开始React Native 功能学习项目

## 当前 React Native 版本

```js
	react-native-cli: 2.0.1
	react-native: 0.53.3
```

## 学习Button的使用

1. 添加`Button`到页面
2. `Button` 在容器中的布局
3. `Button`事件处理逻辑 : 执行一段代码,同时使用了`ES6`的箭头函数,调用其他函数
4. `Button` 的 `style` 怎么设置 : `Button` 没有 `style` 属性
5. 基于react navigation的屏幕切换
        
	1. 参考文档

		- [Getting started](https://reactnavigation.org/docs/getting-started.html)
		- [Hello React Navigation](https://reactnavigation.org/docs/hello-react-navigation.html)
		- [StackNavigator reference](https://reactnavigation.org/docs/stack-navigator.html)
		- [Moving between screens](https://reactnavigation.org/docs/navigating.html)
		
		- [2.4 Props & States](https://unbug.gitbooks.io/react-native-training/content/23_states_&_props.html)
		- [2.5 Events](https://unbug.gitbooks.io/react-native-training/content/24_events.html)
	
	2. 安装 `react-navigation` 

	```
		npm install --save react-navigation	
		// react-navigation@1.1.2			
	```    

	3. 点击按钮时的页面切换
		
6. 分屏代码模块化实验(ES6功能)	
    
	1. App.js 定义一个App类,该类只渲染一个StackNavigator对象到屏幕,
	2. 该StackNavigator组件包含四个屏幕 Main,Login,Register,UserProfile,缺省屏幕为 Main;
		
		屏幕设计

		- Main : 主屏，用户登录与否都可查看该页，应用程序缺省屏幕, 可跳转到 Login, Register 屏 ; 如果有用户登录会显示当前用户信息;
		- Login : 登录屏，输入用户名密码执行登录逻辑，成功后跳转到 UserProfile 屏 ;
		- Register : 注册屏,输入用户名，密码，确认密码完成注册，注册成功后自动跳转到 Main 屏 ;
		- UserProfile : 用户个人信息屏，上面显示用户个人信息, 有 退出登录 按钮，可以退出当前用户，并在成功时跳转到 Main 屏 ;
	
	
	2. index.js 定义应用程序启动时直接进入 App

7. 使用 Google Chrome 浏览器查看控制台输出

	1. 应用运行时打开浏览器 http://localhost:8081/debugger-ui/ ;

	2. Windows 平台上 Ctrl+Shift + J 打开 Chrome Developer Tools;

	3. 切换到控制台 Console Tab ;
	
	>**注意 : 这里只能看到 `console.log()` 之类的输出，并不能使用 Chrome Developer Tools 的 Inspect 功能查看应用的控件属性和布局等信息**

8. Inspector 控件属性和布局
    
	1. 打开 `Dev tools`;
	
	2. `Toggle Inspector` ;
	
9. 安装 `React Developer Tools`

	```	
	npm install -g react-devtools
	```	
	
	`react-devtools`依赖于`electron`，而`electron`需要到国外服务器下载二进制包，所以国内用户这一步很可能会卡住。
	此时请在环境变量中添加`electron`专用的国内镜像源：`ELECTRON_MIRROR="https://npm.taobao.org/mirrors/electron/"`
	然后再尝试安装`react-devtools`。
	
	`react-devtools` 和 `Inspector` 可以结合使用;

10. 实现 Login 页面布局

11. TODO : 尚未实现数据获取，验证，用户登录逻辑
	
	