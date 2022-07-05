<template>
  <Topbar title="Playlist">
    <template v-slot:buttons>
      <div class="cursor-pointer upload-action" @click="selectImage">
        <i class="material-icons">add</i>
        <form style="display: none">
          <input type="file" @change="uploadFile" accept="video/*,image/*" />
        </form>
      </div>
    </template>
  </Topbar>
  <div class="container">
    <Suspense>
      <PlaylistComponent :playlistId="id" />
      <template #fallback> Playlist loading</template>
    </Suspense>
  </div>
  <div class="container-nav top">
    <Suspense>
      <FilesList :row="row" @addFile="addFile" />
      <template #fallback> Files loading</template>
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import Topbar from "@/components/Topbar.vue";
import PlaylistComponent from "@/components/PlaylistComponent.vue";
import FilesList from "@/components/FilesList.vue";
import { computed, ref, watch } from "vue";
import type { RouteParams } from "vue-router";
import { useRoute } from "vue-router";
function log(a, b) {
  console.log(a, b);
}
const route = useRoute();
const id = computed<number>(() => route.params.id as number);

const row = 12;
function selectImage(event) {
  document.querySelector(".container-nav").classList.toggle("active");
}
function addFile(id) {
  console.log(id);
}
</script>

<style scoped></style>
