<script setup>
import {reactive} from "vue";
import {useFriendStore} from "@/script/store/friend";
import {useModalStore} from "@/script/store/modal";
import SidebarMyInfo from "@/components/main/sidebar/SidebarMyInfo.vue";
import Friend from "@/components/main/sidebar/Friend.vue";
import FriendModal from "@/components/modal/freind/FriendModal.vue";

const props = reactive({
  type: 'friend',
})

const friendStore = useFriendStore();
const modalStore = useModalStore();

function FriendM(){
  modalStore.open('Friend')
  console.log(modalStore.modal.Friend)
}


</script>

<template>
  <div id="side_contents">
    <div id="side_content_info">

      <label id="btn_DMList" class="btnList">
        <div style="width: 20px;">
          <img src="/img/sidebar/DM_icon.png" style="height: 20px;">
        </div>
        <div>DM</div>
        <input type="radio" v-model="props.type" value="DM" name="lobbySidebarType">
      </label>

      <label id="btn_FriendList" class="btnList">
        <div style="width: 20px;">
          <img src="/img/sidebar/friend_icon.png" style="height: 20px;">
        </div>
        <div>친구</div>
        <input type="radio" name="lobbySidebarType" v-model="props.type" value="friend" checked>
      </label>

      <div id="searchBox">
        <input name="searchbox" placeholder="친구 찾기">
      </div>

      <div style="display:flex;align-items: center;color: #fff;margin-top: 10px; padding: 0 5px;">
        리스트&nbsp;
        <img src="/img/channelList/add_channel.png" style="width: 15px; height: 15px;cursor: pointer" @click="FriendM()">
      </div>
      <!----><!---->
      <Friend v-for="friend in friendStore.friendList" :key="friend"
              :friendInfo="friend"/>
    </div>
    <SidebarMyInfo />
  </div>
  <FriendModal v-if="modalStore.modal.Friend === true" />
</template>

<style scoped>
#side_contents {
  display: flex;
  flex-direction: column;
  min-width: 240px;
  background: #2b2d31;
  border-radius: 10px 0 0 0;
  z-index: 10;
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
  padding: 20px 10px;
  gap: 1px;
}

form[name=list] {
  display: flex;
  flex-direction: column;
}

.btnList {
  display: flex;
  height: 45px;
  gap: 20px;
  border-radius: 5px;
  padding: 0px 15px;
  align-items: center;
  cursor: pointer;
}

.btnList:hover {
  background: #36373D;
}

.btnList:active {
  background: #3B3D44;
}

.btnList > div:nth-of-type(1) {
  display: flex;
  color: #fff;
  width: 30px;
}

.btnList > div:nth-of-type(2) {
  display: flex;
  font-size: 15px;
  color: #fff;
  flex: 1;
  justify-content: space-between;
  align-items: center;
}

#searchBox {
  display: flex;
}

#searchBox > input[name=searchbox] {
  display: flex;
  background-color: #1E1F22;
  outline: none;
  border-inline: none;
  border-bottom: none;
  color: #fff;
  padding: 0 5px;
  height: 35px;
  width: 100%;
  margin-top: 10px;
}

.MyMember_exit {
  display: flex;
  height: 8px;
  width: 8px;
}


img {
  width: 100%;
}
</style>