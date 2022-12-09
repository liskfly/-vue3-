import { createApp } from "vue";
import { createPinia } from "pinia";
// 全局注册需要用的vant插件
import { Tabbar, TabbarItem, Swipe, SwipeItem, List, Lazyload, Tab, Tabs } from 'vant';
import App from "./App.vue";
import router from "./router";

// 引入vant样式
import 'vant/lib/index.css';
// 引入重置css样式
import "./assets/reset.css"
// import "./assets/fonts/myfont.css"

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(Tabbar);
app.use(TabbarItem);
app.use(Swipe);
app.use(SwipeItem);
app.use(List);
app.use(Tab);
app.use(Tabs);
app.use(Lazyload, {
    lazyComponent: true,
});

app.mount("#app");
