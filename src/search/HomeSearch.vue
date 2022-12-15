<script setup lang="ts">
import { ref } from 'vue';
import { showToast } from 'vant';


const value = ref('');
const onSearch = (val: string) => showToast(val);
const onCancel = () => window.history.go(-1)
// const search = () => {
//     return {
//         value,
//         onSearch,
//         onCancel,
//     };
// }
// search()


</script>

<template>
    <form action="/">
        <van-search shape="round" v-model="value" show-action placeholder="搜索文章、标签、栏目、单行本、音频" @search="onSearch"
            @cancel="onCancel" />
    </form>

    <div v-show="true" class="nav">
        <ul class="nav-bar">
            <router-link tag="li" class="nav-item" to="/home/home-search/tag">
                <i><img src="../assets/img/OV.png" alt="标签" /></i>
                <span>标签</span>
            </router-link>

            <router-link tag="li" class="nav-item" to="/home/home-search/magazine">
                <i><img src="../assets/img/dQ.png" alt="杂志栏目" /></i>
                <span>杂志栏目</span>
            </router-link>

            <router-link tag="li" class="nav-item" to="/home/home-search/singles">
                <i><img src="../assets/img/jT.png" alt="单行本" /></i>
                <span>单行本</span>
            </router-link>

            <router-link tag="li" class="nav-item" to="/audio/search">
                <i><img src="../assets/img/0q.png" alt="音频" /></i>
                <span>音频</span></router-link>
        </ul>
    </div>
</template>

<style lang="scss">
.van-search__action {
    color: blue;
}
</style>

<style lang="scss" scoped>
.nav {
    margin-top: 1vh;
    margin-bottom: 3vh;
    padding-bottom: 3vh;
    border-bottom: 1px solid rgba(119, 119, 119, 0.3);

    .nav-bar {
        width: 100vw;
        display: flex;
        justify-content: space-around;

        .nav-item {
            display: flex;
            flex-direction: column;
            text-align: center;

            i {
                margin-bottom: 1vh;

                img {
                    width: 15vw;
                    height: 15vw;
                }
            }

            span {
                color: rgba(119, 119, 119, 0.6);
            }
        }
    }
}
</style>