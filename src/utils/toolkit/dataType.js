/**
 * @overview JS 数据类型的判断
 */

/**
 * @param {*} o
 * @todo 是否字符串
 */
 export const isString = (o) => {
    return Object.prototype.toString.call(o).slice(8, -1) === 'String'
}

/**
 * @param {*} o
 * @todo 是否数字
 */
export const isNumber = (o) => {
    return Object.prototype.toString.call(o).slice(8, -1) === 'Number'
}

/**
 * @param {*} o
 * @todo 是否boolean
 */
export const isBoolean = (o) => {
    return Object.prototype.toString.call(o).slice(8, -1) === 'Boolean'
}

/**
 * @param {*} o
 * @todo 是否函数
 */
export const isFunction = (o) => {
    return Object.prototype.toString.call(o).slice(8, -1) === 'Function'
}

/**
 * @param {*} o
 * @todo 是否为null
 */
export const isNull = (o) => {
    return Object.prototype.toString.call(o).slice(8, -1) === 'Null'
}

/**
 * @param {*} o
 * @todo 是否undefined
 */
export const isUndefined = (o) => {
    return Object.prototype.toString.call(o).slice(8, -1) === 'Undefined'
}

/**
 * @param {*} o
 * @todo 是否对象
 */
export const isObj = (o) => {
    return Object.prototype.toString.call(o).slice(8, -1) === 'Object'
}

/**
 * @param {*} o
 * @todo 是否数组
 */
export const isArray = (o) => {
    return Object.prototype.toString.call(o).slice(8, -1) === 'Array'
}

/**
 * @param {*} o
 * @todo 是否时间
 */
export const isDate = (o) => {
    return Object.prototype.toString.call(o).slice(8, -1) === 'Date'
}

/**
 * @param {*} o
 * @todo 是否正则
 */
export const isRegExp = (o) => {
    return Object.prototype.toString.call(o).slice(8, -1) === 'RegExp'
}

/**
 * @param {*} o
 * @todo 是否错误对象
 */
export const isError = (o) => {
    return Object.prototype.toString.call(o).slice(8, -1) === 'Error'
}

/**
 * @param {*} o
 * @todo 是否Symbol函数
 */
export const isSymbol = (o) => {
    return Object.prototype.toString.call(o).slice(8, -1) === 'Symbol'
}

/**
 * @param {*} o
 * @todo 是否Promise对象
 */
export const isPromise = (o) => {
    return Object.prototype.toString.call(o).slice(8, -1) === 'Promise'
}

/**
 * @param {*} o
 * @todo 是否Set对象
 */
export const isSet = (o) => {
    return Object.prototype.toString.call(o).slice(8, -1) === 'Set'
}