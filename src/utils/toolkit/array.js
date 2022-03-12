/**
 * @overview JS 数组的处理
 */

/**
 * @todo 判断一个元素是否在数组中
 */
export const contains = (arr, val) => {     
    return arr.indexOf(val) != -1 ? true : false;
}


/**
 * @param  {Array} arr
 * @param  {Function} fn
 * @return {undefined}
 */
export function each(arr, fn) {
    fn = fn || Function;
    let a = [];
    let args = Array.prototype.slice.call(arguments, 1);
    for (let i = 0; i < arr.length; i++) {
        let res = fn.apply(arr, [arr[i], i].concat(args));
        if (res != null) a.push(res);
    }
}

/**
 * @param  {Array} arr
 * @param  {Function} fn
 * @param  {thisObj} this指向
 * @return {Array} 
 */
export const map = (arr, fn, thisObj) => {
    let scope = thisObj || window;
    let a = [];
    for (let i = 0, j = arr.length; i < j; ++i) {
        let res = fn.call(scope, arr[i], i, this);
        if (res != null) a.push(res);
    }
    return a;
}


/**
 * @param  {Array} arr
 * @param  {number} type 1：从小到大   2：从大到小   3：随机
 * @return {Array}
 */
export const sort = (arr, type = 1) => {
    return arr.sort((a, b) => {
        switch (type) {
            case 1:
                return a - b;
            case 2:
                return b - a;
            case 3:
                return Math.random() - 0.5;
            default:
                return arr;
        }
    })
}

/**
 * @todo 去重
 * @param  {Array} arr
 */
export const unique = (arr) => {
    if (Array.prototype.hasOwnProperty.call('from')) {
        return Array.from(new Set(arr));
    } else {
        let n = {},
            r = [];
        for (let i = 0; i < arr.length; i++) {
            if (!n[arr[i]]) {
                n[arr[i]] = true;
                r.push(arr[i]);
            }
        }
        return r;
    }
}


/**
 * @todo 求两个集合的并集
 * @param  {Array} a
 * @param  {Array} b
 */
export const union = (a, b) => {
    let newArr = a.concat(b);
    return this.unique(newArr);
}

/**
 * @todo 求两个集合的交集
 * @param  {Array} a
 * @param  {Array} b
 */
export const intersect = (a, b) => {
    let _this = this;
    a = this.unique(a);
    return this.map(a, function (o) {
        return _this.contains(b, o) ? o : null;
    });
}

/**
 * @todo 删除其中一个元素
 * @param  {Array} arr
 * @param  {String} ele
 */
export const remove = (arr, ele) => {
    let index = arr.indexOf(ele);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
}

/**
 * @todo 将类数组转换为数组的方法
 * @param  {Array} arr
 */
export const formArray = (ary) => {
    let arr = [];
    if (Array.isArray(ary)) {
        arr = ary;
    } else {
        arr = Array.prototype.slice.call(ary);
    }
    return arr;
}

/**
 * @todo 最大值
 * @param  {Array} arr
 */
export const max = (arr) => {
    return Math.max.apply(null, arr);
}

/**
 * @todo 最小值
 * @param  {Array} arr
 */
export const min = (arr) => {
    return Math.min.apply(null, arr);
}

/**
 * @todo 求和
 * @param  {Array} arr
 */
export const sum = (arr) => {
    return arr.reduce((pre, cur) => {
        return pre + cur
    })
}

/**
 * @todo 平均值
 * @param  {Array} arr
 */
export const average = (arr) => {
    return this.sum(arr) / arr.length
}

/**
 * @todo 判断a数组是否包含b数组中
 * @param  {Array} arr1
 * @param  {Array} arr2
 */
export const getArrRepeat = (arr1, arr2) => {
    return arr1.filter((item) => {
        return arr2.includes(item)
    })
}

/**
 * @todo 将数组分片
 * @param  {Array} data
 * @param  {Boolean} space
 * @example
 * 列子[1,2,3,4,5,6,7,8] [[1,2,3],[4,5,6],[7,8]]
 */
export const arrChunk = (data = [], space = 5) => {
    let result = [];
    for (let i = 0, len = data.length; i < len; i += space) {
        result.push(data.slice(i, i + space));
    }
    return {
        data: result,
        total: data.length,
        space
    };
}

/**
 * 洗牌算法随机
 * @param {*} arr 
 */
 export const shuffle = (arr) => {
    let result = [],
        random;
    while (arr.length > 0) {
        random = Math.floor(Math.random() * arr.length);
        result.push(arr[random])
        arr.splice(random, 1)
    }
    return result;
}