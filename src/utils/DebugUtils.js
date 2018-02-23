/**
 * 将一个Javascript对象在控制台上输出,仅输出对象自有属性，不输出对象原型属性
 * @param o : 要输出的对象
 * @param indent 整数类型，1表示缩进4个空白字符
 */
export function dumpObject(o, indent) {
    var out = '';
    if (typeof indent === 'undefined') {
        indent = 0;
    }
    for (var p in o) {
        if (o.hasOwnProperty(p)) {
            var val = o[p];
            out = new Array(4 * indent + 1).join(' ') + p + ': ';
            if (typeof val === 'object') {
                if (val instanceof Date) {
                    out += 'Date "' + val.toISOString() + '"';
                } else {

                    try {
                        out += JSON.stringify(val);
                    } catch (e) {
                        // 在某些情况下可能会出错，比如对象包含有循环引用,
                        // 出错的时候不展示该子对象，直接展示一个字符串 [object]
                        out += '[object]';
                    }
                }
            } else if (typeof val === 'function') {
                // 如果这是一个函数，直接展示一个字符串 [function]
                out += '[function]';
            } else if (typeof val === 'symbol') {
                // 如果这是一个符号，直接展示一个字符串 [symbol], ES6及其以上可用
                out += '[symbol]';
            } else if (val === null) {
                out += 'null';
            } else if (val === undefined) {
                out += 'undefined';
            } else if (isString(val)) {
                out += '"' + val + '"';
            } else if (isNumber(val)) {
                out += val;
            } else if (isBoolean(val)) {
                out += val;
            } else {
                out += '\'' + val + '\'[' + {}.toString.call(val) + ']';
            }
            out += ',\n';
            console.log(out);
        }
    }
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