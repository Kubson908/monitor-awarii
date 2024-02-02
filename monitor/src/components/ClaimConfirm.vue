<script setup>
import { defineEmits, defineProps } from "vue";
import axios from "axios";
import { lang, prefix } from "@/config.js";
import { state } from "../main.js";
const props = defineProps({
  pracownik: Object,
  awaria: Object,
});
const close = defineEmits(["close"]);
const emit = () => {
  close("close");
};
function assign(idPracownika) {
  axios
    .patch(
      `http://${prefix}/api/awarie/${props.awaria.id}/${idPracownika}/przypisz`,
      {},
      {
        headers: {
          "x-access-token": state.token,
        },
      }
    )
    .catch((error) => {
      console.log(error);
    });
  close("close");
}
</script>
<template>
  <div class="fog" @click.self="emit">
    <div class="add">
      <div class="emp_head">
        <div id="modal_title">{{ lang.areYouSure }}</div>
        <button class="back_button" @click="emit">
          <v-icon color="#aaa">mdi-close</v-icon>
        </button>
      </div>
      <hr/>
      <div class="claim-text">
        <div class="wide-column">
          <div class="wide-column-text">
            <p>
              <b>{{ lang.malfunction }}:</b> {{ props.awaria.id }}
            </p>
            <p>
              <b>{{ lang.workplace }}:</b> {{ props.awaria.stanowisko.kod }} -
              {{ props.awaria.stanowisko.nazwa }}
            </p>
            <p>
              <b>{{ lang.priority }}:</b> {{ props.awaria.priorytet }}
            </p>
          </div>
        </div>
        <div class="column">
          <v-icon icon="mdi-arrow-right-thick"></v-icon>
        </div>
        <div class="wide-column">
          <div class="wide-column-text">
            <p>
              <b>{{ lang.employee }}:</b>
              {{ props.pracownik.imie + " " + props.pracownik.nazwisko }}
            </p>
          </div>
        </div>
      </div>
      <hr/>
      <div class="emp_head">
        <div class="emp_buttons">
        <v-btn class="claim_button left" @click="emit">{{ lang.no }}</v-btn>
        <v-btn class="claim_button right" @click="assign(props.pracownik.id)">
          {{ lang.yes }}
        </v-btn>
      </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.add {
  text-align: left;
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
  border: 2px solid rgb(223, 223, 223);
  border-radius: 16px;
  display: flex;
  flex-flow: column;
}
.claim-title {
  margin-bottom: 32px;
}
.bold-claim {
  font-weight: 700;
}
.emp_head {
  display: flex;
  justify-content: space-between;
  padding: 0 2%;
  height: 50px;
}
.details-enter-active .add {
  animation: popup 0.25s;
}
.details-leave-active .add {
  animation: popup 0.25s reverse;
}
.column {
  float: left;
  width: 10%;
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
}
.wide-column {
  float: left;
  width: 45%;
  padding: 2vh;
  height: 100%;
  vertical-align: middle;
  display: flex;
  justify-content: center;
}
.wide-column-text {
  width: fit-content;
  border: 2px solid;
  border-color: var(--element);
  border-radius: 16px;
  padding: 16px;
}
.emp_buttons {
  width: 100%;
  flex: auto;
  display: flex;
  justify-content: right;
}
.claim-text {
  overflow: hidden;
  width: 100%;
  display: flex;
  align-items: center;
}
.claim_button {
  background-color: var(--button);
  color: var(--bgcolor);
}
.claim_button:last-child {
  margin-left: 4vh;
}
.left {
  align-self: center;
  float: left;
}
.right {
  align-self: center;
  float: right;
}
@media screen and (orientation: portrait) {
  .add {
    width: 90vw;
  }
}

@media screen and (orientation: landscape) {
  @media screen and (max-width: 1300px) {
    .add {
      width: 60vw;
    }
  }
}
</style>
