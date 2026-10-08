import { ref } from 'vue'

/*
 * 移动端菜单抽屉开关（模块级单例状态）
 * PostToc 本地导航条的「菜单」按钮 ↔ Post.vue 的 .post-sidebar 抽屉
 * 跨组件共享，无需 provide/inject
 */
export const menuOpen = ref(false)
