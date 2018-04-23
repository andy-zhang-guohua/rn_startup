/**
 * 判断某个表达式是否字符串类型
 * @param expr
 * @returns {boolean}
 */
export function isString(expr) {
    return typeof expr === 'string' // 对字面量方式创建的字符串有效
        || expr instanceof String // 对字面量方式创建的字符串无效,对 new String('')方式创建的字符串对象有效
        ;
}

/**
 * 判断某个表达式是否为数字类型
 * @param expr
 * @returns {boolean}
 */
export function isNumber(expr) {
    return typeof expr === 'number' // 对字面量方式定义的数字无效
        || expr instanceof Number // 对字面量方式定义的数字无效，对 new Number(1)方式定义的数字对象有效
        ;
}

/**
 * 判断某个表达式是否为 Boolean 类型
 * @param expr
 * @returns {boolean}
 */
export function isBoolean(expr) {
    return typeof expr === 'boolean' // 对字面量方式定义的布尔变量无效
        || expr instanceof Boolean // 对字面量方式定义的布尔变量无效，对 new Boolean(false) 方式定义的布尔变量对象有效
        ;
}

/**
 * 判断某个表达式是否为一个 Array 类型
 * @param expr
 * @returns {boolean}
 */
export function isArray(expr) {
    return expr instanceof Array;
}

/**
 * 某个表达式是否未定义
 * @param expr
 * @returns {boolean}
 */
export function isUndefined(expr) {
    return typeof expr === 'undefined';
}

/**
 * 某个表达式是否为null (不是0,也不是undefined,而是要求判断是否为null)
 * @param expr
 * @returns {boolean}
 */
export function isNull(expr) {
    return !expr && typeof(expr) != "undefined" && expr != 0;
}

/**
 * 某个表达式是否为undefined或者null (对于数字0该方法返回false)
 * @param expr
 * @returns {boolean}
 */
export function isUndefinedOrNull(expr) {
    return !expr && expr != 0;
}

/**
 * 复制数组(只复制一层),如果传入的参数不是数组，返回它本身
 * @param arr
 */
export function copyArray(arr) {
    if (!isArray(arr))
        return arr;

    return arr.map((e) => e);
}

export function toMap(obj) {
    if (!obj)
        return new Map();


    if (obj.constructor.name.toLowerCase() === 'object') {
        const map = new Map();
        Object.keys(obj).forEach(key => {
            map.set(key, obj[key])
        });
        return map;
    }


    if (obj.constructor.name.toLowerCase() === 'map') {
        let map = new Map([...obj.entries()]);
        return map;
    }

    return new Map();
}