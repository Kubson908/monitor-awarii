<script setup>
import { state } from "../main.js";
import PracownikElement from "@/components/PracownikElement.vue";
import { onBeforeMount, ref, onMounted, defineEmits } from "vue";

const fr = ref("");

onBeforeMount(() => {
  for (let i = 0; i < state.pracownicy.length; i++)
    fr.value = fr.value + "1fr ";
});
const modal = ref(false);

const emit = defineEmits(["loaded"]);
onMounted(() => {
  emit("loaded");
});
</script>
<template>
  <div class="emp_background">
    <v-list
      class="pracownik_list"
      :style="{ 'grid-template-columns': fr }"
      bg-color="rgba(0%, 0%, 100%, 0)"
    >
      <v-list-item
        v-for="pracownik in state.pracownicy"
        :key="pracownik.id"
        style="margin: auto"
        class="pracownik-item"
      >
        <PracownikElement :pracownik="pracownik" :modal="modal" />
      </v-list-item>
    </v-list>
  </div>
</template>

<style>
.emp_background {
  min-width: 70vw;
  max-width: 100vw;
  background-color: var(--list);
  border: solid 1px rgb(223, 223, 223);
  border-radius: 24px;
  box-shadow: #888 0 2px 8px;
  margin: auto;
  display: flex;
  overflow: auto hidden;
}
.pracownik_list {
  min-width: 100%;
  height: 100%;
  display: grid;
  border-radius: 30px;
  flex-shrink: 0;
  padding: 0px !important;
}

@media only screen and (max-width: 1300px) {
  .emp_background {
    width: 95vw;
  }
}
@media only screen and (min-width: 2500px) {
  .emp_background {
    height: 21vh;
  }
  .pracownik-item {
    transform: scale(1.3);
  }
}

/* width */
.emp_background::-webkit-scrollbar {
  display: none;
}

/* Track */
.emp_background::-webkit-scrollbar-track {
  display: none;
}

/* Handle */
.emp_background::-webkit-scrollbar-thumb {
  display: none;
}
</style>
