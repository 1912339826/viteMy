import {
    reactive,
    toRefs
} from 'vue';
let evaluationGradeEnum = {
    //测试
    '-1': {
        name: "待定",
        text: "待定",
        id: "-1",
        value: "-1",
        classType: "desText",
    },
    '0': {
        name: "较差",
        text: "较差",
        value: "0",
        id: "0",
        classType: "theme_red",
    },
    '1': {
        name: "尚可",
        text: "尚可",
        value: "1",
        id: "1",
        classType: "active_g",
    },
    '2': {
        name: "良好",
        text: "良好",
        value: "2",
        id: "2",
        classType: "active_g",
    },
    '3': {
        name: "优秀",
        text: "优秀",
        value: "3",
        id: "3",
        classType: "active_g",
    }
}
export function UseTheDictionaryExtract() {
    const data = reactive({
        listen_picker_columns_array: filterArray( //测试
            formatLocalEnums(evaluationGradeEnum),
            ['优秀', '良好', '尚可', '较差'],
            'name'
        ),
    })
    /**
     * @export 将枚举值转化成选项
     * @param  { Object } options 枚举值
     * @return { Array } 
     */
    function formatLocalEnums(options) {
        let targetArr = [];
        for (let k in options) {
            targetArr.push({
                ...options[k],
            });
        }
        return targetArr;
    }
    /**
     * @todo 对于提交项的处理
     * @param {Object} rec 原
     * @param {String} dictionaries 需要使用到的字典表(被转化为数组之后,也可以是类字典的数组)
     * @param {String} waterFilter 需要使用到filterArray()方法中的waterFilter项,即需要过滤的属性
     * @param {String} acquire 需要的项
     */
    function HandlingOfSubmissions(rec, dictionaries, waterFilter, acquire) {
        let obj = {}
        let newObj = {}
        for (const key in rec) {
            if (Object.hasOwnProperty.call(rec, key)) {
                const element = rec[key]
                obj[key] = filterArray(dictionaries, [element], waterFilter)[0] || ''
                if (obj[key].name) {
                    newObj[key] = obj[key][acquire].toString()
                }
            }
        }
        return newObj
    }

    /**
     * @todo 根据多个属性值筛选
     * @param { Array } namma 原数组
     * @param { Array } cistern 多个属性值
     * @param { String } waterFilter 需要过滤的属性
     * @returns { Array } 被过滤之后的数组
     */
    function filterArray(namma, cistern, waterFilter) {
        let result = []
        for (let i = 0; i < cistern.length; i++) {
            result.push(namma.find((item) => item[waterFilter] == cistern[i]))
        }
        return result
    }
    return {
        ...toRefs(data),
        HandlingOfSubmissions,
        evaluationGradeEnum
    }
}