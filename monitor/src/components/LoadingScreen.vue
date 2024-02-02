<script setup></script>

<template>
  <div id="loading">
    <span class="loader"><span class="loader-inner"></span></span>
  </div>
</template>

<style>
#loading {
  position: absolute;
  z-index: 1000;
  background-color: var(--bgcolor);
  height: 100vh;
  width: 100vw;

  text-align: center;
  line-height: 100vh;
}
.loader {
  display: inline-block;
  width: 30px;
  height: 30px;
  position: absolute;
  top: 40%;
  border: 4px solid var(--navbar);
  animation: loader 2s infinite ease;
}
.loader-inner {
  vertical-align: top;
  display: inline-block;
  width: 100%;
  background-color: var(--navbar);
  animation: loader-inner 2s infinite ease-in;
}

@keyframes loader {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(180deg);
  }
  50% {
    transform: rotate(180deg);
  }
  75% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes loader-inner {
  0% {
    height: 0%;
  }
  25% {
    height: 0%;
  }
  50% {
    height: 100%;
  }
  75% {
    height: 100%;
  }
  100% {
    height: 0%;
  }
}
</style>
