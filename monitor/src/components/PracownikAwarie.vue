<script setup>
import { lang } from "@/config";
import { defineEmits, defineProps } from "vue";

const close = defineEmits(["close"]);
const props = defineProps({
  pracownik: Object,
  awarie: Array,
});
const emit = () => {
  close("close");
};
let getDateFromString = (string) => {
  let date = new Date(string);
  date.setTime(date.getTime() + 2 * 60 * 60 * 1000);
  return `${date.toLocaleDateString("pl-PL")} ${date.toLocaleTimeString(
    "pl-PL"
  )}`;
};
</script>

<template>
  <div class="fog" @click.self="emit">
    <div class="emp_detail">
      <div class="head">
        <div id="modal_title">
          {{ lang.employee }} {{ props.pracownik.imie }}
          {{ props.pracownik.nazwisko }}
        </div>
        <button class="back_button" @click="emit">
          <v-icon color="#aaa">mdi-close</v-icon>
        </button>
      </div>
      <hr color="#dddddd" />
      <div class="info2">
        <div class="pracownik-details">
          <p>{{ lang.malfunctionList }}:</p>
          <table v-if="props.awarie.length > 0" class="header2">
            <thead>
              <th >{{ lang.reportTitle }}</th>
              <th >{{ lang.workplace }}</th>
              <th >{{ lang.dateRegistered }}</th>
            </thead>
            <tr
              v-for="awaria in props.awarie"
              :key="awaria.id"
              style="padding: 0"
            >
              <td >{{ awaria.id }}</td>
              <td >
                [{{ awaria.stanowisko.kod }}] {{ awaria.stanowisko.nazwa }}
              </td>
              <td >
                {{ getDateFromString(awaria.data_zgloszenia) }}
              </td>
            </tr>
          </table>
          <div v-else>{{ lang.noAssignedMalfunctions }}</div>
        </div>
      </div>
      <hr color="#dddddd" />
      <div class="awaria_head"></div>
    </div>
  </div>
</template>

<style>
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
.header2 {
  width: 100%;
  padding: 0 40px 10px 40px;
  font-size: 16px;
  user-select: none;
}

.header2 tr, th {
  height: 32px;
}

.emp_detail {
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
  user-select: text;
}
.head {
  display: flex;
  justify-content: space-between;
  padding: 0 2%;
  user-select: text;
}
#modal_title {
  font-size: 24px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  line-height: 50px;
  font-weight: 600;
}
tr, thead {
  user-select: text;
  text-align: center;
  
}
.info2 {
  padding: 5%;
  font-size: 18px;
  text-align: left;
  width: 100%;
  height: fit-content;
  user-select: text;
}
.inner {
  display: grid-cell;
  justify-content: center;
  width: 100%;
  height: 100%;
  float: left;
  text-align: left;
  padding: 16px;
  user-select: text;
}
.inner p,
.pracownik-details p {
  padding-bottom: 8px;
  font-weight: 700;
}
.pracownik_details {
  width: 100%;
  height: 500px;
  box-sizing: border-box;
  float: left;
  text-align: left;
  padding: 16px;
  user-select: text;
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
  height: 256px;
}
.awaria {
  background-color: var(--element);
  border-radius: 30px;
  border: 3px solid black;
  text-align: center;
}

@media screen and (orientation: portrait) {
  .emp_detail {
    width: 90vw;
  }
}

@media screen and (orientation: landscape) {
  @media screen and (max-width: 1300px) {
    .emp_detail {
      width: 60vw;
    }
  }
}

</style>
