/**
 * @overview JS 其他
 */

/**
 * @todo 获取url参数
 * @param {*} name 
 */
export const getQueryString = (name) => {
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    const search = window.location.search.split('?')[1] || '';
    const r = search.match(reg) || [];
    return r[2];
}

/**
 * @todo 动态引入js
 * @param {*} src 
 */
export const injectScript = (src) => {
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.src = src;
    const t = document.getElementsByTagName('script')[0];
    t.parentNode.insertBefore(s, t);
}

/**
 * @todo 根据url地址下载
 * @param {*} url 
 */
export const download = (url) => {
    let isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
    let isSafari = navigator.userAgent.toLowerCase().indexOf('safari') > -1;
    if (isChrome || isSafari) {
        let link = document.createElement('a');
        link.href = url;
        if (link.download !== undefined) {
            let fileName = url.substring(url.lastIndexOf('/') + 1, url.length);
            link.download = fileName;
        }
        if (document.createEvent) {
            let e = document.createEvent('MouseEvents');
            e.initEvent('click', true, true);
            link.dispatchEvent(e);
            return true;
        }
    }
    if (url.indexOf('?') === -1) {
        url += '?download';
    }
    window.open(url, '_self');
    return true;
}

/**
 * 劫持粘贴板
 * @param {*} value 
 */
export const copyTextToClipboard = (value) => {
    let textArea = document.createElement("textarea");
    textArea.style.background = 'transparent';
    textArea.value = value;
    document.body.appendChild(textArea);
    textArea.select();
    try {
        // let successful = document.execCommand('copy');
    } catch (err) {
        console.log('Oops, unable to copy');
    }
    document.body.removeChild(textArea);
}

/**
 * @todo 检测密码强度
 * @param  {String} str
 */
export const checkPwd = (str) => {
    let Lv = 0;
    if (str.length < 6) {
        return Lv
    }
    if (/[0-9]/.test(str)) {
        Lv++
    }
    if (/[a-z]/.test(str)) {
        Lv++
    }
    if (/[A-Z]/.test(str)) {
        Lv++
    }
    if (/[|-|_]/.test(str)) {
        Lv++
    }
    return Lv;
}

/**
 * @todo 函数节流器
 * @param  {Function} fn 需要执行性的函数
 * @param  {number} time 时间戳
 * @param  {number} interval 间隔时间
 */
export const debouncer = (fn, time, interval = 200) => {
    if (time - (window.debounceTimestamp || 0) > interval) {
        fn && fn();
        window.debounceTimestamp = time;
    }
}

/**
 * @todo 判断两个对象是否键值相同
 * @param  {Object}  a 第一个对象
 * @param  {Object}  b 第一个对象
 * @return {Boolean}   相同返回true，否则返回false
 */
export const isObjectEqual = (a, b) => {
    let aProps = Object.getOwnPropertyNames(a);
    let bProps = Object.getOwnPropertyNames(b);

    if (aProps.length !== bProps.length) {
        return false;
    }

    for (let i = 0; i < aProps.length; i++) {
        let propName = aProps[i];

        if (a[propName] !== b[propName]) {
            return false;
        }
    }
    return true;
}

/**
 * @todo 16进制颜色转RGB\RGBA字符串
 * @param  {String} val 16进制颜色值
 * @param  {Number} opa 不透明度，取值0~1
 * @return {String}     转换后的RGB或RGBA颜色值
 */
export const colorToRGB = (val, opa) => {

    let pattern = /^(#?)[a-fA-F0-9]{6}$/; //16进制颜色值校验规则
    let isOpa = typeof opa == 'number'; //判断是否有设置不透明度

    if (!pattern.test(val)) { //如果值不符合规则返回空字符
        return '';
    }

    let v = val.replace(/#/, ''); //如果有#号先去除#号
    let rgbArr = [];
    let rgbStr = '';

    for (let i = 0; i < 3; i++) {
        let item = v.substring(i * 2, i * 2 + 2);
        let num = parseInt(item, 16);
        rgbArr.push(num);
    }

    rgbStr = rgbArr.join();
    rgbStr = 'rgb' + (isOpa ? 'a' : '') + '(' + rgbStr + (isOpa ? ',' + opa : '') + ')';
    return rgbStr;
}

import QueryParam from '../QueryParam.js'
/**
 * @todo 追加url参数
 * @param {string} url url参数
 * @param {string|object} key 名字或者对象
 * @param {string} value 值
 * @return {string} 返回新的url
 * @example
 * appendQuery('lechebang.com', 'id', 3);
 * appendQuery('lechebang.com?key=value', { cityId: 2, cityName: '北京'});
 */
export const appendQuery = (url, key, value) => {
    let options = key;
    if (typeof options == 'string') {
        options = {};
        options[key] = value;
    }
    // options = $.param(options);
    options = QueryParam(options);
    if (url.includes('?')) {
        url += '&' + options
    } else {
        url += '?' + options
    }
    return url;
}

/**
 * @todo 取得当前日期所在月的最大天数
 * @param {Date} date 值
 */

export function maxDayOfDate(date) {
    date = arguments[0] || new Date();
    date.setDate(1);
    date.setMonth(date.getMonth() + 1);
    let time = date.getTime() - 24 * 60 * 60 * 1000;
    let newDate = new Date(time);
    return newDate.getDate();
}