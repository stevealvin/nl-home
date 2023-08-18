<script setup>
const route = useRoute()
const url = route.query.url
</script>

<template>
  <ThePlayer :src="url" />
</template>