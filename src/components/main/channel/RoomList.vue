<script setup>
import {defineProps} from 'vue'

const props = defineProps({
  channel_room_name: String,
  channel_room_type: String,
})
</script>

<template>
  <div class="btnRoom">
    <div id="roomType">
      <img :src="props.channel_room_type">
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