<script setup>

import LobbySidebar from "@/components/main/lobby/LobbySidebar.vue";
import LobbyMain from "@/components/main/lobby/LobbyMain.vue";
import {reactive} from "vue";
import {useUserStore} from "@/script/store/userInfo";

const user = reactive({
  nickname: useUserStore().getNickname(),
  description: useUserStore().getDescription(),
  icon_url: useUserStore().getIconURL()
})
</script>

<template>
  <LobbySidebar/>
  <LobbyMain
      :nickname="user.nickname"
      :description="user.description"
      :icon_url="user.icon_url"
  />
</template>

<style scoped>

</style>