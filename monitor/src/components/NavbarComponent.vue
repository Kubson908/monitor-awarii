<script setup>
import { ref } from "vue";
import { state } from "../main.js";
import { lang } from "@/config";
const drawer = ref(false);

const title = ref("Monitor awarii");
if (window.location.pathname == "/") title.value = lang.mainTitle;
if (window.location.pathname == "/archiwum") title.value = lang.archiveTitle;
function archiwum() {
  state.monitor = false;
  title.value = lang.archiveTitle;
  history.pushState({}, null, "/archiwum");
}

function monitor() {
  state.monitor = true;
  title.value = lang.mainTitle;
  history.pushState({}, null, "/");
}
</script>

<template>
  <nav class="navbar">
    <v-app-bar class="navbar" theme="dark" density="compact">
      <div class="test">
        <v-app-bar-nav-icon
          variant="text"
          @click.stop="drawer = !drawer"
          class="abs"
        ></v-app-bar-nav-icon>
      </div>
      <v-app-bar-title id="nav-title" v-model="title"
        >{{ title }}
        <template v-slot:prepend> </template>
      </v-app-bar-title>
      <div class="test"></div>
    </v-app-bar>
    <v-navigation-drawer
      color="#392A82"
      permanent
      theme="dark"
      v-model="drawer"
    >
      <v-list color="transparent" nav>
        <v-list-item prepend-icon="mdi-calendar" @click="monitor()" link>
          <v-list-item-title>{{ lang.mainTitle }}</v-list-item-title>
        </v-list-item>
        <v-list-item prepend-icon="mdi-file-multiple" @click="archiwum()" link>
          <v-list-item-title>{{ lang.archiveTitle }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<style>
.navbar {
  width: 100vw;
  float: left;
  text-align: center;
  user-select: none;
  background: var(--navbar) !important;
}
.abs {
  margin: 0;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}
.test {
  display: block;
  width: 64px;
  height: 4.95vh;
}
#nav-title {
  display: inline;
  left: 0;
  right: 0;
  font-size: 2em;
  letter-spacing: 0.25rem;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
.mt-495vh {
  margin-top: 4.95vh;
}
</style>
