<script setup>
import { onBeforeMount, computed, ref } from "vue";
import { state } from "./main.js";
import AwariaList from "./components/AwariaList.vue";
import Navbar from "./components/NavbarComponent.vue";
import PracownikList from "./components/PracownikList.vue";
import LoadingScreen from "./components/LoadingScreen.vue";
import { onDrag, onDragEnd } from "./drag.util";
import { socket, login } from "./socket";
import { lang } from "./config.js";

onBeforeMount(async () => {
  await login();
  await socket.connect();
});

const snackbar = computed(() => {
  return state.snackbar_msg === lang.newMalfunction
    ? "orange-darken-1"
    : state.snackbar_msg.includes(lang.malfunctionAccepted)
    ? "blue"
    : "green";
});
const isLoading = ref(true);
const handleLoaded = () => {
  setTimeout(function () {
    isLoading.value = false;
  }, 2000);
};

const select = computed(() =>
  state.dragging === false ? "user-select: auto" : "user-select: none"
);
onmousemove = (e) => {
  onDrag(e);
};
onmouseup = (e) => {
  onDragEnd(e);
};
onmouseleave = (e) => {
  onDragEnd(e);
};
onresize = () => {
  state.vp_height = window.innerHeight;
  state.vp_width = window.innerWidth;
};
if ("ontouchstart" in window) {
  window.ontouchmove = (e) => {
    onDrag(e);
  };
  window.ontouchend = (e) => {
    onDragEnd(e);
  };
}
</script>

<template>
  <v-app class="v-theme--light">
    <LoadingScreen v-if="isLoading && state.token"></LoadingScreen>
    <Navbar />
    <AwariaList v-if="state.token" :style="select" class="mt-15" />
    <PracownikList
      :style="select"
      v-if="state.pracownicy.length >= 1"
      @loaded="handleLoaded"
    />
    <v-snackbar
      :style="select"
      class="mt-16 font-white"
      v-model="state.snackbar"
      timeout="10000"
      :color="snackbar"
      position="relative"
      location="top"
      >{{ state.snackbar_msg }}</v-snackbar
    >
  </v-app>
</template>

<style>
:root {
  --navbar: #6200ee;
  --drawer: #392a82;
  --element: #d9d9d9;
  --button: #9e9e9e;
  --bgcolor: #ffffff;
  --list: #f2f2f2;
  --text-black: #000;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  font-family: "Segoe UI", sans-serif;
  margin: 0;
  line-height: 1.4;
  color: #000;
  background: var(--bgcolor);
  font-weight: 400;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

</style>
