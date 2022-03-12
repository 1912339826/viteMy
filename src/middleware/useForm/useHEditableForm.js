import {
    reactive,
    toRefs,
    ref,
    onMounted,
    watchEffect
} from 'vue'
import lodash from "lodash";
/**
 * @todo 可编辑表单
 * @returns 共有的方法和变量
 */
export function useHEditableForm() {
    const FormRef = ref(null); //接收当前van-form ref
    const formObjLists = ref([]); //接收数据结构
    let obj = {
        a: 11,
        b: 22,
        c: 111
    };
    console.log(lodash.pick(obj, "a", "b"));
    const Data = reactive({

    })

    /**
     * @todo 有关可编辑表单的配置项  
     * @param {Object} beAssociatedWith 有关联的
     */
    const configEditableForm = reactive({
        /**
         * @param {Object} precondition (beAssociatedWith.precondition) 前置条件-所需要的
         * @param {Object} update (beAssociatedWith.update) 更新后-所要进行的动作
         */
        beAssociatedWith: {
            /**
             * @param {Object} required (beAssociatedWith.precondition.required) 前置条件-必填项
             */
            precondition: {
                required: {}
            },
            /**
             * @param {Object} reset (beAssociatedWith.update.reset) 更新后-重置项
             */
            update: {
                reset: {}
            }
        }
    })

    const input = reactive({
        clickInputFormValue: {}, //当前点击输入区域项value
        clickInputFormKey: "", //当前点击输入区域项key
    })

    function onSubmitForm(params) {
        console.log(params)
        console.log(FormRef.value)
    }

    function FormRefRepeaters() {
        // 唯一的
        // params.value.submit()
        console.log(FormRef.value)
    }

    /**
     * @param {String} key 
     * @param {Object} params 
     * @todo 当前点击输入区域
     */
    function clickInputForm(key, params) {
        input.clickInputFormValue = params;
        input.clickInputFormKey = key;
        FuncValidate("cityId")
    }

    /**
     * @todo 此项修改时,所要清除的项
     */
    function FuncSufferIndexFormValue() {
        let arr = input.clickInputFormValue.sufferIndexFormValue ? input.clickInputFormValue.sufferIndexFormValue : []; //获取需要清除的项数组
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];
            formObjLists.value[element].model = {
                Display: "",
                submit: ""
            }
        }
    }

    /**
     * @todo 验证表单，支持传入 name 来验证单个或部分表单项 
     * @param {String} name 表单项name
     * @returns Promise
     */
    function FuncValidate(name) {
        // then catch
        console.log(name)
        FormRef.value.validate(name).then((res) => {
            console.log(res, '111')
        }).catch((err) => {
            console.log(err, '2222')
        })
    }



    /**
     * @param {*} params 
     * @todo 对于表单初始架构数据的预处理
     */
    function objListProcessorForm(params) {
        console.log(params)
    }

    /**
     * @todo 当前项输入框内容变化时触发
     * @param {*} a 具体变化内容
     */
    function FuncUpdateInputForm() {
        // console.log(a)
    }

    onMounted(() => {
        FormRefRepeaters();
    })

    watchEffect(() => {
        if (formObjLists.value[input.clickInputFormKey]) {
            // 监听当前项值变化
            input.clickInputFormValue = formObjLists.value[input.clickInputFormKey];
            FuncSufferIndexFormValue()
        }
    })

    return {
        ...toRefs(Data),
        configEditableForm,
        onSubmitForm,
        clickInputForm,
        objListProcessorForm,
        FuncUpdateInputForm,
        FormRef,
        formObjLists
    }
}