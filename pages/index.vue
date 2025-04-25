<script setup>
import { motion } from 'motion-v'
import Img from '~/assets/img/header.jpeg'

const router = useRouter()


</script>

<template>
  <div>
    <div class="w-100">
      <motion.img :src="Img" class="rounded-lg" />
      <div>NL-NVIEW</div>
      <div>万能视图查看器APP</div>
    </div>
  </div>
</template>
