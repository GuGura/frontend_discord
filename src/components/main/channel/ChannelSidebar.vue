<script setup>
//import {computed, onMounted, reactive, watch} from 'vue';
import SidebarMyInfo from "@/components/main/sidebar/SidebarMyInfo.vue";
import ChannelSidebarHead from "@/components/main/sidebar/ChannelSidebarHead.vue";
// import {useChannelListStore} from "@/script/store/channel_list";
// import {useUserStore} from "@/script/store/userInfo";
import {useChannelStore} from "@/script/store/channel";
import {reactive} from "vue";
import RoomList from "@/components/main/channel/RoomList.vue";

// import {createRoom, enterRoom, findAllRoom} from '/script/chatOperations';

// const channelListStore = useChannelListStore();
// const userStore = useUserStore();
const channelStore = useChannelStore();
const channelInfo = reactive({
  channel_title: channelStore.getChannel_title(),
  channel_UID: channelStore.getChannel_UID(),
  channel_icon_url: channelStore.getChannel_icon_url(),
  channel_TextRoom: channelStore.getChannel_TextRoom(),
  channel_VoiceRoom: channelStore.getChannel_VoiceRoom()
})
// const roomInfo = reactive({
//   name: '',
//   room_type: false,
// }); // ChatRoom Name
// const textChatRooms = reactive([]); // Text Chat Room List
// const voiceChatRooms = reactive([]); // Voice Chat Room List
//
//
// const updateChannelId = computed(() => {
//   return serverListStore.getEndPoint;
// });
//
// onMounted(async () => {
//   await findAllRoom(updateChannelId.value, textChatRooms, voiceChatRooms);
//   if (textChatRooms.length >0) {
//     await enterRoom(textChatRooms[0].roomId, textChatRooms[0].name); // Here only roomId is needed
//   }
// });
//
// watch(()=> channelInfo.channel_UID,async ()=>{
//   console.log(channelInfo.channel_UID)
// });
// watch(() => updateChannelId.value,
//     async () => {
//       if (updateChannelId.value !== "lobby") {
//         await findAllRoom(updateChannelId.value, textChatRooms, voiceChatRooms);
//         if (textChatRooms.length > 0) {
//           enterRoom(textChatRooms[0].roomId, textChatRooms[0].name); // Here only roomId is needed
//         }
//       }
//     },
// );
//channelStore.channelInfo.channel_title
//channelStore.channelInfo.channel_invite_code

channelStore.init()
</script>

<template>
  <div id="side_contents">
    <ChannelSidebarHead
        :channel_title="channelInfo.channel_title"
        :channel_UID="channelInfo.channel_UID"
        :channel_icon_url="channelInfo.channel_icon_url"
    />

    <div id="side_content_info">
      <div id="chatRooms">
        <div class="roomName">
          <div>채팅</div>
          <RoomList
              v-for="room in channelInfo.channel_TextRoom" :key="room"
              :channel_room_name="room.room_name"
              channel_room_img="/img/channel/chat.png"
              :channel_room_type="room.room_type"
              :channel_room_uid="room.room_uid"
          />
        </div>

        <div class="roomName">
          <div>음성</div>
          <RoomList
              v-for="room in channelInfo.channel_VoiceRoom" :key="room"
              :channel_room_name="room.room_name"
              channel_room_img="/img/channel/speak.png"
              :channel_room_type="room.room_type"
          />
        </div>
      </div>
    </div>
    <SidebarMyInfo/>
  </div>
</template>

<style scoped>
/**Add**/
.roomName {
  gap: 5px;
  display: flex;
  flex-direction: column;
}

.roomName > div:nth-of-type(1) {
  color: #949BA4;
  font-size: 13px;
  font-weight: bold;
  margin-top: 10px;
  padding: 0 5px;
}

.roomName > div:nth-of-type(1):hover {
  color: #fff;
  cursor: pointer;
  display: flex;
}

/**  side_contents */
#side_contents {
  display: flex;
  flex-direction: column;
  min-width: 240px;
  background: #2b2d31;
  border-radius: 10px 0 0 0;
  position: relative;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none
}

#side_content_info {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0 10px;
  gap: 1px;
}
</style>