<script setup>
import ChannelIcon from "@/components/channel_list/ChannelIcon.vue";

import {useChannelListStore} from "@/script/store/channel_list";
import AddChannelModel from "@/components/modal/AddChannelModel.vue";
import {useModalStore} from "@/script/store/modal";

const modalStore = useModalStore();
const channelListStore = useChannelListStore();



</script>

<template>
  <div id="serverList">
    <div class="box1">
      <form name="serverList">
        <ChannelIcon v-for="button in channelListStore.buttons" :key="button" :buttonData="button"/>
      </form>
    </div>
    <AddChannelModel
        v-if="modalStore.modal.addServer === true"/>
  </div>
</template>

<style scoped>

/** #serverlist */
/** fixed */
#serverList {
  display: flex;
  flex-direction: column;
  position: relative;
  top: 0;
  left: 0;
  min-width: 74px;
  height: 100%;
  background: #1E1F22;
  z-index: 12;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none
}

img {
  width: 100%;
  height: 100%;
}

form[name=serverList] {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

#serverList > form[name=serverList] > div > img {
  width: 100%;
  height: 100%;
  box-sizing: inherit;
  padding: 12px;
  cursor: pointer;
}

.box1 {
  padding: 10px 12px;
  width: 100%;
  height: 100%;
  position: absolute;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.box1::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera*/
}
</style>