<script setup>
import ChannelList from "@/components/channel_list/ChannelList.vue";
import Loading from "@/components/Loading.vue";
import {onMounted} from "vue";
import {useRouter} from "vue-router";
import {useModalStore} from "@/script/store/modal";
import {useChannelListStore} from "@/script/store/channel_list";
import {useUserStore} from "@/script/store/userInfo";
import {useFriendStore} from "@/script/store/friend";
import {useSocketStore} from "@/script/operations/socket";
import Lobby from "@/components/main/lobby/Lobby.vue";

import Channel from "@/components/main/channel/Channel.vue";
import PublicPage from "@/components/main/public/PublicPage.vue";

const modalStore = useModalStore();
const channelListStore = useChannelListStore();
const userStore = useUserStore();
const friendStore = useFriendStore();
const socketStore = useSocketStore();
const route = useRouter()



onMounted(async () => {
  await channelListStore.initBtn();
  await userStore.updateMyInfo();
  friendStore.initFriendList();
  socketStore.connectSocket();
});


</script>

<template>
  <div id="container">
    <ChannelList/>
    <div id="contents" v-if="route.currentRoute.value.path === '/channel/lobby'">
      <Lobby/>
    </div>
    <div id="contents" v-else-if="route.currentRoute.value.path === '/channel/public'">
      <PublicPage/>
    </div>
    <div id="contents" v-else>
      <Channel/>
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