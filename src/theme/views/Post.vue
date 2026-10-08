<script setup lang="ts">
import { computed, watch, type Component } from 'vue'
import { useRoute } from 'vue-router'
import { menuOpen } from '@/composables/menu'
import PostToc from '@/components/post/PostToc.vue'
import PostSidebar from '@/components/post/PostSidebar.vue'
import Render from '@/components/post/Render.vue'
import PostNav from '@/components/post/PostNav.vue'
import PostUpdate from '@/components/post/PostUpdate.vue'
import PostEdit from '@/components/post/PostEdit.vue'
const route = useRoute()
// pathMatch 是可重复参数，嵌套文章的 id 含斜杠（如 guide/install），需拼回完整 id
const postKey = computed(() => (route.params.pathMatch as string[]).join('/'))
// id 含子目录 → 产物落 .cache/<子目录>/<id>.vue，glob 必须递归（'**'），单星只匹配一层
const comps = import.meta.glob<{ default: Component }>('/.cache/**/*.vue', { eager: true })
const content = computed(() => comps[`/.cache/${postKey.value}.vue`]?.default ?? null)
// 路由切换时收起移动端菜单抽屉
watch(() => route.fullPath, () => {
  menuOpen.value = false
})
// 菜单弹窗打开时锁定页面滚动，防止滚动穿透（与目录弹窗一致）
watch(menuOpen, (value) => {
  document.body.style.overflow = value ? 'hidden' : ''
})
</script>

<template>
  <div class="post">
    <!-- 移动端菜单 dialog：传送到 body 渲染，脱离 .post 容器约束，fixed 恒相对视口 -->
    <Teleport to="body">
      <Transition name="dialog">
        <div v-if="menuOpen" class="menu-mask" @click="menuOpen = false">
          <div class="menu-dialog" @click.stop>
            <div class="menu-head">
              <span>菜单</span>
              <button class="menu-close" type="button" aria-label="关闭" @click="menuOpen = false">✕</button>
            </div>
            <div class="menu-body"><PostSidebar /></div>
          </div>
        </div>
      </Transition>
    </Teleport>
    <aside class="post-sidebar"><PostSidebar /></aside>

    <div class="post-main">
      <Render v-if="content">
        <component :is="content" />
      </Render>

      <div class="mian-footer">
        <div class="el">
          <PostUpdate />
          <div class="links">
            <PostEdit />
          </div>
        </div>
        <PostNav />
      </div>
    </div>

    <PostToc />
  </div>
</template>

<style scoped>
/* ---- 文档页三栏：左侧栏 + 正文 + 右侧目录，横向 flex ---- */
/* align-items: flex-start —— 两个侧栏不被正文高度拉伸，各自 sticky 才能生效 */
.post {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 32px;
  padding: 24px 0;
}

/* ---- 左侧栏：定宽 + sticky 吸在顶栏下方 ---- */
.post-sidebar {
  flex: 0 0 240px;
  position: sticky;
  top: 56px;
  align-self: flex-start;
  max-height: calc(100vh - 56px - 2 * var(--space-xs));
  overflow-y: auto;
  box-sizing: border-box; /* 无全局 border-box 重置，须显式声明，否则 padding 会把滚动区撑破 max-height */
  /* 上下留白：滚动条不贴容器顶/底边，末项也不被滑块压住 */
  padding: var(--space-xs) 0;
}

/* ---- 正文列：吃掉剩余宽度，min-width: 0 防止长代码块撑破布局 ---- */
.post-main {
  flex: 1 1 auto;
  min-width: 0;
}

/* ---- 正文底部：元信息行 + 上下篇导航，桌面横向 / 移动纵向 ---- */
.mian-footer {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--space-md);
  margin-top: 48px;
  padding-top: 24px;
  border-top: 1px solid color-mix(in srgb, var(--g-color) 12%, transparent);
}

/* ---- 元信息行：更新时间在左，编辑/历史入口靠右 ---- */
.el {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--space-sm);
  margin-bottom: 0;
  flex: 0 1 auto;
  min-width: 0;
}

.links {
  display: flex;
  align-items: center;
  gap: var(--space-md);
}

/* ---- 响应式 ---- */
@media (max-width: 1280px) {
  /* [响应式-lg] 大屏：三栏间距略收 */
  .post {
    gap: 24px;
  }
}

@media (max-width: 1024px) {
  /* [响应式-md] 平板：纵向布局，左栏隐藏由「菜单」dialog 接管，目录由「目录」dialog 接管 */
  .post {
    flex-direction: column;
    gap: 0;
    padding: 16px 0;
  }
  .post-sidebar {
    display: none;
  }
  /* 菜单 dialog：遮罩 + 居中弹窗 */
  .menu-mask {
    position: fixed;
    inset: 0;
    z-index: 300;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--space-lg);
    background: rgba(0, 0, 0, 0.45);
    -webkit-backdrop-filter: blur(4px);
    backdrop-filter: blur(4px);
  }
  .menu-dialog {
    display: flex;
    flex-direction: column;
    width: min(90vw, 420px);
    max-height: 70vh;
    border: 1px solid color-mix(in srgb, var(--g-color) 15%, transparent);
    border-radius: var(--radius-lg);
    background: color-mix(in srgb, var(--g-bg) 96%, transparent);
    box-shadow: 0 16px 48px var(--g-shadow);
    overflow: hidden;
  }
  .menu-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    border-bottom: 1px solid color-mix(in srgb, var(--g-color) 10%, transparent);
    font-size: 14px;
    font-weight: 600;
    color: var(--g-text);
  }
  .menu-close {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
    border: none;
    border-radius: var(--radius-sm);
    background: none;
    color: color-mix(in srgb, var(--g-text) 55%, transparent);
    font-size: 13px;
    cursor: pointer;
  }
  .menu-close:hover {
    color: var(--g-text);
    background: color-mix(in srgb, var(--g-color) 10%, transparent);
  }
  .menu-body {
    flex: 1;
    overflow-y: auto;
    overscroll-behavior: contain;
  }
  /* dialog 弹出动画 */
  .dialog-enter-active {
    transition: opacity 0.2s ease-out;
  }
  .dialog-leave-active {
    transition: opacity 0.15s ease-in;
  }
  .dialog-enter-from,
  .dialog-leave-to {
    opacity: 0;
  }
  .dialog-enter-active .menu-dialog {
    transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .dialog-enter-from .menu-dialog {
    transform: scale(0.96);
  }
}

@media (max-width: 768px) {
  /* [响应式-sm] 手机：纵向布局，目录工具条（PostToc 内 .toc-bar）置顶接管导航 */
  .post {
    flex-direction: column;
    gap: 0;
    padding: 16px 0;
  }
  /* 底部区域纵向堆叠：元信息在上，上下篇导航在下 */
  .mian-footer {
    flex-direction: column;
    align-items: stretch;
  }
  .el {
    justify-content: flex-start;
  }
}

@media (max-width: 480px) {
  /* [响应式-xs] 窄屏：正文上下间距进一步收紧 */
  .post {
    padding: 8px 0;
  }
  .mian-footer {
    margin-top: 32px;
    padding-top: 16px;
  }
}
</style>
