<script setup lang="ts">
/*
 * 首页：Hero + 分类卡片网格
 *
 * 数据来源两处，全是编译期就确定的静态数据，故 SSG 阶段能完整渲染：
 *  Hero 文案   src/theme/config/site.ts 的 SITE_TITLE / SITE_DESCRIPTION
 *  分类卡片    src/theme/config/site.ts 的 HOME_CARDS（手写在配置里，link 统一指向该分类首篇）
 */
import { computed } from 'vue'
import { site } from '@/composables/site'
import { flatPosts } from '@/composables/sidebar'

/** 「快速开始」的去向：侧栏第一篇，即全站从头读起的入口 */
const firstPost = computed(() => flatPosts[0]?.link ?? '')
</script>

<template>
  <div class="home">
    <p class="home-logo">{{ site.SITE_TITLE }}</p>
    <p class="home-text">{{ site.SITE_DESCRIPTION }}</p>
    <router-link v-if="firstPost" class="home-btn" :to="firstPost">快速开始</router-link>

    <section class="cards">
      <router-link v-for="card in site.HOME_CARDS" :key="card.text" class="card" :to="card.link">
        <span class="card-title">{{ card.text }}</span>
        <span class="card-desc">{{ card.desc }}</span>
      </router-link>
    </section>
  </div>
</template>

<style scoped>
/* ---- 首页 hero ---- */
.home {
  position: relative;
  padding: 80px 24px 48px;
  text-align: center;
  overflow: hidden;
}

/* 水墨光晕 */
.home::before {
  content: '';
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
  width: 600px;
  height: 320px;
  z-index: -1;
  pointer-events: none;
  background:
    radial-gradient(
      ellipse 400px 160px at 30% 50%,
      color-mix(in srgb, var(--g-color) 8%, transparent),
      transparent 60%
    ),
    radial-gradient(ellipse 300px 140px at 70% 60%, rgba(120, 100, 70, 0.04), transparent 60%);
  animation: inkDrift 14s ease-in-out infinite alternate;
}

@keyframes inkDrift {
  0% {
    transform: translateX(-50%) translateY(0) scale(1);
    opacity: 0.8;
  }
  100% {
    transform: translateX(-50%) translateY(-8px) scale(1.04);
    opacity: 1;
  }
}

/* ---- 站名 ---- */
.home-logo {
  margin: 0;
  display: inline-block;
  font-size: 3.2em;
  font-weight: 750;
  letter-spacing: -0.03em;
  font-family: 'Noto Serif SC', 'Songti SC', 'SimSun', serif;
  color: var(--g-text);
  animation: fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
}

/* 标题下方朱砂装饰线 */
.home-logo::after {
  content: '';
  display: block;
  width: 48px;
  height: 3px;
  background: var(--g-color);
  border-radius: 2px;
  margin: 0.35em auto 0;
  opacity: 0.5;
}

/* ---- 副标题 ---- */
.home-text {
  margin: 24px auto 0;
  max-width: 520px;
  color: color-mix(in srgb, var(--g-text) 62%, transparent);
  font-size: 1.125rem;
  line-height: 1.6;
  font-family: 'Noto Serif SC', 'Songti SC', 'SimSun', serif;
  animation: fadeInUp 0.5s 0.08s cubic-bezier(0.16, 1, 0.3, 1) both;
}

/* ---- CTA 按钮 ---- */
.home-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-top: 32px;
  padding: 10px 24px;
  border: none;
  border-radius: 8px;
  background: var(--g-color);
  color: #fff;
  font-family: inherit;
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  box-shadow: 0 2px 8px color-mix(in srgb, var(--g-color) 12%, transparent);
  animation: fadeInUp 0.5s 0.16s cubic-bezier(0.16, 1, 0.3, 1) both;
  transition:
    background 0.12s cubic-bezier(0.16, 1, 0.3, 1),
    box-shadow 0.2s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.12s cubic-bezier(0.16, 1, 0.3, 1);
}
.home-btn:hover {
  background: var(--g-hover);
  box-shadow: 0 4px 16px color-mix(in srgb, var(--g-color) 20%, transparent);
  transform: translateY(-1px);
}
.home-btn:active {
  transform: scale(0.97);
}

/* ---- 分类卡片网格 ---- */
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
  gap: 12px;
  max-width: 1080px;
  margin: 56px auto 0;
  text-align: left;
}

.card {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 14px 16px;
  border: 1px solid color-mix(in srgb, var(--g-color) 12%, transparent);
  border-radius: 8px;
  text-decoration: none;
  background: color-mix(in srgb, var(--g-bg) 60%, transparent);
  transition:
    border-color 0.12s cubic-bezier(0.16, 1, 0.3, 1),
    background 0.12s cubic-bezier(0.16, 1, 0.3, 1),
    transform 0.12s cubic-bezier(0.16, 1, 0.3, 1);
}

.card:hover {
  border-color: var(--g-color);
  background: color-mix(in srgb, var(--g-color) 6%, transparent);
  transform: translateY(-2px);
}

.card-title {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--g-text);
}

.card:hover .card-title {
  color: var(--g-color);
}

.card-desc {
  font-size: 0.75rem;
  line-height: 1.5;
  color: color-mix(in srgb, var(--g-text) 55%, transparent);
}

/* 装饰性水墨笔触 */
.home::after {
  content: ' ';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--g-color), transparent);
  opacity: 0.15;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 1024px) {
  /* [响应式-md] 平板：卡片网格最小宽略减，间距收窄 */
  .cards {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 16px;
  }
}

@media (max-width: 768px) {
  /* [响应式-sm] 手机 */
  .home {
    padding: 48px 16px 32px;
  }
  .home-logo {
    font-size: 2.4em;
  }
  .home::before {
    width: 100%;
    height: 240px;
  }
  .cards {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    margin-top: 40px;
  }
}

@media (max-width: 480px) {
  /* [响应式-xs] 窄屏：卡片单列全宽，间距进一步收紧 */
  .home {
    padding: 32px 8px 24px;
  }
  .home-logo {
    font-size: 2em;
  }
  .cards {
    grid-template-columns: 1fr;
    gap: 12px;
    margin-top: 24px;
  }
}
</style>
