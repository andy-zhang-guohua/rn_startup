import React, {Component} from 'react';
import {Alert, Button, StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';

import Moment from 'moment';
import RNFetchBlob from 'react-native-fetch-blob'
import {log} from '../utils/LogUtils'


class FileSystemTestScreen extends Component {
    static navigationOptions = {
        title: '文件系统有关测试',
    };

    constructor() {
        super();

        this.state = {
            report: '',
            downloadImagePath: '',
        };

        this._dirs = this._dirs.bind(this);
        this._report = this._report.bind(this);
        this._createOrReadFile = this._createOrReadFile.bind(this);
        this._deleteFile = this._deleteFile.bind(this);
        this._downloadFile = this._downloadFile.bind(this);
    }

    _deleteFile() {
        let file = RNFetchBlob.fs.dirs.CacheDir + '/test.txt';

        let charset = 'utf-8';
        RNFetchBlob.fs.exists(file).then((exist) => {
            log('文件存在:' + file + "," + (exist ? "是" : "否"))
            if (!exist) {
                alert('文件不存在:\n' + file);
                return;
            }

            RNFetchBlob.fs.unlink(file).then((data) => {
                alert('文件删除成功:\n' + file);
            }).catch(error => {
                alert(eror)
            })
        }).catch((error) => {
            alert(error)
        })

    }

    _downloadFile() {
        //let url = `https://www.baidu.com/img/bd_logo1.png`; // 小图
        let url = `https://up.enterdesk.com/edpic_source/a2/7a/95/a27a957696c16e93f6a75540abef0a8b.jpg`; //大图
        RNFetchBlob.config({
            fileCache: true
        }).fetch('GET', url)
            .progress({count: 10, interval: 20}, (received, total) => {
                log('[' + url + ']下载进度 :  ' + Math.floor(received / total * 100) + '%')
            }).then((response) => {
            log('下载完成')
            log(response);
            log(response.info());

            this.setState({downloadImagePath: response.path()});
            setTimeout(() => {
                log("this.state.downloadImagePath = " + this.state.downloadImagePath);
                alert("下载图片保存在:" + this.state.downloadImagePath);
            }, 0);

        }).catch(error => {
            alert(error);
        });
    }

    _createOrReadFile() {
        let file = RNFetchBlob.fs.dirs.CacheDir + '/test.txt';

        const charset = 'utf8';
        RNFetchBlob.fs.exists(file).then((exist) => {
            log('文件存在:' + file + "," + (exist ? "是" : "否"))
            if (!exist)
                throw new Error('文件不存在');
            RNFetchBlob.fs.readFile(file, charset).then((data) => {
                log(data);
                alert('文件' + file + '内容:\n' + data);
            }).catch(error => {
                alert(error)
            })
        }).catch((error) => {
            let data = "文件创建于:" + Moment().format();
            RNFetchBlob.fs.createFile(file, data, charset).then(() => {
                alert('创建文件成功:' + file)
            }).catch
            (error => {
                alert(error)
            })
        })

    }

    componentDidMount() {
        log('首页屏组件已被挂载');

        RNFetchBlob.fs.df().then((diskUsage) => {
            let report = this._report(diskUsage);
            log(report);
            this.setState({report: report});
        }).catch((error) => {
            log(error)
        });
    }

    _report(diskUsage) {
        let result = '磁盘空间:\n';
        result += JSON.stringify(diskUsage, 2) + `\n`;
        result += this._dirs();
        return result;
    }

    _dirs() {
        const dirs = RNFetchBlob.fs.dirs
        let result = `各种目录:\n`
        result += `DocumentDir:` + (dirs.DocumentDir) + `\n`
        result += `CacheDir:` + (dirs.CacheDir) + `\n`
        result += `DCIMDir:` + (dirs.DCIMDir) + `\n`
        result += `DownloadDir:` + (dirs.DownloadDir) + `\n`
        result += `MovieDir:` + (dirs.MovieDir) + `\n`
        result += `MusicDir:` + (dirs.MusicDir) + `\n`
        result += `PictureDir:` + (dirs.PictureDir) + `\n`
        result += `SDCardDir:` + (dirs.SDCardDir) + `\n`
        return result;
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <Text style={styles.report}>
                        {this.state.report}
                    </Text>
                </View>
                <TouchableOpacity onPress={this._createOrReadFile} style={styles.button}>
                    <Text style={styles.buttonText}>
                        新建文件(缓存目录\test.txt)
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this._deleteFile} style={styles.button}>
                    <Text style={styles.buttonText}>
                        删除文件(缓存目录\test.txt)
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this._downloadFile} style={styles.button}>
                    <Text style={styles.buttonText}>
                        下载图片(百度logo => 缓存目录)
                    </Text>
                </TouchableOpacity>
                <Image
                    source={{uri: 'https://up.enterdesk.com/edpic_source/a2/7a/95/a27a957696c16e93f6a75540abef0a8b.jpg'}}
                    style={{width: 300, height: 100}}>
                </Image>
            </View>
        );
    }
}

export default FileSystemTestScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        margin: 10,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#CCCC00',
        borderColor: `#33f`,
        borderWidth: 0.5,
    },
    report: {
        fontSize: 14,
        textAlign: 'left',
        margin: 10,
        color: `#fff`
    },
    button: {
        alignItems: 'center',
        justifyContent: `center`,
        backgroundColor: '#33f',
        padding: 10,
        margin: 4
    },
    buttonText: {
        fontSize: 20,
        textAlign: 'center',
        color: `#fff`
    },
});