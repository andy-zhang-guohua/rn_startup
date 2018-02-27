import { log } from './LogUtils';

/**
 * 将一个Javascript对象在控制台上输出,仅输出对象自有属性，不输出对象原型属性
 * @param o : 要输出的对象
 * @param indent 整数类型，1表示缩进4个空白字符
 */
function dumpObject(o, indent) {
    var objectDump = getObjectDump(o, indent);
    log("Dumping an object :\n" + objectDump);
}

/**
 * 注意，该方法在对象比较大时并不会做额外处理，所以调用此方法有空间不足出错的可能，生产环境误用
 * @param {*} object 
 * @param {*} indent 
 */
function getObjectDump(object, indent) {
    let dump = '';

    if (typeof indent === 'undefined') {
        indent = 0;
    }
    for (var property in object) {
        let line = '';
        if (object.hasOwnProperty(property)) {
            var val = object[property];
            line = new Array(4 * indent + 1).join(' ') + property + ': ';
            if (typeof val === 'object') {
                if (val instanceof Date) {
                    line += 'Date "' + val.toISOString() + '"';
                } else {

                    try {
                        line += JSON.stringify(val);
                    } catch (e) {
                        // 在某些情况下可能会出错，比如对象包含有循环引用,
                        // 出错的时候不展示该子对象，直接展示一个字符串 [object]
                        line += '[object]';
                    }
                }
            } else if (typeof val === 'function') {
                // 如果这是一个函数，直接展示一个字符串 [function]
                line += '[function]';
            } else if (typeof val === 'symbol') {
                // 如果这是一个符号，直接展示一个字符串 [symbol], ES6及其以上可用
                line += '[symbol]';
            } else if (val === null) {
                line += 'null';
            } else if (val === undefined) {
                line += 'undefined';
            } else if (isString(val)) {
                line += '"' + val + '"';
            } else if (isNumber(val)) {
                line += val;
            } else if (isBoolean(val)) {
                line += val;
            } else {
                line += '\'' + val + '\'[' + {}.toString.call(val) + ']';
            }
            line += ',\n';
            dump += line;
        }
    }
    return dump;
}

function isString(val) {
    return typeof val == 'string' // 对字面量方式创建的字符串有效
        || val instanceof String // 对字面量方式创建的字符串无效,对 new String('')方式创建的字符串对象有效
        ;
}

function isNumber(val) {
    return typeof val == 'number' // 对字面量方式定义的数字无效
        || val instanceof Number // 对字面量方式定义的数字无效，对 new Number(1)方式定义的数字对象有效
        ;
}

function isBoolean(val) {
    return typeof val == 'boolean' // 对字面量方式定义的布尔变量无效
        || val instanceof Boolean // 对字面量方式定义的布尔变量无效，对 new Boolean(false) 方式定义的布尔变量对象有效
        ;
}

class Debuger {
    constructor(defaultIndent) {
        this.indent = defaultIndent;

        this.enabled = false;

        // 将所有成员方法的this关键字指向当前 Debugger 对象，
        // 主要用于解决把该Debugger对象的相应方法作为回调函数使用时
        // 确保在方法内部this总是指向定义时的 Debugger 对象
        this.enable = this.enable.bind(this);
        this.disable = this.disable.bind(this);
    }

    enable() {
        this.enabled = true;
        log(this);
    }

    disable() {
        this.enabled = false;
    }


    dumpObject(obj) {
        if (!this.enabled)
            return;

        dumpObject(obj, this.indent);
    }
}

const DEFAULT_INDENT_OF_LOGGING_MESSAGE = 1
// debugger 是javascript 调试语句的专用关键字，所以我使用 debugger 作为变量名称会报告语法错误，
// 所以这里使用 debuger 作为我自定义的调试器名称
export let debuger = new Debuger(DEFAULT_INDENT_OF_LOGGING_MESSAGE);