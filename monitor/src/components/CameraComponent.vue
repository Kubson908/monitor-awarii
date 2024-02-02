<script setup>
import { defineEmits, inject, onBeforeMount } from "vue";
import JSMpeg from "@cycjimmy/jsmpeg-player";
import axios from "axios";
import { state } from "../main.js";
import { getStreamPort, streamPrefix } from "@/config";
const awaria = inject(["awaria"]);
const close = defineEmits(["close"]);
let player = null;
onBeforeMount(async () => {
  const res = await axios.get(
    `http://${getStreamPort}/api/stream/live/${awaria.stanowisko.id}`,
    { headers: { "x-access-token": state.token } }
  );
  const port = await res.data.port;
  player = new JSMpeg.VideoElement("#bigVideoCanvas", `ws://${streamPrefix}:${port}`);
});
const emit = async () => {
  if (player) {
    player.destroy();
  }
  close("close");
};
</script>

<template>
  <div class="fog" @click.self="emit">
    <div id="bigVideoCanvas"></div>
  </div>
</template>

<style>
#bigVideoCanvas {
  width: 1280px;
  height: 720px;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  position: fixed;
  margin: auto;
  background: black;
}

@media only screen and (max-width: 1550px) {
  #bigVideoCanvas {
    width: 960px;
    height: 540px;
  }
}
@media only screen and (max-width: 1000px) {
  #bigVideoCanvas {
    width: 640px;
    height: 360px;
  }
}
@media only screen and (max-width: 800px) {
  #bigVideoCanvas {
    width: 480px;
    height: 270px;
  }
}
</style>
