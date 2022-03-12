import {
    // reactive
} from 'vue';
// 
// 对于表单中需要暂存的数据进行储存(仅用于vue3.x).
// 此储存在sessionStorage中的名称是固定的
// 需要在表单进行了保存操作后(对于数据库进行了操作)主动进行清理工作(removeSessionStorage('formSessionStorageList'))
// 值formSessionStorageList只用于记录当前表单各项name(亦或者其他被定义为key的),结构为:例:["name","sex"]
import {
    useSessionStorage
} from '@/middleware/useSessionStorage.js'
export function useFormSessionStorageList () {
    const {
        getSessionStorage,
        setSessionStorage,
        removeSessionStorage
    } = useSessionStorage()
    // const data = reactive({})
    /**
     * @param {*} setContent 
     * @param {String} setName
     * @todo 为formSessionStorageList设置值(formSessionStorageList为数组)
     */
    function setFormSessionStorageList(setName, setContent) {
        let formSessionStorageList = [];
        if (getSessionStorage("formSessionStorageList") === undefined) { // 查看sessionStorage中是否存在formSessionStorageList
            formSessionStorageList = [];
        } else {
            formSessionStorageList = getSessionStorage("formSessionStorageList"); //获取现有数组
        }

        let index = formSessionStorageList.indexOf(setName);
        if (index > -1) {
            // 之前设置过setName
        } else {
            // 没有设置
            formSessionStorageList.push(setName);
        }

        setSessionStorage("formSessionStorageList", formSessionStorageList);
        setSessionStorage(setName, setContent);
    }

    /**
     * @todo 获取formSessionStorageList中对应的值
     * @returns setName
     */
    function getFormSessionStorageList(setName) {
        return getSessionStorage(setName)
    }

    /**
     * @param {String} removeName
     */
    function removeFormSessionStorageList(removeName) {
        if (getSessionStorage("formSessionStorageList") != undefined) {
            let list = getSessionStorage("formSessionStorageList");
            let index = list.indexOf(removeName)
            if (index > -1) {
                list.splice(index, 1) //删除formSessionStorageList中对应的removeName
                removeSessionStorage(removeName)
                setSessionStorage("formSessionStorageList", list)
            } else {
                console.warn(`formSessionStorageList中并无${removeName}`)
            }

        } else {
            console.warn("formSessionStorageList并无任何东西...")
        }
    }

    /**
     * @todo 获取formSessionStorageList值
     * @returns Array
     */
    function getFormSessionStorageLists() {
        return getSessionStorage("formSessionStorageList")
    }

    /**
     * 
     * @param {Array} setArray 
     * @param {Boolean} whether 默认为false,即:不建议使用此方法!(除非第一次进入form时的初始化)
     */
    function setFormSessionStorageLists(setArray, whether) {
        console.warn("不建议使用setFormSessionStorageLists!你正在做一件很危险的事情!除非第一次进入form时的初始化!")
        if (arguments.length < 2) {
            console.error(`setFormSessionStorageLists 此时参数长度为${arguments.length},参数长度应为2`)
            return undefined
        }

        if (!whether) {
            console.error("setFormSessionStorageLists 并没有执行")
            return undefined
        }

        if (whether) {
            setSessionStorage("formSessionStorageList", setArray)
        }
    }

    /**
     * @todo 对于formSessionStorageList以及相关进行删除
     */
    function removeFormSessionStorageLists() {
        if (getSessionStorage("formSessionStorageList") != undefined) {
            if (getSessionStorage("formSessionStorageList").length == 0) {
                removeSessionStorage("formSessionStorageList");
            } else {
                let list = getSessionStorage("formSessionStorageList");
                for (let index = 0; index < list.length; index++) {
                    const element = list[index];
                    removeSessionStorage(element)
                }
                removeSessionStorage("formSessionStorageList");
            }
        } else {
            console.warn("formSessionStorageList并无任何东西...")
        }

    }

    return {
        // data,
        setFormSessionStorageList,
        getFormSessionStorageList,
        removeFormSessionStorageList,
        getFormSessionStorageLists,
        setFormSessionStorageLists,
        removeFormSessionStorageLists
    }
}