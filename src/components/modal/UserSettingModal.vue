<script setup>
import {reactive, defineProps} from "vue";
import {useUserStore} from "@/script/store/userInfo";
import RestApi from "@/script/axios/jwt/RestApi";
import {useModalStore} from "@/script/store/modal";

const modalStore = useModalStore();
const userStore = useUserStore();

const props = defineProps({
  icon_url: String,
  nickname: String,
  description: String,
})
let profileForm = reactive({
  icon_url: '',
  nickname: props.nickname,
  description: props.description
})

function imgChange(e) {
  const img = e.target.files[0];
  if (img instanceof Blob) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(img)
    fileReader.onload = function (e) {
      profileForm.icon_url = e.target.result;
    }
  }
}


async function uploadProfile() {
  exitModal();
  await RestApi.put("/myInfo/updateProfile", profileForm
  ).then(({data}) => {
    console.log(data)
    userStore.user.nickname = data.data.nickname;
    userStore.user.description = data.data.description;
    if (data.data.icon_url!=='')
      userStore.user.icon_url = data.data.icon_url;
  })
}

function exitModal() {
  modalStore.terminate('userSetting')
}
</script>

<template>
  <div id="container">
    <div id="background" @click="exitModal"></div>
    <div id="modal">
      <div id="header">
        <div id="header_sumName">
          <div>프로필 수정</div>
          <img src="/img/channelList/exit.png" alt="" @click="exitModal">
        </div>
        <div id="description"></div>
      </div>
      <div id="body">
        <div id="img_upload">
          <img id="Icon" :src="profileForm.icon_url" alt="헬로" class="rounded IconURL"
               v-if="profileForm.icon_url!==''">
          <img id="Icon" :src="props.icon_url" alt="헬로" class="rounded IconURL"
               v-else-if="props.icon_url!==''">
          <img src="/img/channelList/user_icon.png" alt="헬로" style="width: 200px;" class="rounded" v-else>
          <input ref="image" class="file-input" type="file" tabindex="0" accept=".jpg,.jpeg,.png,.gif"
                 @change="imgChange"/>
        </div>
        <div id="ChannelNameInputBox">
          <div>Nickname</div>
          <input type="text" id="nickName" v-model="profileForm.nickname">
          <div>Description</div>
          <textarea rows="5" cols="70" name="text" id="description" placeholder="내용을 입력해 주세요."
                    v-model="profileForm.description"></textarea>
        </div>
      </div>
      <div id="footer">
        <div id="btnAttend">
          <button @click="uploadProfile">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#Icon {
  width: 180px;
  height: 180px;
}

.IconURL {
  border-radius: 50%;
  background-position: center;
  background-size: contain;
}

#container {
  display: flex;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  z-index: 90;
}

#background {
  display: flex;
  position: fixed;
  width: 100%;
  height: 100%;
  background: black;
  filter: opacity(0.5);
  z-index: 1;
}

#modal {
  display: flex;
  width: 430px;
  padding-bottom: 100px;
  background: #fff;
  z-index: 2;
  border-radius: 10px;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  padding-top: 10px;
  gap: 20px;
}

#header {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
}

#header_sumName {
  display: flex;
  width: 100%;
  position: relative;
  justify-content: center;
  padding: 10px;
}

#header_sumName > div:nth-of-type(1) {
  font-size: 22px;
  font-weight: 550;
  display: flex;
  color: #060607;
}

#header_sumName > img:nth-of-type(1) {
  position: absolute;
  height: 15px;
  right: 20px;
  cursor: pointer;
}

#description {
  resize: none;
  font-size: 15px;
  color: #4E5058;
}

#ChannelNameInputBox > textarea {
  height: 100px;
  background: #E3E5E8;
  padding: 5px 10px;
  outline: none;
  border: none;
  border-radius: 3px;
  font-size: 15px;
  color: #313338;
  overflow: auto;
}

/** */
#body {
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
  gap: 20px;
}

#img_upload {
  display: flex;
  position: relative;
  overflow: hidden;
}

.file-input {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  font-size: 0;
}

#ChannelNameInputBox {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 90%;
}

#ChannelNameInputBox > div:nth-of-type(1) {
  font-size: 12px;
  font-weight: 600;
  color: #4E5058;
}

#ChannelNameInputBox > div:nth-of-type(2) {
  font-size: 12px;
  font-weight: 600;
  color: #4E5058;
}

#ChannelNameInputBox > input:nth-of-type(1) {
  height: 40px;
  background: #E3E5E8;
  outline: none;
  border: none;
  padding: 0 10px;
  border-radius: 3px;
  font-size: 15px;
  color: #313338;
}


#box3 > div:nth-of-type(1) {
  color: #5C5E66;
  font-size: 12px;
}

#box3 > div:nth-of-type(2) {
  color: #5C5E66;
  font-size: 12px;
}

#btnCreate > button {
  height: 25px;
  font-size: 12px;
  width: 60px;
  border: none;
  background-color: #E3E5E8;
  color: #5C5E66;
  cursor: pointer;
  border-radius: 2px;
}

#btnCreate > button:hover {
  background-color: #CECECE;
}

#footer {
  display: flex;
  flex-direction: column;
  bottom: 0;
  background: #F2F3F5;
  position: absolute;
  width: 100%;
  align-items: center;
  height: 70px;
}


#btnAttend {
  width: 100%;
  padding: 0 10px;
  height: 34px;
}

#btnAttend > button {
  width: 100%;
  height: 100%;
  background: #6D6F78;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

#btnAttend > button:hover {
  background: #4E5058;
}

#btnAttend > button:active {
  background: #41434A;
}
</style>