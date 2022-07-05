<template>
  <div v-if="filesDownloading">Files downloading</div>
  <div v-else-if="files.length === 0">No files found</div>
  <template v-else>
    <div :class="classlist">
      <template v-for="file in files" :key="file.id">
         <FileBox :file="file" :row="row" @add="onAddClick(file.id)"/>
        </template>
    </div>
    <AppPagination :count="filesTotal" :page="page" :limit="limit" @page-change="changePage" />
  </template>
</template>

<script setup lang="ts">
import AppPagination from "@/components/AppPagination.vue";
import FileBox from "@/components/FileBox.vue";
import { useFiles } from "@/composable/useFiles";
import { toRefs } from "vue";
export interface Props {
  row: number;
}
export interface Emits {
  (e: 'addFile', id: number): void
}
const emit = defineEmits<Emits>()
const props = defineProps<Props>();
const { row } = toRefs(props);
let classlist = "d-flex flex-wrap justify-content-center";
if (row.value) {
  classlist = "";
}
const limit = 25;
const { fetchFiles, filesDownloading, files, filesTotal, changePage, page } =
  useFiles();

function onAddClick(id: number) {
  emit("addFile", id);
}

// await fetchFiles(limit);
</script>
