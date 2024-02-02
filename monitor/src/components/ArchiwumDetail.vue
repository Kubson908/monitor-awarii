<script setup>
import { defineEmits } from "vue";
import { defineProps } from "vue";
import { lang } from "@/config";
const close_info = defineEmits(["close_info"]);
const close = () => {
  close_info("close_info");
};
const props = defineProps({
  awaria: Object,
});
let getDateFromString = (string) => {
  let date = new Date(string);
  return `${date.toLocaleDateString("pl-PL")} ${date.toLocaleTimeString(
    "pl-PL"
  )}`;
};
</script>
<template>
  <div class="fog" @click.self="close">
    <div class="detail_modal">
      <div class="head">
        <div id="title">{{ lang.details }}</div>

        <button @click="close" class="back_button">
          <v-icon color="#aaa">mdi-close</v-icon>
        </button>
      </div>
      <hr color="#dddddd" />
      <div class="arch_spacing"></div>
      <div class="info">
        <div class="daty">
          <div>
            <h4>{{ lang.dateRegistered }}:</h4>
            <p>{{ getDateFromString(props.awaria.data_zgloszenia) }}</p>
          </div>
          <div>
            <h4>{{ lang.dateAccepted }}:</h4>
            <p>{{ getDateFromString(props.awaria.data_podjecia) }}</p>
          </div>
          <div>
            <h4>{{ lang.dateFixed }}:</h4>
            <p>{{ getDateFromString(props.awaria.data_naprawy) }}</p>
          </div>
        </div>
        <div class="worker">
          <div>
            <h4>{{ lang.workplace }}:</h4>
            <p>{{ props.awaria.stanowisko.nazwa }}</p>
          </div>
          <div>
            <h4>{{ lang.employee }}:</h4>
            <p>
              {{ props.awaria.pracownik.imie }}
              {{ props.awaria.pracownik.nazwisko }}
            </p>
          </div>
        </div>
      </div>
      <div class="arch_desc">
        <h4>{{ lang.malfunctionDescription }}</h4>
        <p>{{ props.awaria.opis_awarii }}</p>
      </div>
      <hr />
      <div class="awaria_head"></div>
    </div>
  </div>
</template>
<style>
.details-enter-active .detail_modal {
  animation: popup 0.25s;
}
.details-leave-active .detail_modal {
  animation: popup 0.25s reverse;
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
}
.arch_spacing {
  width: 100%;
  height: 2vw;
}
h4 {
  color: var(--text-black);
}
.detail_modal {
  width: 40vw;
  height: fit-content;
  z-index: 1;
  background: #ffffff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  border: 2px solid rgb(223, 223, 223);
  border-radius: 16px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
.head {
  display: flex;
  justify-content: space-between;
  padding: 0 2%;
}
#title {
  font-size: 24px;
  line-height: 50px;
  font-weight: 600;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
.info_content {
  padding: 5%;
  font-size: 18px;
  text-align: left;
}
.daty {
  float: left;
  width: fit-content;
  height: fit-content;
  border: 2px solid;
  border-color: var(--element);
  border-radius: 16px;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  padding: 16px;
  user-select: text;
}
.worker {
  float: left;
  width: fit-content;
  height: fit-content;
  border: 2px solid;
  border-color: var(--element);
  border-radius: 16px;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  padding: 16px;
  user-select: text;
}
.text {
  height: 300px;
  padding: 30px;
  text-align: justify;
}
.info {
  display: flex;
  height: fit-content;
  justify-content: space-around;
  margin-inline: 2vw;
}

.arch_desc h4 {
  padding-bottom: 8px;
  font-size: 18px;
  font-weight: 700;
}
.arch_desc p {
  overflow-wrap: break-word;
  word-wrap: break-word;
  padding-inline: 8px;
}
.arch_desc {
  justify-content: center;
  text-align: left;
  padding: 16px;
  font-size: 16px;
  user-select: text;
  border: 2px solid;
  border-color: var(--element);
  border-radius: 16px;
  margin: 2vw;
  height: 23.12vh;
  overflow: auto;
}
@media screen and (orientation: portrait) {
  .detail_modal {
    width: 80vw;
    height: fit-content;
  }
}

@media screen and (max-width: 600px) {
  .arch_info {
    flex-direction: column;
  }
  .arch_text {
    width: 100%;
  }
}
</style>
