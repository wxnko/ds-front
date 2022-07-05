<template>
  <div v-if="playlistDownloading">Playlist downloading</div>
  <template v-else>
    <template v-if="img">
      <div class="image-fullscreen" @click="hideImage()">
        <img :src="img" />
      </div>
    </template>
    <h1 class="display-6 text-center m-2">{{ playlist.name }}</h1>
    <div class="media">
      <div class="card" style="width: 100%" v-for="file in playlist.files">
        <div class="card-body">
          <div class="row">
            <div
              class="col-1 cursor-pointer"
              @click="showImage(getFile(file.id).url)"
            >
              <img :src="getFile(file.id).url" />
            </div>
            <div class="col-4">{{ getFile(file.id).name }}</div>
            <div class="col-3">{{ prettyDuration(getFile(file.id).default_time) }}</div>
            <div class="col-3">
              {{ prettyDate(getFile(file.id).created_at) }}
            </div>
            <div class="col-1">
              <i class="material-icons cursor-pointer">delete</i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
import AppPagination from "@/components/AppPagination.vue";
import { usePlaylist } from "@/composable/usePlaylist";
import { files } from "@/composable/useFiles";
import { computed, toRefs, ref, watch } from "vue";
const { fetchPlaylist, playlistDownloading, playlist } = usePlaylist();
const img = ref<string>("");

interface Props {
  playlistId: string;
}

function showImage(url) {
  img.value = url;
}

function hideImage() {
  img.value = "";
}

const props = defineProps<Props>();
const { playlistId } = toRefs(props);
watch(playlistId, async function (newId) {
  await fetchPlaylist(parseInt(newId));
});
const filesObject = {};
function getFile(id) {
  if (filesObject[id]) {
    return filesObject[id];
  }
  const file = files.value.find((val) => val.id == id);
  filesObject[file.id] = file;
  return file;
}
function prettyDate(date) {
  return new Date(date).toLocaleDateString();
}
function prettyDuration(duration) {
  console.log(duration);
  const seconds = duration / 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  if (hours > 1) {
    return `${hours.toFixed(2)} hours`;
  }
  if (minutes > 1) {
    return `${minutes.toFixed(2)} minutes`;
  }
  return `${seconds.toFixed(2)} seconds`;
}
await fetchPlaylist(parseInt(playlistId.value));
</script>

<style scoped>
.card + .card {
  margin-top: 1rem;
}
.card img {
  height: unset;
  max-width: 100%;
  object-fit: contain;
}
.image-fullscreen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: grid;
  align-items: center;
  justify-content: center;
}
.image-fullscreen img {
  max-width: 90%;
  max-height: 90%;
  margin: 0 auto;
}
</style>
