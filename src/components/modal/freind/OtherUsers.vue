<script setup>
import {defineProps, reactive} from 'vue'
import RestApi from "@/script/axios/jwt/RestApi";

const propsOtherUsers = defineProps({
  friendInfo: Object,
  request: Boolean,
})
let isRequest = reactive([propsOtherUsers.request])

function friendSend() {
console.log(propsOtherUsers.friendInfo.user_id)
  RestApi.post(`/friend/send/${propsOtherUsers.friendInfo.user_id}`)
      .then(() => {
        isRequest[0] = true
      })
      .catch(err=>{
        console.log(err)
        // eslint-disable-next-line no-undef
        Swal.fire(err.response.data.message)
      })
}
</script>

<template>
  <div class="btnList" >
    <div style="width: 35px;">
        <img class="rounded" v-if="propsOtherUsers.friendInfo.icon_url === null ||propsOtherUsers.friendInfo.icon_url === ''" src="/img/channelList/bright_icon.png">
        <img class="rounded" :src="propsOtherUsers.friendInfo.icon_url" v-else>
    </div>
    <div class="MyMember_Info">
      <div class="MyMember_Name">
        {{ propsOtherUsers.friendInfo.nickname }}
      </div>
      <button style="outline: none;border: none;cursor: pointer;" @click="friendSend()" v-if="isRequest[0]===false">친구요청</button>
      <button style="outline: none;border: none;cursor: pointer;" v-else-if="isRequest[0]===true">요청완료</button>
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