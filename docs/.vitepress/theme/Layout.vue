<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'

const { Layout } = DefaultTheme
const year = new Date().getFullYear()
</script>

<template>
  <Layout>
    <template #layout-bottom>
      <footer class="site-footer">© {{ year }} note · Powered by VitePress</footer>
    </template>
  </Layout>
</template>

<style scoped>
/* 全站页脚：文档页也显示，样式沿用 VitePress 的分隔线与文字色 */
.site-footer {
  padding: 24px;
  border-top: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-3);
  font-size: 13px;
  text-align: center;
}
</style>
