<script setup>
import {defineProps} from 'vue'
import {useRouter} from "vue-router";

const props = defineProps({
  channel_room_name: String,
  channel_room_img: String,
  channel_room_uid: String,
  channel_room_type: String,
})
const router = useRouter();
function enterRoom(){
  const channelUID = router.currentRoute.value.path.split('/')[2]
  router.push(`/channel/${channelUID}/${props.channel_room_uid}`)
}

</script>

<template>
  <div class="btnRoom" @click="enterRoom()"
       :style="(router.currentRoute.value.path.split('/')[3]===props.channel_room_uid)&&
       (channel_room_type==='Text')? 'background: #3B3D44':''">
    <div id="roomType">
      <img :src="props.channel_room_img">
    </div>
    <div>
      <div class="MyMember_Name">
        {{ props.channel_room_name }}
      </div>
    </div>
  </div>
</template>

<style scoped>

img {
  width: 100%;
}

#roomType {
  display: flex;
  color: #fff;
  width: 30px;
}

.btnRoom {
  display: flex;
  height: 30px;
  gap: 20px;
  border-radius: 5px;
  align-items: center;
  cursor: pointer;
}

.btnRoom:hover {
  background: #36373D;
}

.btnRoom:active {
  background: #3B3D44;
}
.btnRoom > div:nth-of-type(1) > img:nth-of-type(1) {
  padding: 8px;
}

.btnRoom > div:nth-of-type(2) {
  display: flex;
  font-size: 15px;
  color: #fff;
  flex: 1;
  justify-content: space-between;
  align-items: center;
}
</style>