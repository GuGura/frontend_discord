<script setup>
import {defineProps} from 'vue'
import {useModalStore} from "@/script/store/modal";
import {useRouter} from "vue-router";
import {useChannelListStore} from "@/script/store/channel_list";
import {useChannelStore} from "@/script/store/channel";

const modalStore = useModalStore();
const channelList = useChannelListStore();
const channelStore = useChannelStore();
const router = useRouter();

const props = defineProps({
  channel_UID: Number,
  user_UID: Number,
  channel_title: String,
  channel_icon_url: String,
  channel_type: String,
})

function btnClick() {
  if (props.channel_title === 'addServer') {
    modalStore.open('addServer');
  }
  let endPoint = props.channel_type;
  if (!(endPoint === 'lobby') && !(endPoint === 'addServer') && !(endPoint === 'public'))
    endPoint = props.channel_UID
  if (endPoint !== 'addServer') {
    router.push(`/channel/${endPoint}`)
    if (endPoint !== 'lobby' && endPoint !== 'public') {
      channelStore.channel.channel_title = props.channel_title
      channelStore.channel.channel_UID = props.channel_UID
      channelStore.channel.channel_icon_url = props.channel_icon_url

    }
  }
}

function init() {
  if (channelList.getPathEndPoint === props.channel_UID) {
    channelStore.channel.channel_title = props.channel_title
    channelStore.channel.channel_UID = props.channel_UID
    channelStore.channel.channel_icon_url = props.channel_icon_url
  }
}

init()
</script>

<template>
  <div class="server_Icon" @click="btnClick"
       :class=" {br : (channelList.getPathEndPoint === props.channel_title)||(channelList.getPathEndPoint===props.channel_UID) }">
    <div class="colorBlue" style="width: 100%;height: 100%;text-align: center;"
         :class="{colorBlue1 : props.channel_UID === channelList.getPathEndPoint}"
         v-if="props.channel_icon_url === null">
      <div class="title">{{ props.channel_title }}</div>
    </div>

    <img class="img"
         v-else-if="props.channel_title === 'lobby' || props.channel_title === 'addServer' || props.channel_title === 'public'"
         :src="props.channel_icon_url" alt=""
         :class="{ colorGreen: props.channel_title === 'addServer' || props.channel_title === 'public', colorBlue: props.channel_title === 'lobby' ,
         colorBlue1 : (channelList.getPathEndPoint === props.channel_title) && props.channel_title==='lobby',
         colorGreen1:(channelList.getPathEndPoint === props.channel_title) && props.channel_title === 'public'}">

    <div class="img channelImage" v-else :style="{backgroundImage: `url(${props.channel_icon_url})`}"/>
  </div>
  <div style="border: 1px solid #35363c;margin: 0 10px;" v-if="props.channel_title === 'lobby'"></div>
</template>

<style scoped>
.channelImage {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.img {
  width: 100%;
  height: 100%;
  box-sizing: inherit;
  padding: 12px;
  cursor: pointer;
}

#Icon {
  width: 50px;
  height: 50px;
}

.IconURL {
  border-radius: 50%;
  background-position: center;
  background-size: contain;
}

.server_Icon {
  width: 50px;
  height: 50px;
  background: #313338;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
}

.server_Icon:hover {
  border-radius: 30%;
}

.colorBlue:hover {
  background: #5865F2;
}

.colorBlue1 {
  background: #5865F2;
}

.colorGreen:hover {
  background: #23A559;
}

.colorGreen1 {
  background: #23A559;
}

.br {
  border-radius: 30%;
}

.title {
  color: #fff;
  cursor: pointer;
  position: absolute;
  display: flex;
  width: 100%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 12px;
}


</style>