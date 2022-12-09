import { ref, onMounted, nextTick } from "vue"

export const refresh = () => {
    const list = ref<any>([]);
    const loading = ref(false);
    const finished = ref(false);

    const onLoad = () => {
        // 异步更新数据
        // setTimeout 仅做示例，真实场景中一般为 ajax 请求
        setTimeout(() => {
            for (let i = 0; i < 10; i++) {
                list.value.push(list.value.length + 1);
            }

            // 加载状态结束
            loading.value = false;

            // 数据全部加载完成
            if (list.value.length >= 40) {
                finished.value = true;
            }
        }, 1000);
    };

    return {
        list,
        onLoad,
        loading,
        finished,
    };
}

export const getDate = (time: any) => {
    let date = new Date(time);
    let str = `${date.getFullYear()}年${date.getMonth() + 1
        }月${date.getDate()}日`;
    return str;
}

export const getIcon = (name: string) => {
    return new URL(`../assets/img/${name}.png`, import.meta.url).href;
}
