/**
 * @overview JS dom元素的处理
 */

/**
 * @todo el是否包含某个class
 * @param {*} el 
 * @param {*} className 
 */
export const hasClass = (el, className) => {
    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
    return reg.test(el.className)
}

/**
 * @todo el添加某个class
 * @param {*} el 
 * @param {*} className 
 */
export const addClass = (el, className) => {
    if (hasClass(el, className)) {
        return
    }
    let newClass = el.className.split(' ')
    newClass.push(className)
    el.className = newClass.join(' ')
}

/**
 * @todo el去除某个class
 * @param {*} el 
 * @param {*} className 
 */
export const removeClass = (el, className) => {
    if (!hasClass(el, className)) {
        return
    }
    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)', 'g')
    el.className = el.className.replace(reg, ' ')
}

/**
 * @todo 获取滚动的坐标
 * @param {*} el 
 */
export const getScrollPosition = (el = window) => ({
    x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
    y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop
});

/**
 * @todo 滚动到顶部
 */
export const scrollToTop = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, c - c / 8);
    }
}

/**
 * el是否在视口范围内
 * @param {*} el 
 * @param {*} partiallyVisible 部分可见
 */
export const elementIsVisibleInViewport = (el, partiallyVisible = false) => {
    const {
        top,
        left,
        bottom,
        right
    } = el.getBoundingClientRect();
    const {
        innerHeight,
        innerWidth
    } = window;
    return partiallyVisible ?
        ((top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight)) &&
        ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth)) :
        top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
}

/**
 * @todo 去除html标签
 * @param {*} str 
 */
export const removeHtmltag = (str) => {
    return str.replace(/<[^>]+>/g, '')
}