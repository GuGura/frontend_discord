<script setup>
import {defineProps} from 'vue'
import {useModalStore} from "@/script/store/modal";
import router from "@/script/routes/router";
import {useChannelListStore} from "@/script/store/channel_list";
import RestApi from "@/script/axios/jwt/RestApi";
import CreateRoomModal from "@/components/modal/CreateRoomModal.vue";
import {useChannelStore} from "@/script/store/channel";

const props = defineProps({
  channel_title: String,
  channel_UID: Number,
  channel_icon_url: String,
});
const modalStore = useModalStore();
const channelStore = useChannelStore();
function btnCreateRoom() {
  modalStore.openClose('RoomToggle')
  modalStore.open('CreateRoom')
}

function checkInviteCode() {
  RestApi.post(`/channel/createInviteCode/${props.channel_UID}`)
      .then(({data}) => {
        // eslint-disable-next-line no-undef
        Swal.fire(data.data);
      })
      .catch(err => {
        // eslint-disable-next-line no-undef
        Swal.fire('Fail!', err.response.data.message, 'error')
      })

  modalStore.openClose('RoomToggle')
}
 function leaveChannel() {
  // eslint-disable-next-line no-undef
  Swal.fire({
    title: '채널 퇴장',
    text: "정말 나가겠습니까?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Ok'
  }).then((result) => {
    if (result.isConfirmed) {
      router.push('/channel/lobby')
      useChannelListStore().leaveChannel()
      channelStore.channel.channel_TextRoom.splice(0, channelStore.channel.channel_TextRoom.length)
      channelStore.channel.channel_VoiceRoom.splice(0, channelStore.channel.channel_VoiceRoom.length)
      modalStore.openClose('RoomToggle')
      // eslint-disable-next-line no-undef
      Swal.fire(
          'Deleted!',
          '채널 삭제 완료',
          'success'
      )
    }
  })


}
</script>

<template>
  <div id="chatRooms_Header" @click="modalStore.openClose('RoomToggle')" :class="(props.channel_icon_url!== null)? 'height100':'height50'">
    <div style="font-size: 18px;font-weight: bold; color: #fff;" v-if="props.channel_icon_url===null">
      {{ props.channel_title }}
    </div>
    <div class="channelImage"  :style="{backgroundImage: `url(${props.channel_icon_url})`}" v-else-if="channel_icon_url!==null" >
      {{ props.channel_title }}
    </div>
    <div style="display: flex;height: 25px;position: absolute;right: 0;">
      <img src="/img/sidebar/down.png" style="width: 100%;height: 100%">
    </div>
  </div>
  <div id="toggle" v-if="modalStore.modal.RoomToggle ===true" :class="(props.channel_icon_url!== null)? 'toggle100':'toggle50'">
    <div @click="checkInviteCode()">초대코드 확인</div>
    <div @click="btnCreateRoom()">방 생성</div>
    <div @click="leaveChannel()">채널 나가기</div>   <!-- 유저 or 매니저-->
  </div>
  <CreateRoomModal v-if="modalStore.modal.CreateRoom === true"/>
</template>

<style scoped>
.channelImage {
  background-position: center;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  padding: 10px 15px;
  flex: 1;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 5px 0 0 0;
}
.height50{
  height: 50px;
  align-items: center;
  padding: 10px 15px;
}.height100{
  height: 100px;
}
.toggle50 {
  color: #fff;
  position: absolute;
  top: 53px;
  left: 10px;

  gap: 10px;
  display: flex;
  flex-direction: column;
  padding: 5px 10px;
  width: 220px;
  border-radius: 5px;
  background-color: #111214;
}.toggle100 {
  color: #fff;
  position: absolute;
  top: 103px;
  left: 10px;

  gap: 10px;
  display: flex;
  flex-direction: column;
  padding: 5px 10px;
  width: 220px;
  border-radius: 5px;
  background-color: #111214;
}

#toggle > div {
  color: #B5BAC1;
  cursor: pointer;
  padding: 7px 5px;
  border-radius: 3px;
  display: flex;
}

#toggle div:nth-last-child(1) {
  color: red;
}

#toggle div:nth-of-type(1) {
  color: #4752C4;
}

#toggle div:hover {
  background-color: #4752C4;
  color: #fff;
}

#chatRooms_Header {
  display: flex;
  min-width: 240px;
  cursor: pointer;
  top: 0;
  left: 0;
  position: relative;
  border-bottom: 1px solid #1F2123;
  border-radius: 10px 0 0 0;
  justify-content: space-between;
  z-index: 12;
}

#chatRooms_Header:hover {
  background: #36373D;
}

img {
  width: 100%;
  height: 100%;
}
</style>