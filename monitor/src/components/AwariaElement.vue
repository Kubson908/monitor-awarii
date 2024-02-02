<script setup>
import { defineProps, ref, provide } from "vue";
import AwariaDetail from "./AwariaDetail.vue";
import CameraComponent from "./CameraComponent.vue";
import Qrcode from "qrcode.vue";
import { lang } from "@/config";
import { startDrag } from "@/drag.util";
const props = defineProps({
  awaria: Object,
});
const priorytety = [lang.high, lang.medium, lang.low];
const colors = ["red", "#FF8000", "green"];
const style = "color: " + colors[props.awaria.priorytet - 1];
const statusy = [lang.unclaimed, lang.claimed, lang.finished];
const mozna_pracowac = [lang.no, lang.yes];
const index = props.awaria.mozna_pracowac ? 1 : 0;
const details = ref(false);
const camera = ref(false);
const qr_value = JSON.stringify({ id: props.awaria.id });
const element_color = getComputedStyle(document.body).getPropertyValue(
  "--element"
);
provide("awaria", props.awaria);
provide("statusy", statusy);
provide("priorytety", priorytety);
</script>

<template>
  <div class="element">
    <div class="elem_background">
      <div class="elem_info">
        <div class="elem_info_top">
          <div class="elem_info_top_left">
            {{ lang.reportTitle }} {{ props.awaria.id }}
          </div>
          <div class="elem_info_top_right">
            {{ statusy[props.awaria.status - 1] }}
          </div>
        </div>
        <div class="elem_info_content">
          <p>
            {{ lang.workplace }}: {{ props.awaria.stanowisko.kod }} -
            {{ props.awaria.stanowisko.nazwa }}
          </p>
          {{ lang.priority }}:
          <span :style="style">
            {{ priorytety[props.awaria.priorytet - 1] }}
          </span>
          <p>
            {{ lang.operational }}:
            {{ mozna_pracowac[index] }}
          </p>
        </div>
      </div>
      <div class="elem_buttons">
        <div class="elem_button_container">
          <v-btn class="elem_button" icon size="40" @click.stop="camera = true"
            ><v-icon
              class="elem_button_icon"
              icon="mdi-video-outline"
              size="24px"
            ></v-icon
          ></v-btn>
          <v-btn
            icon
            class="elem_button"
            @click.stop="details = true"
            size="40"
          >
            <v-icon
              class="elem_button_icon"
              icon="mdi-information-variant"
              size="30"
            ></v-icon>
          </v-btn>
          <v-btn
            v-if="props.awaria.status === 1"
            icon
            class="elem_button dragger"
            @mousedown="startDrag($event, props.awaria)"
            @touchstart="startDrag($event, props.awaria)"
            size="30px"
            :ripple="false"
          >
            <v-icon
              class="elem_button_icon dragger"
              icon="mdi-pan"
              size="25"
            ></v-icon>
          </v-btn>
        </div>
        <Qrcode
          :value="qr_value"
          :size="64"
          class="elem_qr"
          :background="element_color"
          foreground="#000000"
        ></Qrcode>
      </div>
    </div>
    <teleport to="body">
      <Transition name="details">
        <AwariaDetail
          @close="() => (details = false)"
          :id="qr_value"
          v-if="details"
        />
      </Transition>
      <Transition name="details">
        <CameraComponent
          @close="() => (camera = false)"
          :id="props.awaria.stanowisko.id"
          v-if="camera"
        />
      </Transition>
    </teleport>
  </div>
</template>

<style>
.details-enter-active .awaria_detail {
  animation: popup 0.25s;
}
.details-leave-active .awaria_detail {
  animation: popup 0.25s reverse;
}
.details-enter-active,
.details-leave-active {
  transition: opacity 0.25s ease;
}
.details-enter-from,
.details-leave-to {
  opacity: 0;
}
@keyframes popup {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
.dragger {
  align-self: center;
  touch-action: none;
}
.element {
  padding: 8px;
}
.elem_background {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  height: 192px;
  width: 256px;
  padding: 6.25%;
  background: var(--element);
  border-radius: 8px;
  box-shadow: #888 0 2px 6px;
}
.elem_info {
  height: 60%;
  width: 100%;
  display: block;
}
.elem_buttons {
  height: 40%;
  width: 100%;
  display: block;
  position: relative;
}
.elem_button {
  margin: 0px 4px;
  float: left;
  background: var(--button) !important;
}
.elem_button_icon {
  margin: 0px 4px;
  float: left;
  color: var(--bgcolor) !important;
}
.elem_button_container {
  display: flex;
  position: absolute;
  bottom: 0px;
  left: 0px;
  margin: 0px;
}
.elem_qr {
  width: calc(100% * 2 / 7);
  height: 100%;
  margin: 0px;
  float: right;
  align-self: flex-end;
}
.elem_info_top {
  font-weight: bold;
  height: calc(100% * 5 / 24);
  width: 100%;
  font-size: 16px;
}
.elem_info_top_left {
  float: left;
}
.elem_info_top_right {
  float: right;
}
.elem_info_content {
  text-align: left;
  font-size: 14px;
  font-weight: 1000;
  text-indent: 0;
  margin-top: 8px;
}
.elem_info_content p {
  text-align: left;
  display: flex;
}
</style>
