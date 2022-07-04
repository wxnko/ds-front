<template>
  <div v-if="filesDownloading">Users downloading</div>
  <div v-else-if="files.length === 0">No users found</div>
  <template v-else>
    <div class="d-flex flex-wrap">
      <template v-for="file in files" :key="file.id">
         <FileBox :file="file"/>
        </template>
    </div>
    <AppPagination :count="filesTotal" :page="page" :limit="limit" @page-change="changePage" />
  </template>
</template>

<script setup lang="ts">
import AppPagination from "@/components/AppPagination.vue";
import FileBox from "@/components/FileBox.vue";
import { useFiles } from "@/composable/useFiles";
const limit = 25;
const { fetchFiles, filesDownloading, files, filesTotal, changePage, page } =
  useFiles();
console.log(files);
// await fetchFiles(limit);
</script>
