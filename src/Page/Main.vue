<script setup>

import ChannelList from "@/components/channel_list/ChannelList.vue";
</script>

<template>
  <div id="container">
    <ChannelList/>
    hello
  </div>
</template>

<style scoped>
#container {
  position: fixed;
  display: flex;
  width: 100%;
  height: 100%;
}

#contents {
  display: flex;
  flex: 1;
  background: #1F2123;
}
</style>