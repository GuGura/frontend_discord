<script setup>
import {defineProps, reactive} from 'vue'
import RestApi from "@/script/axios/jwt/RestApi";
import {useFriendStore} from "@/script/store/friend";

const propsRequestUsers = defineProps({
  friendInfo: Object,
  request: Boolean,
})
const friendStore = useFriendStore();
let isRequest = reactive([propsRequestUsers.request])

function friendResponse() {
  console.log(propsRequestUsers.friendInfo.id)
  RestApi.put(`/friend/response/${propsRequestUsers.friendInfo.user_id}`)
      .then(({data}) => {
        console.log(data)
        isRequest[0] = true
        friendStore.friendList.push(data.data);
      })
      .catch(err => {
        console.log(err)
        alert(err.response.data)
      })
}
</script>

<template>
  <div class="btnList">
    <div style="width: 35px;">
      <img class="rounded" v-if="propsRequestUsers.friendInfo.icon_url === null" src="/img/channelList/bright_icon.png">
      <img class="rounded" :src="propsRequestUsers.friendInfo.icon_url" v-else>
    </div>
    <div class="MyMember_Info">
      <div class="MyMember_Name">
        {{ propsRequestUsers.friendInfo.nickname }}
      </div>
      <button style="outline: none;border: none;cursor: pointer;" @click="friendResponse()" v-if="isRequest[0]===false">
        수락하기
      </button>
      <button style="outline: none;border: none;cursor: pointer;" v-else-if="isRequest[0]===true">수락완료</button>
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