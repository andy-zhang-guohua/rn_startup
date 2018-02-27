/** 
 * 本模块模拟了一个基于内存的用户存储库，缺省内置包含三个用户 : andy, tom, jerry,
 * 支持应用程序运行期间注册新用户进来，但是应用程序重启之后重置为内置的三个用户
*/

const users = new Map();

user1 = { username: 'andy', password: '111' };
user2 = { username: 'tom', password: '112' };
user3 = { username: 'jerry', password: '113' };

users.set(user1.username, user1);
users.set(user2.username, user2);
users.set(user3.username, user3);

class UserService {
    constructor() {
        // 将所有成员方法的this关键字指向当前 UserService 对象，
        // 主要用于解决把该 UserService 对象的相应方法作为回调函数使用时
        // 确保在方法内部 this 总是指向定义时的 UserService 对象
        this.findUserByUsername = this.findUserByUsername.bind(this);
        this.existUserWithUsername = this.existUserWithUsername.bind(this);
        this.addNewUser = this.addNewUser.bind(this);
        this.checkUser = this.checkUser.bind(this);
    }

    findUserByUsername(username) {
        return users.get(username);
    }

    existUserWithUsername(username) {
        return users.has(username);
    }

    addNewUser(username, password) {
        let exist = users.has(username);
        if (!exist)
            return false;

        users.set(username, { username: username, password: password });
        return true;
    }

    checkUser(username, password) {
        let exist = users.has(username);
        if (!exist)
            return false;

        let user = users.get(username);
        if (user === undefined)
            return false;


        let passwordMatch = user.password === password;
        return passwordMatch;
    }
}

export let userService = new UserService();