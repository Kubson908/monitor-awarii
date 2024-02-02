import * as io from "socket.io-client";
import { ref, watch } from "vue";
import { state } from "./main.js";
import axios from "axios";
import { prefix, username, pass } from "./config.js";
import { lang } from "./config.js";

const jwt = ref(null);

export const login = async () => {
  const token = await axios.post(`http://${prefix}/api/auth/login`, {
    username: username,
    password: pass,
  });
  state.token = await token.data["access_token"];
  jwt.value = await JSON.stringify(token.data["access_token"]).replaceAll(
    '"',
    ""
  );
  return;
};

const socket = io(`ws://${prefix}`, {
  reconnectionDelayMax: 10000,
  autoConnect: false,
  transportOptions: {
    polling: {
      extraHeaders: {
        token: jwt.value,
      },
    },
  },
});

watch(jwt, (newValue) => {
  socket.io.opts.transportOptions.polling.extraHeaders.token = newValue;
});

export { socket };

socket.on("connect", async () => {
  const lista = await axios
    .get(`http://${prefix}/api/awarie/lista`, {
      headers: {
        "x-access-token": state.token,
      },
    })
    .catch((error) => {
      console.log(error);
    });
  state.awarie = await lista.data;

  const archiwum = await axios
    .get(`http://${prefix}/api/awarie/ukonczone`, {
      headers: {
        "x-access-token": state.token,
      },
    })
    .catch((error) => {
      console.log(error);
    });
  state.awarie_archiwum = await archiwum.data;

  const pracownicy = await axios
    .get(`http://${prefix}/api/pracownicy/lista`, {
      headers: {
        "x-access-token": state.token,
      },
    })
    .catch((error) => {
      console.log(error);
    });
  state.pracownicy = pracownicy.data;
  state.connected = true;
});

socket.on("disconnect", () => {
  state.connected = false;
});

socket.on("newAwaria", (e) => {
  state.awarie.push(e.newAwaria);
  state.snackbar = true;
  state.snackbar_msg = lang.newMalfunction;
});

socket.on("claimedAwaria", (e) => {
  let to_update = state.awarie.findIndex((elem) => elem.id === e.updated.id);
  if (to_update) {
    state.awarie[to_update] = e.updated;
    state.snackbar = true;
    state.snackbar_msg = lang.malfunctionAccepted + `${to_update}`;
    const index = state.pracownicy.findIndex(
      (elem) => elem.id === e.updated.pracownik.id
    );
    state.pracownicy[index].awarie.push(e.updated);
  }
});

socket.on("assignedAwaria", (e) => {
  let to_update = state.awarie.findIndex((elem) => elem.id === e.updated.id);
  if (to_update != null) {
    state.awarie[to_update] = e.updated;
    state.snackbar = true;
    state.snackbar_msg = lang.malfunctionAssigned + `${e.updated.id}`;
    const index = state.pracownicy.findIndex(
      (elem) => elem.id === e.updated.pracownik.id
    );
    state.pracownicy[index].awarie.push(e.updated);
  }
});

// dodać co trzeba
socket.on("finishedAwaria", (e) => {
  let to_delete = state.awarie.findIndex((elem) => elem.id === e.updated.id);
  if (to_delete != null) {
    state.awarie_archiwum.push(e.updated);
    state.awarie.splice(to_delete, 1);
    const index = state.pracownicy.findIndex(
      (elem) => elem.id === e.updated.pracownik.id
    );
    state.pracownicy[index].awarie = state.pracownicy[index].awarie.filter(
      (elem) => elem.id != e.updated.id
    );
  }
});
