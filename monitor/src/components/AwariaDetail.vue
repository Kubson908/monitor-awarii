<script setup>
import { defineEmits, inject, defineProps } from "vue";
import Qrcode from "qrcode.vue";
import { lang } from "@/config";

const close = defineEmits(["close"]);
const props = defineProps({
  id: String,
});
const awaria = inject(["awaria"]);
const statusy = inject(["statusy"]);
const priorytety = inject(["priorytety"]);

const emit = async () => {
  close("close");
};
</script>

<template>
  <div class="fog" @click.self="emit">
    <div class="awaria_detail">
      <div class="awaria_head">
        <div id="modal_title">{{ lang.details }}</div>
        <button class="back_button" @click="emit">
          <v-icon color="#aaa">mdi-close</v-icon>
        </button>
      </div>
      <hr />
      <div class="awaria_info">
        <div class="awaria_text">
          <div class="awaria_details">
            <h2>{{ lang.malfunctionDetails }}</h2>
            <p>
              <span class="smaller">{{ lang.malfunctionNumber }}: </span
              >{{ awaria.id }}
            </p>
            <p>
              <span class="smaller">{{ lang.workplace }}: </span
              >{{ awaria.stanowisko.kod }} - {{ awaria.stanowisko.nazwa }}
            </p>
            <p>
              <span class="smaller">{{ lang.priority }}: </span
              >{{ priorytety[awaria.priorytet - 1] }}
            </p>
            <p>
              <span class="smaller">{{ lang.status }}: </span
              >{{ statusy[awaria.status - 1] }}
            </p>
          </div>
          <div class="awaria_desc">
            <h2>{{ lang.malfunctionDescription }}:</h2>
            <p>
              {{ awaria.opis_awarii }}
            </p>
          </div>
        </div>
        <div class="awaria_inner">
          <h2>{{ lang.qrCode }}</h2>
          <Qrcode :value="props.id" :size="192"></Qrcode>
        </div>
      </div>
      <hr />
      <div class="awaria_head"></div>
    </div>
  </div>
</template>

<style>
hr {
  border: 1px solid var(--element);
  margin: 0;
}
.fog {
  background-color: rgba(144, 144, 144, 0.789);
  position: fixed;
  z-index: 1;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  user-select: none;
}
.awaria_detail {
  width: 40vw;
  height: fit-content;
  z-index: 1;
  background: var(--bgcolor);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  border: 2px solid var(--element);
  border-radius: 16px;
}
.awaria_text {
  display: flex;
  flex-direction: column;
  width: 60%;
}
.awaria_head {
  display: flex;
  justify-content: space-between;
  padding: 0 2%;
  height: 50px;
}
#modal_title {
  font-size: 24px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  line-height: 50px;
  font-weight: 600;
}
.awaria_info {
  height: fit-content;
  display: flex;
  justify-content: space-between;
  padding: 5%;
  font-size: 18px;
  text-align: left;
  max-height: 60vh;
  width: 100%;
  overflow: auto;
}
.awaria_inner {
  text-align: left;
  padding: 16px;
  font-size: 16px;
  user-select: text;
  border: 2px solid var(--element);
  border-radius: 16px;
  height: fit-content;
  margin: 8px;
  align-self: center;
}
.awaria_desc {
  justify-content: center;
  flex: 0 0 auto;
  text-align: left;
  padding: 16px;
  font-size: 16px;
  user-select: text;
  border: 2px solid;
  border-color: var(--element);
  border-radius: 16px;
  margin: 8px;
  height: 224px;
  overflow: auto;
}
.awaria_desc p,
.awaria_details p {
  overflow-wrap: break-word;
  word-wrap: break-word;
  padding-inline: 8px;
}
.awaria_desc p {
  padding-inline: 8px;
}
.awaria_inner h2,
.awaria_details h2,
.awaria_desc h2 {
  padding-bottom: 8px;
  font-size: 18px;
  font-weight: 700;
}
.awaria_details {
  float: left;
  text-align: left;
  padding: 16px;
  font-size: 16px;
  user-select: text;
  border: 2px solid;
  border-color: var(--element);
  border-radius: 16px;
  margin: 8px;
}
.smaller {
  font-weight: 700;
}

.back_button {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-block: auto;
}
.back_button:hover {
  background: #dddddd;
}
#videoCanvas {
  width: 256px;
}

@media screen and (orientation: portrait) {
  .awaria_detail {
    width: 90vw;
  }
}

@media screen and (orientation: landscape) {
  @media screen and (max-width: 1300px) {
    .awaria_detail {
      width: 60vw;
    }
  }
}

@media screen and (max-width: 600px) {
  .awaria_info {
    flex-direction: column;
  }
  .awaria_text {
    width: 100%;
  }
}
</style>
