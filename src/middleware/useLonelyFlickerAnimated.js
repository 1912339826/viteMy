import {
    reactive,
    onUnmounted,
    ref
} from 'vue';
export default  function useLonelyFlickerAnimated () {
    const DataLonelyFlickerAnimated = reactive({
        visible: true //显示和隐藏
    });
    let CurrentDataLonelyFlickerAnimated = reactive({
        content: {}
    }); //当前动画数据,类型不固定
    let ChangeLonelyFlickerAnimated = ref(0); //当前动画数据下标
    let ListLonelyFlickerAnimated = ref([]); //动画数据
    let TimerValLonelyFlickerAnimated = null; //时间函数
    /**
     * @todo 主方法(孤独的闪烁)
     * @author anranran
     */
    function LonelyFlickerAnimated() {
        CurrentDataLonelyFlickerAnimated.content = {
            ...ListLonelyFlickerAnimated.value[ChangeLonelyFlickerAnimated.value]
        };
        if (TimerValLonelyFlickerAnimated) clearInterval(TimerValLonelyFlickerAnimated);
        TimerValLonelyFlickerAnimated = setInterval(() => {
            if (!DataLonelyFlickerAnimated.visible) {
                // 出现和消失是两个动画,出现时++,消失时不用++
                ChangeLonelyFlickerAnimated.value++;
                if (ChangeLonelyFlickerAnimated.value == ListLonelyFlickerAnimated.value.length + 1) {
                    ChangeLonelyFlickerAnimated.value = 0;
                }
            }
            CurrentDataLonelyFlickerAnimated.content = {
                ...ListLonelyFlickerAnimated.value[ChangeLonelyFlickerAnimated.value]
            };
            DataLonelyFlickerAnimated.visible = !DataLonelyFlickerAnimated.visible;
        }, 2000);
    }

    /**
     * 
     * @param {Array} params 承接的主数据流
     */

    function IntermediateRelayLonelyFlickerAnimated(params) {
        ListLonelyFlickerAnimated.value = params;
    }

    onUnmounted(() => {
        if (!!TimerValLonelyFlickerAnimated) {
            clearInterval(TimerValLonelyFlickerAnimated);
        }
    });
    return {
        DataLonelyFlickerAnimated,
        LonelyFlickerAnimated,
        CurrentDataLonelyFlickerAnimated,
        IntermediateRelayLonelyFlickerAnimated
    }
}