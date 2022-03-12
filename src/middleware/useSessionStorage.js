import {
    // reactive
} from 'vue';
export function  useSessionStorage () {
    // const data = reactive({})

    /**
     * 
     * @param {String} getName 
     * @param {Boolean} whether 是(true)否(false)要进行JSON转换,默认不传为转换JSON
     * @returns
     * @todo 获取对应getName的sessionStorage值
     */
    function getSessionStorage(getName, whether) {
        if (arguments.length === 0) {
            console.error(`getSessionStorage 此时参数长度为${arguments.length},参数长度至少为1`)
            return undefined
        }
        if (typeof getName != 'string') {
            console.error(`getSessionStorage typeof ${getName} != 'string'`)
            return undefined
        }

        if (sessionStorage.getItem(getName) === null) {
            console.warn(`getSessionStorage sessionStorage中并无${getName}`)
            return undefined
        }

        if (arguments.length === 2) {
            if (whether === true || whether === false) {
                if (whether) {
                    return toJSONParse(sessionStorage.getItem(getName))
                } else {
                    return toJSONStringify(sessionStorage.getItem(getName))
                }
            } else {
                console.error("getSessionStorage whether参数 true 或者 false")
                return undefined
            }

        } else if (arguments.length > 2) {
            console.error(`getSessionStorage 此时参数长度为${arguments.length},参数长度最大值为2`)
            return undefined
        } else if (arguments.length === 1) {
            // 默认不传whether时,对于JSON进行转换
            return toJSONParse(sessionStorage.getItem(getName))
        }
    }

    /**
     * 
     * @param {String} setName 
     * @param {*} setContent 
     * @returns 
     * @todo 设置setName的sessionStorage值
     */
    function setSessionStorage(setName, setContent) {
        if (arguments.length != 2) {
            console.error(`setSessionStorage 此时参数长度为${arguments.length},参数长度应为2`)
            return undefined
        }

        if (typeof setName != 'string') {
            console.error("setSessionStorage typeof setName != 'string'")
            return undefined
        }

        if (typeof setContent === 'undefined') {
            console.error("setSessionStorage typeof setContent != 'undefined'")
            return undefined
        }

        if (setContent == "") {
            console.error("setSessionStorage setContent != ''")
            return undefined
        }

        return sessionStorage.setItem(setName, toJSONStringify(setContent))
    }

    /**
     * 
     * @param {String} removeName 
     * @returns 
     * @todo 删除某项sessionStorage
     */
    function removeSessionStorage(removeName) {
        if (arguments.length != 1) {
            console.error(`removeSessionStorage 此时参数长度为${arguments.length},参数长度应为1`)
            return undefined
        }

        if (typeof removeName != 'string') {
            console.error(`removeSessionStorage typeof ${removeName} != 'string'`)
            return undefined
        }
    }

    /**
     * 
     * @returns 
     * @todo 清除全部sessionStorage(慎用!)
     */
    function clearSessionStorage() {
        sessionStorage.clear()
    }

    /**
     * 
     * @param {JSON} params 
     * @returns 非JSON字符串
     * @todo JSON=>非JSON
     */
    function toJSONParse(params) {
        return JSON.parse(params)
    }

    /**
     * 
     * @param {*} params 
     * @returns JSON字符串
     * @todo 非JSON=>JSON
     */
    function toJSONStringify(params) {
        return JSON.stringify(params)
    }

    return {
        // data,
        getSessionStorage,
        setSessionStorage,
        removeSessionStorage,
        clearSessionStorage
    }
}