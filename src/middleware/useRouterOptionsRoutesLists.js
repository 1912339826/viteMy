import {
    reactive,
    ref,
    toRefs
} from 'vue';
import {
    useRouter
} from "vue-router";

export function useRouterOptionsRoutesLists() {
    const data = reactive({
        RouterOptionsRoutesListsRef: []
    })
    const router = useRouter();
    const optionsRoutes = ref(router.options.routes);
    for (let index = 0; index < optionsRoutes.value.length; index++) {
        const element = optionsRoutes.value[index];
        if (element.component) {
            data.RouterOptionsRoutesListsRef.push({
                path: element.path,
                meta: element.meta,
                children: element.children
            })
        }

    }
    return {
        ...toRefs(data)
    }
}