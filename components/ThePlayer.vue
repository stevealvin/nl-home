<script setup>
// import DPlayer from 'dplayer'
// import Hls from 'hls.js'

const props = defineProps({
  src: String,
  autoplay: Boolean,
})

// onMounted(() => {
//   const dp = new DPlayer({
//       container: document.getElementById('dplayer'),
//       autoplay: true,
//       video: {
//         autoplay: true,
//         url: props.src,
//         // url: 'http://liveop.cctv.cn/hls/4KHD/playlist.m3u8',
//         // url: 'https://t21.cdn2020.com/video/m3u8/2023/04/13/6b00abe1/index.m3u8',
//         type: 'hls',
//         customType: {
//           hls: function (video, player) {
//             const hls = new Hls()
//             hls.loadSource(player.options.video.url)
//             hls.attachMedia(video)
//           },
//         },
//       },
//   })
// })


</script>

<template>
  <div id="dplayer"></div>
</template>