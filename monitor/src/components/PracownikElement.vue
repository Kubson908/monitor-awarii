<script setup>
import { defineProps, ref, onBeforeMount, getCurrentInstance } from "vue";
import axios from "axios";
import ClaimConfirm from "@/components/ClaimConfirm.vue";
import PracownikAwarie from "@/components/PracownikAwarie.vue";
import { prefix } from "@/config";
import { state } from "@/main";
import { lang } from "@/config";
const props = defineProps({
  pracownik: Object,
  awaria: Object,
});
// const awarie = ref([]);
const awaria = ref(null);
const index = state.pracownicy.indexOf(props.pracownik);
onBeforeMount(async () => {
  let self = getCurrentInstance().parent.subTree.el;
  const res = await axios
    .get(`http://${prefix}/api/awarie/pracownik/` + props.pracownik.id, {
      headers: {
        "x-access-token": state.token,
      },
    })
    .catch((error) => {
      console.log(error);
    });
  state.pracownicy[index].awarie = await res.data;

  self.addEventListener("dropped", (evt) => {
    awaria.value = evt.detail;
    modal.value = true;
  });
});
const modal = ref(false);
const openAwarie = ref(false);
</script>

<template>
  <div class="pracownik">
    <div class="pracownik_background">
      <div class="current-info">
        {{ props.pracownik.imie }}
        <br />
        {{ props.pracownik.nazwisko }}
      </div>
      <div class="profile">
        <v-btn
          height="56"
          width="56"
          icon
          @click="openAwarie = true"
          class="profile-button"
        >
          <v-icon
            class="profile-icon"
            icon="mdi-account-circle-outline"
            size="56"
            :color="
              props.pracownik.awarie && props.pracownik.awarie.length > 0
                ? '#ff0000'
                : '#3EF061'
            "
          ></v-icon>
        </v-btn>
      </div>
      <div class="opis">
        <p v-if="props.pracownik.awarie && props.pracownik.awarie.length > 0">
          <span class="semi-bold">{{ lang.reportTitle }}:</span>
          {{ props.pracownik.awarie[0].id }}
        </p>
        <p v-else>
          {{ lang.noAssignedMalfunctions }}
        </p>
        <p v-if="props.pracownik.awarie && props.pracownik.awarie.length > 0">
          <span class="semi-bold">{{ lang.workplace }}:</span>
          {{ props.pracownik.awarie[0].stanowisko.nazwa }}
        </p>
      </div>
    </div>
    <teleport to="body">
      <Transition name="details">
        <ClaimConfirm
          v-if="modal"
          :pracownik="props.pracownik"
          :awaria="awaria"
          @close="() => (modal = false)"
          @confirm="assign(pracownik.id)"
        />
      </Transition>
      <Transition name="details">
        <PracownikAwarie
          v-if="openAwarie"
          :pracownik="props.pracownik"
          :awarie="props.pracownik.awarie"
          @close="openAwarie = false"
        />
      </Transition>
    </teleport>
  </div>
</template>

<style>
.details-enter-active .detail {
  animation: popup 0.25s;
}
.details-leave-active .detail {
  animation: popup 0.25s reverse;
}

.pracownik {
  padding: 6px 4px 6px 4px;
  width: 220px;
  display: flex;
  justify-content: center;
}
.pracownik_background {
  background: var(--element);
  height: 120px;
  width: 220px;
  border-radius: 8px;
  text-align: center;
  font-size: 16px;
  box-shadow: #888 0 2px 6px;
}
.profile {
  padding: 8px;
  float: right;
  display: flex;
  align-items: flex-end;
}
.profile-button {
  align-content: center;
  vertical-align: middle;
  background: var(--button) !important;
}
.current-info {
  float: left;
  font-size: 16px;
  text-align: left;
  padding: 16px;
  font-weight: 700;
}
.profile-icon {
  float: right;
  margin-top: 0;
  border-radius: 100%;
}
.opis {
  font-size: 14px;
  clear: both;
  padding: 0 16px 16px 16px;
}
.opis p {
  width: 100%;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.semi-bold {
  font-weight: 600;
}


</style>
