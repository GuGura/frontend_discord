<script setup>
import ChannelList from "@/components/channel_list/ChannelList.vue";
import Loading from "@/components/Loading.vue";
import {useModalStore} from "@/script/store/modal";

const modalStore = useModalStore();
</script>

<template>
  <div id="container">
    <ChannelList/>
    <Loading v-if="modalStore.modal.loading"/>
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