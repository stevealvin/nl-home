<script setup lang="ts">
import { motion } from 'motion-v'
import collect from '~/assets/json/collect.json'

</script>

<template>
  <div>
    <div class="grid min-sm:grid-cols-2 min-md:grid-cols-3 min-lg:grid-cols-4 gap-4">
      <template v-for="item in collect">
        <div>
          <motion.div
            :initial="{
              y: 100,
              opacity: 0,
            }"
            :animate="{
              y: 0,
              opacity: 1,
            }"
            :hover="{
              y: -5,
              scale: 1.03,
              transition: { duration: 0.3 }
            }"
            class="rounded-lg overflow-hidden cursor-pointer aspect-[3/2]"
          >
            <motion.div
              :hover="{
                scale: 1.2,
                transition: { duration: 0.5 }
              }"
            >
              <img
                :src="item.cover"
                loading="lazy"
                fit="cover"
                class="w-full h-full"
              />
            </motion.div>
          </motion.div>
          <div class="flex flex-col gap-[0.125rem] lmt-1">
            <a href="#" class="line-clamp-2 flex-auto">{{ item.video_code }} {{ item.title }}</a>
            <div class="text-[0.8rem]">{{ item.score }}</div>
            <div class="flex justify-between text-[var(--text-color-5)] text-[0.8rem]">
              <span>{{ item.date }}</span>
              <span>{{ item.duration }}</span>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
/* ✅ 加载动画 */
.loading {
    position: absolute;
    width: 50px;
    height: 50px;
    border: 4px solid rgba(255, 255, 255, 0.3);
    border-top: 4px solid #333;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

/* 旋转动画 */
@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>