<script setup>
import {reactive} from 'vue'
import RestApi from "@/script/axios/jwt/RestApi";
import {useModalStore} from "@/script/store/modal";
import router from "@/script/routes/router";
import {useChannelListStore} from "@/script/store/channel_list";
import {useUserStore} from "@/script/store/userInfo";
import {useChannelStore} from "@/script/store/channel";

const modalStore = useModalStore();
const channelListStore = useChannelListStore();
const channelStore = useChannelStore();
const userStore = useUserStore();
let createChannel = reactive({
  fileURL: '/img/sidebar/choose.png',
  channelName: userStore.user.nickname + ' 님의 서버',
  inviteCode: ''
})
let channelCode = reactive({
  channelCode: '',
  result: '*'
})

function createServer() {
  if (createChannel.channelName !== '') {
    modalStore.terminate('addServer')
    modalStore.open('loading')
    RestApi.post("/channel/create", createChannel)
        .then(({data}) => {
          console.log(data)
          const channel_UID = data.data.channel.channel_UID
          const channel = data.data.channel;
          const initRoomUID = data.data.textRoom.room_uid;
          router.push(`/channel/${channel_UID}/${initRoomUID}`)
          modalStore.terminate('loading')
          channelListStore.updateBtn(channel)
          channelStore.channel.channel_UID = channel.channel_UID
          channelStore.channel.channel_title = channel.channel_title
          channelStore.channel.channel_icon_url = channel.channel_icon_url

          channelStore.channel.channel_TextRoom.splice(0,channelStore.channel.channel_TextRoom.length)
          channelStore.channel.channel_VoiceRoom.splice(0,channelStore.channel.channel_VoiceRoom.length)
        })
        .catch(err => {
          modalStore.terminate('loading')
          console.log(err)
        })
  }
}

async function attendChannel() {
  if (channelCode.channelCode === '') {
    channelCode.result = '- 유효한 초대 코드를 입력해 주세요'
    return
  }
  channelCode.result = '*'
  console.log("channelCode.channelCode: " + channelCode.channelCode)
  await RestApi.get(`/channel/attend/${channelCode.channelCode}`)
      .then(({data}) => {
        console.log(data)
        const channel = data.data.channel;
        const channelUID = data.data.channel.channel_UID
        const initRoomUID = data.data.textRoom[0].room_uid;
        channelListStore.updateBtn(channel)
        exitModal();
        localStorage.setItem('selectChannel',channel.channel_title)
        router.push(`/channel/${channelUID}/${initRoomUID}`)
        channelStore.channel.channel_UID = channel.channel_UID
        channelStore.channel.channel_title = channel.channel_title
        channelStore.channel.channel_icon_url = channel.channel_icon_url

        channelStore.channel.channel_TextRoom.splice(0,channelStore.channel.channel_TextRoom.length)
        channelStore.channel.channel_VoiceRoom.splice(0,channelStore.channel.channel_VoiceRoom.length)
      }).catch((err) => {
        console.log(err.response.data.message)
        channelCode.result = "-" + err.response.data.message;
      })
}


function exitModal() {
  modalStore.terminate('addServer')
  modalStore.terminate('attendChannel')
}

async function imgPreview(event) {
  const img = event.target.files[0];
  if (img instanceof Blob) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(img)
    fileReader.onload = function (e) {
      createChannel.fileURL = e.target.result;
    }
  }
}

function changeInviteModal() {
  modalStore.open('attendChannel')
}

function btnBack() {
  channelCode.channelCode = ''
  modalStore.terminate('attendChannel')
}

function redirectPublic() {
  exitModal()
  router.push('/channel/public')
}
</script>

<template>

  <div id="container">
    <div id="background" @click="exitModal"></div>
    <div id="modal" v-if="modalStore.modal.attendChannel === false">
      <div id="header">
        <div id="header_sumName">
          <div>서버 만들기</div>
          <img src="/img/channelList/exit.png" alt="" @click="exitModal">
        </div>
        <div id="description">서버는 나와 친구들이 함께 어울리는 공간입니다. 내 서버를 만들고 대화를 시작해보세요.</div>
      </div>
      <div id="body">
        <div id="img_upload">
          <div id="Icon" class="IconURL" :style="{backgroundImage: `url(${createChannel.fileURL})`}"
               v-if="createChannel.fileURL !== '/img/sidebar/choose.png' "></div>
          <div id="Icon" :style="{backgroundImage: `url(${createChannel.fileURL})`}" v-else></div>
          <input class="file-input" type="file" tabindex="0" accept=".jpg,.jpeg,.png,.gif" aria-label="서버 아이콘 업로드하기"
                 @change="imgPreview">
        </div>
        <div id="ChannelNameInputBox">
          <div>서버 이름</div>
          <input v-model=createChannel.channelName :placeholder="createChannel.channelName === '' ? '필수입력칸 입니다.':''">
          <div id="box3">
            <div>서버를 만들어서 잘 운용해보세요. 행운을 빕니다.</div>
            <div id="btnCreate">
              <button @click="createServer">생성하기</button>
            </div>
          </div>
        </div>
      </div>
      <div id="footer">
        <div id="footer_sumName">이미 초대장을 받으셨나요?</div>
        <div id="btnAttend">
          <button @click="changeInviteModal()">서버 참가하기</button>
        </div>
      </div>
    </div>


    <div id="modal" v-else style="padding-bottom: 90px">
      <div id="header">
        <div id="header_sumName">
          <div>서버 참가하기</div>
          <img src="/img/channelList/exit.png" alt="" @click="exitModal">
        </div>
        <div id="description" style="font-size: 14px">아래 초대 코드를 입력하여 서버에 참가하세요</div>
      </div>
      <div id="body">
        <div id="ChannelNameInputBox">
          <div style="display: flex">
            <div :class="{isFalseColor: channelCode.result!=='*'}">초대 링크</div>
            <div style="color: #DA373C; font-style: italic;font-weight: lighter;">
              &nbsp;{{ channelCode.result }}
            </div>
          </div>
          <input v-model=channelCode.channelCode :placeholder="channelCode.channelCode === '' ? '필수입력칸 입니다.':''">
          <div id="box4">
            <div>초대는 다음 형태여야 해요.</div>
            <div>hTKzmak</div>


            <div id="redirectPublicBtn" @click="redirectPublic">
              <div
                  style="background-color:#23A559;border-radius: 50%;width: 45px;height: 45px;display: flex;align-items: center;justify-content: center;">
                <img src="/img/channelList/public_icon.png" height="23px">
              </div>
              <div style="display: flex;flex-direction: column;">
                <div style="font-size: 16px;font-weight: bold">초대장이 없으신가요?</div>
                <div style="font-size: 12px;">서버 찾기에서 찾기 기능 커뮤니티를 확인하세요.</div>
              </div>
              <div style="display: flex; justify-content: flex-end;flex: 1;align-items: center;filter: opacity(0.5)">
                <img src="/img/channelList/back.png" height="30px">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="footer2">
        <div id="btnBack" @click="btnBack">뒤로 가기</div>
        <div id="btnAttend2" @click="attendChannel">
          서버 참가하기
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#Icon {
  width: 80px;
  height: 80px;
}

.IconURL {
  border-radius: 50%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
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
  font-size: 15px;
  padding: 0 10px;
  text-align: center;
  color: #4E5058;
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

#box3 {
  display: flex;
  justify-content: space-between;
}

#box3 > div:nth-of-type(1) {
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
  height: 90px;
}

#footer_sumName {
  font-size: 20px;
  font-weight: 550;
  display: flex;
  width: 100%;
  justify-content: center;
  padding: 10px 0 5px 0;
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


#box4 {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  gap: 10px;
}

#box4 > div:nth-of-type(1) {
  color: #5C5E66;
  font-size: 12px;
  font-weight: bold;
}

#box4 > div:nth-of-type(2) {
  font-weight: lighter;
  font-size: 14px;
}

#redirectPublicBtn {
  padding: 10px;
  display: flex;
  border-radius: 5px;
  cursor: pointer;
  background-color: #F2F3F5;
  height: 75px;
  align-items: center;
  gap: 10px;
}

#redirectPublicBtn:hover {
  background-color: #EBEBED;
}

#redirectPublicBtn:active {
  background-color: #E6E6E8;
}

#footer2 {
  display: flex;
  bottom: 0;
  background: #F2F3F5;
  position: absolute;
  width: 100%;
  align-items: center;
  padding: 0 20px;
  height: 70px;
  justify-content: space-between;
}

#btnBack {
  font-size: 14px;
  color: #858992;
}

#btnBack:hover {
  text-decoration: underline;
  cursor: pointer;
}

#btnAttend2 {
  background: #5865F2;
  border-radius: 5px;
  padding: 10px;
  font-size: 14px;
  color: #fff;
  display: flex;
  align-items: center;
  cursor: pointer;
}

#btnAttend2:hover {
  background: #4752C4;
}

#btnAttend2:active {
  background: #3C45A6;
}

.isFalseColor {
  color: #DA373C
}
</style>