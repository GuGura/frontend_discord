<script setup>

import LobbySidebar from "@/components/main/lobby/LobbySidebar.vue";
import {useFriendStore} from "@/script/store/friend";
import FriendLobbyMain from "@/components/main/lobby/friend/FriendLobbyMain.vue";
import {onMounted} from "vue";

useFriendStore().init()

onMounted(async () => {
    useFriendStore().init()
});




</script>

<template>
  <LobbySidebar/>
  <FriendLobbyMain/>
</template>

<style scoped>

</style>