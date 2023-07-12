<script setup>
import ChannelList from "@/components/channel_list/ChannelList.vue";
import LobbySidebar from "@/components/main/lobby/LobbySidebar.vue";
import Loading from "@/components/Loading.vue";
import {watch} from "vue";
import {useRouter} from "vue-router";
import {useModalStore} from "@/script/store/modal";
import {useChannelListStore} from "@/script/store/channel_list";
import {useUserStore} from "@/script/store/userInfo";

const modalStore = useModalStore();
const channelStore = useChannelListStore();
const userStore = useUserStore();
const route = useRouter()
watch(route.currentRoute, (to,form) => {
  if (to.path !== form.path){
    const channel_type = channelStore.getPathEndPoint;
    console.log(typeof channel_type)
    switch (channel_type){
      case 'lobby':
        break;
      case 'public':
        break;
      default:
        break;
    }
  }
})
userStore.updateMyInfo();
</script>

<template>
  <div id="container">
    <ChannelList/>
    <div id="contents" v-if="route.currentRoute.value.path === '/channel/lobby'">
      <LobbySidebar/>

    </div>
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