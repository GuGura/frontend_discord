<script setup>
import {defineProps} from 'vue'
import RestApi from "@/script/axios/jwt/RestApi";
import {useRouter} from "vue-router";
import {useFriendStore} from "@/script/store/friend";

const propsFriend = defineProps({
  friendInfo: Object,
})
const router = useRouter();
const friendStore = useFriendStore();
function openFriend() {
  RestApi.post(`/friend/${propsFriend.friendInfo.user_id}`, {}).then(({data}) => {
     friendStore.user.id = data
     friendStore.updateFriendInfo()
    router.push(`/channel/friend/${propsFriend.friendInfo.user_id}`)
  })
}
</script>

<template>
  <div class="btnList" @click="openFriend()">
    <div style="width: 35px;">
        <img class="rounded" v-if="propsFriend.friendInfo.icon_url === ''" src="/img/channelList/bright_icon.png">
        <img class="rounded" :src="propsFriend.friendInfo.icon_url" v-else>
    </div>
    <div class="MyMember_Info">
      <div class="MyMember_Name">
        {{propsFriend.friendInfo.nickname}}
      </div>
    </div>
  </div>
</template>

<style scoped>
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
.MyMember_exit {
  display: flex;
  height: 8px;
  width: 8px;
}


img {
  width: 100%;
}
</style>