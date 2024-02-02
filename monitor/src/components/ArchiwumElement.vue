<script setup>
import { defineProps, ref } from "vue";
import ArchiwumDetail from "./ArchiwumDetail.vue";
import { lang } from "@/config";

const props = defineProps({
  awaria: Object,
});
const id = {
  id: props.awaria.id,
};
const details = ref(false);
let getDateFromString = (string) => {
  let date = new Date(string);
  return `${date.toLocaleDateString("pl-PL")} ${date.toLocaleTimeString(
    "pl-PL"
  )}`;
};
</script>
<template>
  <div class="element">
    <div class="list_item_background">
      <div class="item_content">
        <div class="item bolder">
          {{ lang.reportTitle }} {{ props.awaria.id }}
        </div>
        <div class="item">{{ props.awaria.stanowisko.nazwa }}</div>
        <div class="item">
          {{ getDateFromString(props.awaria.data_naprawy) }}
        </div>
        <div class="item_buttons">
          <v-btn
            icon
            class="item_button"
            @click.stop="details = true"
            :size="40"
            color="grey"
          >
            <v-icon
              class="item_button"
              icon="mdi-information-variant"
              :size="30"
            ></v-icon>
          </v-btn>
        </div>
      </div>
    </div>
    <Transition name="details">
      <ArchiwumDetail
        @close_info="() => (details = false)"
        v-if="details"
        :id="id"
        :stanowisko="props.stanowisko"
        :pracownik="props.pracownik"
        :awaria="props.awaria"
      />
    </Transition>
  </div>
</template>
<style>
.list_item_background {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  height: 80px;
  padding: 16px;
  background: #d9d9d9;
  border-radius: 8px;
  width: 100%;
}
.item_info {
  height: 96px;
  width: 100%;
  display: block;
}
.item_buttons {
  width: 100%;
  display: flex;
  justify-content: center;
}
.item_button {
  align-self: center;
}
.item_content {
  display: grid;
  grid-template-columns: 1fr 3fr 3fr 1fr;
  grid-template-rows: 100%;
  height: 100%;
}
.item {
  width: 100%;
  margin: auto;
  font-weight: 600;
  font-size: 18px;
}
.bolder {
  font-weight: 700;
}
</style>
