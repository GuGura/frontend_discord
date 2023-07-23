<script setup>
import {defineProps} from 'vue'

// import Tab from "@/components/main/lobby/components/Tab.vue";
import UserSettingModal from "@/components/modal/UserSettingModal.vue";
import {useModalStore} from "@/script/store/modal";
import WritingPostModal from "@/components/modal/WritingPostModal.vue";
import Tab from "@/components/main/lobby/Tab.vue";
import TodaySchedule from "@/components/main/lobby/TodaySchedule.vue";
// import TodaySchedule from "@/components/mainpage/lobby/TodaySchedule.vue";
// import WritingContentModal from "@/components/modal/WritingContentModal.vue";

const modalStore = useModalStore();

const propsLobby = defineProps({
  nickname: String,
  description: String,
  icon_url: String
})

function openModal() {
  modalStore.open('userSetting')
}

function openModal2() {
  modalStore.open('writingPost')
}

</script>
<template>
  <div id="main_contents">
    <div id="main_content_header">
      <div id="icon_URL">
        <img src="/img/channelList/user_icon.png" alt="UserIcon" style="display: flex;flex: 1;" class="rounded"
             v-if="propsLobby.icon_url==='' ">
        <img :src="propsLobby.icon_url" alt="UserIcon" style="width: 100%;height: 100%;border-radius: 5px" class="rounded" v-else>
      </div>
      <div id="userName" class="container">
        <div style="display: flex;flex: 1;">
            <div>
          <h2 class="featurette-heading fw-normal lh-1">{{ propsLobby.nickname }} </h2>
          <div class="lead"> {{ propsLobby.description }}</div>
                <div class="row" style="display: flex;flex: 1;">
                    <div class="edit-button col" @click="openModal()" style="width: 150px; padding: 0;">
                        <div class="material-symbols-outlined">manage_accounts</div>
                        <div style="width: 90px;">Settings</div>
                    </div>
                    <div class="edit-button col" @click="openModal2()"  style="width: 150px; padding: 0;">
                        <div class="material-symbols-outlined">edit_note</div>
                        <div style="width: 90px;">Post</div>
                    </div>
                </div>
            </div>


        </div>
      </div>
        <UserSettingModal
                :nickname="propsLobby.nickname"
                :description="propsLobby.description"
                :icon_url="propsLobby.icon_url"
                v-if=" modalStore.modal.userSetting=== true"
        />
        <WritingPostModal
                :nickname="propsLobby.nickname"
                :icon_url="propsLobby.icon_url"
                v-if="modalStore.modal.writingPost === true"/>
    </div>
    <div id="main_content_body">
      <div id="main_content1">
        <Tab/>
      </div>
      <div id="main_content2">
        <TodaySchedule/>
      </div>
    </div>
  </div>

</template>


<style scoped>
form[name=list] {
  display: flex;
  flex-direction: column;
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
  margin-top: 9px;
}

#main_contents {
  display: flex;
  flex: 1;
  flex-direction: column;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  overflow-y: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none;

}

#main_contents::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera*/
}

#main_content_header {
  display: flex;
  height: 25%;
  align-items: flex-end;
  padding: 15px 30px;
  gap: 35px;
  color: #fff;
}

#icon_URL {
  display: flex;
  width: 10em;
  height: 100%;
}

#userName {
  display: flex;
  color: #fff;
  height: 70%;
  justify-content: flex-start;
  flex-direction: column-reverse;
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

h2.featurette-heading {
  font-size: 0.8em;
  margin: 0;
}

.lead {
  font-size: 0.4em;
  margin-top: 10px;
}

.edit-button {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  font-size: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  height: 30px;
  background: #41434A;
  border-radius: 10px;
  cursor: pointer;
  margin-right: 10px;
}

.writing-button {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  font-size: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  height: 30px;
  background: #41434A;
  border-radius: 10px;
  cursor: pointer;
}

.writing-button .material-symbols-outlined {
  font-size: 20px;
  color: #fff;
  margin-right: 5px;
}

.edit-button .material-symbols-outlined {
  font-size: 20px;
  color: #fff;
  margin-right: 5px;
}

#userName > div:nth-of-type(1) {
  font-size: 3em;
}

#userName > div:nth-of-type(2) {

}

.edit-button:hover {
  background: #36373D;
}

.edit-button:active {
  background: #3B3D44;
}


.writing-button:hover {
  background: #36373D;
}

.writing-button:active {
  background: #3B3D44;
}


#main_content_body {
  display: flex;
  flex: 1;
  padding: 5px 0 0 30px;
  gap: 10px;
  padding-top: 30px;
  background-color: #36373d;
}

#main_content1 {
  display: flex;
  background: #36393F;
  width: 73%;
  height: 98%;
}

#main_content2 {
  display: flex;
  width: 25%;
  height: 60%; /* 임시로 */
}
</style>