import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import Layout from './Layout.vue'
import 'katex/dist/katex.min.css'

export default {
  extends: DefaultTheme,
  Layout,
} satisfies Theme
