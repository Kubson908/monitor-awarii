<script setup>
import { computed } from "@vue/reactivity";
import AwariaElement from "./AwariaElement.vue";
import ArchiwumElement from "./ArchiwumElement.vue";
import { lang } from "@/config";
import { state } from "../main.js";

const sorted = computed(() => {
  return state.monitor
    ? state.awarie.sort((a, b) => a.priorytet - b.priorytet)
    : state.awarie_archiwum.sort(
        (a, b) => new Date(a.data_naprawy) - new Date(b.data_naprawy)
      );
});
const display_type = computed(() => {
  return state.monitor ? ["grid", "grid_item"] : ["list", ""];
});
if (window.location.pathname == "/") state.monitor = true;
if (window.location.pathname == "/archiwum") state.monitor = false;
</script>

<template>
  <div class="background">
    <v-list v-if="sorted" :class="display_type[0]">
      <div class="header" v-if="!state.monitor">
        <div class="heading">{{ lang.reportTitle }}</div>
        <div class="heading">{{ lang.workplace }}</div>
        <div class="heading">{{ lang.dateRegistered }}</div>
        <div class="heading">{{ lang.details }}</div>
      </div>
      <v-list-item
        v-for="item in sorted"
        :key="item.id"
        :class="display_type[1]"
      >
        <AwariaElement v-if="state.monitor" :awaria="item" :id="item.id" />
        <ArchiwumElement v-else :awaria="item" />
        <AwariaElement
          v-if="state.dragging && state.dragged.id === item.id && state.monitor"
          :awaria="item"
          class="dragged"
          :id="item.id"
        />
      </v-list-item>
    </v-list>
  </div>
</template>

<style>
.list-bg {
  background-color: var(--list) !important;
}
.background {
  padding: 30px;
  width: 70vw;
  height: 70vh;
  background-color: var(--list) !important;
  margin: auto;
  border: solid 1px rgb(223, 223, 223);
  border-radius: 24px;
  box-shadow: #888 0 2px 8px;
  overflow: auto;
}
.dragged {
  visibility: hidden;
  position: fixed;
  z-index: 999;
  user-select: none;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  background: var(--list) !important;
}

.list {
  display: block;
  background: var(--list) !important;
}
.grid_item {
  justify-content: center;
}
/* width */
.background::-webkit-scrollbar {
  width: 0px;
}
::-webkit-scrollbar {
  width: 0px;
}

/* Track */
.background::-webkit-scrollbar-track {
  background: #f1f1f1;
  display: none;
}

/* Handle */
.background::-webkit-scrollbar-thumb {
  background: #888;
  display: none;
}

/* Handle on hover */
.background::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.header {
  display: grid;
  grid-template-columns: 1fr 3fr 3fr 1fr;
  padding: 0 40px 10px 40px;
  font-size: 20px;
  user-select: none;
}
.heading {
  font-weight: 600;
}

@media only screen and (max-width: 1400px) {
  .background {
    width: 90vw;
    padding: 0;
  }
}
@media only screen and (max-width: 1000px) {
  .grid {
    grid-template-columns: 1fr 1fr;
  }
  .background {
    width: 95vw;
    padding: 0;
  }
}
@media only screen and (max-width: 700px) {
  .grid {
    grid-template-columns: 1fr;
  }
  .background {
    padding: 10px;
  }
}
@media screen and (min-width: 2000px) {
}
</style>
