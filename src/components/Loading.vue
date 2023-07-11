<script setup>
import loading from "@/json/animation_ljyf9qml.json"
import {onMounted, ref} from "vue";
import Lottie from "lottie-web";


const lottieContainer = ref(null);
const anim = ref(null);

onMounted(() => {
  // eslint-disable-next-line no-undef
  anim.value = Lottie.loadAnimation({
    container: lottieContainer.value,
    renderer: "svg",
    loop: true,
    autoplay: true,
    animationData: loading,
  });
});
</script>

<template>
  <div class="home">
    <div style="width:100px;height:100px" ref="lottieContainer"></div>
  </div>
  <div id="background"></div>
</template>

<style scoped>
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  z-index: 100;
  position: fixed;
  width: 100%;
}
#background {
  display: flex;
  position: fixed;
  width: 100%;
  height: 100%;
  background: black;
  filter: opacity(0.5);
  z-index: 13;
}
</style>