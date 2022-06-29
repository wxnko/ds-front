<template>
  <div class="sidenav">
    <div class="sidenav-brand">
      <router-link to="/"> Digital signage </router-link>
    </div>
    <div class="sidenav-menu">
      <NavigationItem path="/dashboard" icon="dashboard" name="Dashboard" />
      <NavigationItem
        path=""
        icon="subscriptions"
        name="Playlists"
        :items="playlistsArray"
      />
      <NavigationItem path="/users" icon="group" name="Users" />
      <NavigationItem path="/profile" icon="person" name="Profile" />
      <NavigationItem
        path="/#"
        icon="logout"
        name="Logout"
        v-on:click="onLogout"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { pushRouter } from "@/router";
import type { UpdateUser } from "@/services/api";
import { useUserStore } from "@/stores/user";
import NavigationItem from "./NavigationItem.vue";
const userStore = useUserStore();

const onLogout = async () => {
  userStore.updateUser(null);
  console.log("CLIC");
  await pushRouter("login");
};

const playlistsArray = [
  {
    id: 1,
    name: "Playlist 1",
    path: "/playlist/1",
  },
  {
    id: 2,
    name: "Playlist 2",
    path: "/playlist/2",
  },
  {
    id: 3,
    name: "Playlist 3",
    path: "/playlist/3",
  },
];
</script>
<style>
.main {
  margin-left: 200px;
}
</style>
<style scoped>
ul,
li {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.sidenav {
  height: 100%;
  width: 200px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: var(--color-background-nav);
  overflow-x: hidden;
  padding-top: 20px;
  padding-left: 10px;
  color: var(--vt-c-text-dark-2);
  -webkit-box-shadow: 1px 0px 31px -17px rgba(66, 68, 90, 1);
  -moz-box-shadow: 1px 0px 31px -17px rgba(66, 68, 90, 1);
  box-shadow: 1px 0px 31px -17px rgba(66, 68, 90, 1);
}

.sidenav-brand {
  font-size: 1.5em;
  font-weight: bold;
  color: var(--color-text-nav);
  margin-bottom: 20px;
}
</style>
