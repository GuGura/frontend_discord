<script setup>
import ChannelList from "@/components/channel_list/ChannelList.vue";
import Loading from "@/components/Loading.vue";
import {onMounted, watch} from "vue";
import {useRouter} from "vue-router";
import {useModalStore} from "@/script/store/modal";
import {useChannelListStore} from "@/script/store/channel_list";
import {useUserStore} from "@/script/store/userInfo";
import {useFriendStore} from "@/script/store/friend";
import Lobby from "@/components/main/lobby/Lobby.vue";
import ChannelSidebar from "@/components/main/channel/ChannelSidebar.vue";

const modalStore = useModalStore();
const channelStore = useChannelListStore();
const userStore = useUserStore();
const friendStore = useFriendStore();
const route = useRouter()


watch(route.currentRoute, (to,form) => {
  console.log(to.path)
  if (to.path !== form.path){
    const channel_type = 1;
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
function init(){

}
init()
onMounted(()=>{
  channelStore.initBtn()
})

userStore.updateMyInfo();
friendStore.initFriendList();
</script>

<template>
  <div id="container">
    <ChannelList/>
    <div id="contents" v-if="route.currentRoute.value.path === '/channel/lobby'">
      <Lobby/>
    </div>
    <div id="contents" v-else>
      <ChannelSidebar/>

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