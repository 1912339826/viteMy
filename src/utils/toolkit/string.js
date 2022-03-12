/**
 * @overview JS 字符串的处理
 */

/**
 * @todo 去除空格
 * @param  {String} str
 * @param  {Number} type:  1-所有空格  2-前后空格  3-前空格 4-后空格
 * @return {String}
 */
 export const trim = (str, type) => {
    type = type || 1
    switch (type) {
        case 1:
            return str.replace(/\s+/g, "");
        case 2:
            return str.replace(/(^\s*)|(\s*$)/g, "");
        case 3:
            return str.replace(/(^\s*)/g, "");
        case 4:
            return str.replace(/(\s*$)/g, "");
        default:
            return str;
    }
}

/**
 * @todo 首字母大写 首字母小写 大小写转换 全部大写 全部小写
 * @param  {String} str
 * @param  {Number} type  1:首字母大写  2：首字母小写  3：大小写转换  4：全部大写  5：全部小写
 * @return {String}
 */
export const changeCase = (str, type) => {
    type = type || 4
    switch (type) {
        case 1:
            return str.replace(/\b\w+\b/g, function (word) {
                return word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase();

            });
        case 2:
            return str.replace(/\b\w+\b/g, function (word) {
                return word.substring(0, 1).toLowerCase() + word.substring(1).toUpperCase();
            });
        case 3:
            return str.split('').map(function (word) {
                if (/[a-z]/.test(word)) {
                    return word.toUpperCase();
                } else {
                    return word.toLowerCase()
                }
            }).join('')
        case 4:
            return str.toUpperCase();
        case 5:
            return str.toLowerCase();
        default:
            return str;
    }
}

/**
 * @todo 在字符串中插入新字符串
 * @param {string} soure 源字符
 * @param {string} index 插入字符的位置
 * @param {string} newStr 需要插入的字符
 * @returns {string} 返回新生成的字符
 */
 export const insertStr = (soure, index, newStr) => {
    let str = soure.slice(0, index) + newStr + soure.slice(index);
    return str;
}
