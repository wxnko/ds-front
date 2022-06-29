<script setup lang="ts">
import Footer from "./components/Footer.vue";
import Navigation from "./components/Navigation.vue";
import { useUserStore } from "@/stores/user";
const userStore = useUserStore();

const classes = () =>
  userStore.isAuthorized ? "main" : "main main--unauthorized";
</script>

<template>
  <Navigation v-if="userStore.isAuthorized" />
  <div :class="classes()">
    <RouterView />
  </div>
  <!-- <Footer v-if="userStore.isAuthorized" /> -->
</template>

<style>
@import "./assets/reset.css";
@import "./assets/base.css";
</style>
