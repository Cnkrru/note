<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch, onBeforeUnmount } from 'vue'
import { headings, active, jump, mount, unmount } from '../../composables/post.ts'
import { menuOpen } from '../../composables/menu.ts'
import Caret from '../icon/Caret.vue'

onMounted(() => mount())
onUnmounted(() => unmount())

/* ============ 移动端：吸顶导航条 + 居中目录 dialog ============ */
const open = ref(false)
// 顶栏实际高度：手机端顶栏换行后高于 56px，吸顶偏移需实测
const navHeight = ref(56)

function measureHeader() {
  const header = document.querySelector('.header') as HTMLElement | null
  if (header) navHeight.value = header.offsetHeight
}

function toggle() {
  open.value = !open.value
}

// Esc 关闭
function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') open.value = false
}

watch(open, (value) => {
  // 展开时锁定页面滚动，防止滚动穿透
  document.body.style.overflow = value ? 'hidden' : ''
  if (value) document.addEventListener('keydown', onKeydown)
  else document.removeEventListener('keydown', onKeydown)
})

onMounted(() => {
  measureHeader()
  window.addEventListener('resize', measureHeader)
})

onBeforeUnmount(() => {
  document.body.style.overflow = ''
  document.removeEventListener('keydown', onKeydown)
  window.removeEventListener('resize', measureHeader)
})

// 点击目录项：收起 + 跳转
function onJump(id: string) {
  open.value = false
  jump(id)
}

// 回到顶部
function scrollToTop() {
  open.value = false
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
}
</script>

<template>
  <!--
    移动端吸顶导航条（≤1024px）：菜单 + 目录两个按钮
    列表展示统一用居中 dialog（菜单 dialog 在 Post.vue，目录 dialog 在此）
  -->
  <div
    v-if="headings.length"
    class="toc-bar"
    :style="{ '--nav-h': navHeight + 'px' }"
  >
    <button
      class="toc-bar-menu"
      type="button"
      :aria-expanded="menuOpen"
      @click="menuOpen = !menuOpen"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
      <span>菜单</span>
    </button>
    <button
      class="toc-bar-btn"
      :class="{ open }"
      type="button"
      :aria-expanded="open"
      @click="toggle"
    >
      <span>目录</span>
      <Caret class="caret" />
    </button>
  </div>

  <!-- 居中目录 dialog：传送到 body 渲染 —— 父级 .toc-bar 有 backdrop-filter，
       会让 fixed 相对它而非视口定位，遮罩宽度被压缩；脱离后 fixed 恒相对视口 -->
  <Teleport to="body">
    <Transition name="dialog">
      <div v-if="open" class="toc-dialog-mask" @click="open = false">
        <div class="toc-dialog" @click.stop>
          <div class="dialog-head">
            <span>目录</span>
            <button class="dialog-close" type="button" aria-label="关闭" @click="open = false">✕</button>
          </div>
          <div class="dialog-list">
            <p
              v-for="h in headings"
              :key="h.id"
              class="dialog-item"
              :class="{ 'dialog-item-on': active === h.id }"
              :style="{ paddingLeft: 6 + (h.level - 1) * 12 + 'px' }"
              @click="onJump(h.id)"
            >
              {{ h.text }}
            </p>
          </div>
          <div class="dialog-foot">
            <button class="top-link" type="button" @click="scrollToTop">回到顶部</button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>

  <aside class="toc-sidebar">
    <div v-if="headings.length" class="toc-box">
      <div class="toc-head">
        <span>目录</span>
      </div>
      <div class="toc-list">
        <p
          v-for="h in headings"
          :key="h.id"
          class="toc-item"
          :class="{ 'toc-item-on': active === h.id }"
          :style="{ paddingLeft: 6 + (h.level - 1) * 12 + 'px' }"
          @click="jump(h.id)"
        >
          {{ h.text }}
        </p>
      </div>
    </div>
  </aside>
</template>

<style scoped>
/* 常驻侧栏：sticky 吸在 .main-body 顶部，正文滚动时目录固定在右侧可视区 */
.toc-sidebar {
  position: sticky;
  top: 56px;
  align-self: flex-start;
  flex-shrink: 0;
  width: 220px;
  max-height: calc(100vh - 56px - var(--space-sm) - 2 * var(--space-xs));
  overflow-y: auto;
  box-sizing: border-box;
  padding: var(--space-xs) 0;
  margin-top: var(--space-sm);
}
.toc-box {
  border-left: var(--border-width) solid color-mix(in srgb, var(--g-color) 25%, transparent);
}
.toc-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px var(--space-sm);
  font-size: 13px;
  font-weight: 600;
  color: var(--g-text);
}
.toc-list {
  display: flex;
  flex-direction: column;
  padding: 0 var(--space-xs);
}
.toc-item {
  margin: 1px 0;
  padding: 4px var(--space-sm);
  font-size: 13px;
  line-height: 1.5;
  color: var(--g-text);
  border-left: 2px solid transparent;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  transition:
    color 0.15s ease,
    background 0.15s ease;
}
.toc-item:hover {
  color: var(--g-color);
  background: color-mix(in srgb, var(--g-color) 8%, transparent);
}
.toc-item-on,
.toc-item-on:hover {
  color: var(--g-color);
  background: color-mix(in srgb, var(--g-color) 10%, transparent);
  border-left-color: var(--g-color);
  font-weight: 600;
}
/* ====================<响应式>==================== */
@media (max-width: 1280px) {
  .toc-sidebar {
    width: 200px;
  }
}
@media (max-width: 1024px) {
  /* [响应式-md] 平板：目录侧栏关闭，交给吸顶导航条的「目录」dialog */
  .toc-sidebar {
    display: none;
  }
}
@media (max-width: 768px) {
  .toc-sidebar {
    display: none;
  }
}

/* ====================<吸顶导航条>==================== */
/* 桌面端隐藏；≤1024px 显示（菜单 + 目录） */
.toc-bar {
  display: none;
}
.toc-bar-menu,
.toc-bar-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 4px;
  border: none;
  background: none;
  color: color-mix(in srgb, var(--g-text) 62%, transparent);
  font-family: inherit;
  font-size: 13px;
  font-weight: 500;
  line-height: 2;
  cursor: pointer;
  transition: color 0.25s ease;
}
.toc-bar-menu:hover,
.toc-bar-btn:hover,
.toc-bar-btn.open {
  color: var(--g-text);
}
.toc-bar-menu svg {
  width: 14px;
  height: 14px;
}
.toc-bar-btn .caret {
  transition: transform 0.25s ease;
}
.toc-bar-btn.open .caret {
  transform: rotate(90deg);
}
@media (max-width: 1024px) {
  /* 吸顶于顶栏下方，通栏宽度，毛玻璃 + 底部分隔线 */
  .toc-bar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    order: -1;
    position: sticky;
    top: var(--nav-h);
    z-index: 90;
    /* 通栏：负边距精确抵消 .main 的内边距（16px），不用 100vw —— 它含滚动条宽度会撑出横向溢出 */
    margin-left: -16px;
    margin-right: -16px;
    padding: 0 var(--space-md);
    box-sizing: border-box;
    margin-bottom: var(--space-md);
    background: color-mix(in srgb, var(--g-bg) 85%, transparent);
    -webkit-backdrop-filter: saturate(180%) blur(16px);
    backdrop-filter: saturate(180%) blur(16px);
    border-bottom: 1px solid color-mix(in srgb, var(--g-color) 12%, transparent);
  }
}
@media (max-width: 768px) {
  /* [响应式-sm] 手机：.main 内边距收窄为 12px，负边距同步抵消 */
  .toc-bar {
    margin-left: -12px;
    margin-right: -12px;
  }
}
@media (max-width: 480px) {
  /* [响应式-xs] 窄屏：.main 内边距收窄为 8px，负边距同步抵消 */
  .toc-bar {
    margin-left: -8px;
    margin-right: -8px;
  }
}

/* ====================<居中目录 dialog>==================== */
.toc-dialog-mask {
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
.toc-dialog {
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
.dialog-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid color-mix(in srgb, var(--g-color) 10%, transparent);
  font-size: 14px;
  font-weight: 600;
  color: var(--g-text);
}
.dialog-close {
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
.dialog-close:hover {
  color: var(--g-text);
  background: color-mix(in srgb, var(--g-color) 10%, transparent);
}
.dialog-list {
  flex: 1;
  overflow-y: auto;
  overscroll-behavior: contain;
  padding: var(--space-sm) 0;
}
.dialog-item {
  margin: 1px 0;
  padding: 8px 16px;
  font-size: 13px;
  line-height: 1.5;
  color: var(--g-text);
  border-left: 2px solid transparent;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
}
.dialog-item:hover {
  color: var(--g-color);
  background: color-mix(in srgb, var(--g-color) 8%, transparent);
}
.dialog-item-on,
.dialog-item-on:hover {
  color: var(--g-color);
  font-weight: 600;
  border-left-color: var(--g-color);
}
.dialog-foot {
  padding: 4px 8px;
  border-top: 1px solid color-mix(in srgb, var(--g-color) 10%, transparent);
  text-align: center;
}
.top-link {
  padding: 8px 16px;
  border: none;
  background: none;
  font-size: 13px;
  font-weight: 500;
  color: var(--g-color);
  cursor: pointer;
}
.top-link:hover {
  opacity: 0.8;
}
/* dialog 弹出动画：淡入 + 轻微放大 */
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
.dialog-enter-active .toc-dialog {
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}
.dialog-enter-from .toc-dialog {
  transform: scale(0.96);
}
</style>
