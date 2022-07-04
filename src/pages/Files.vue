<template>
  <Topbar title="Files">
    <template v-slot:buttons>
      <div class="cursor-pointer upload-action" @click="uploadAction">
        <i class="material-icons">file_upload</i>
        <form style="display: none;">
          <input type="file" @change="uploadFile" accept="video/*,image/*" />
        </form>
      </div>
    </template>
  </Topbar>
  <div class="container">
    <Suspense>
      <FilesList />
      <template #fallback> Files loading</template>
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import FilesList from "@/components/FilesList.vue";
import Topbar from "@/components/Topbar.vue";

function uploadAction() {
  const input = document.querySelector(".upload-action input[type=file]") as HTMLInputElement;
  input.click();
}

function uploadFile(event) {
  const input = event.target as HTMLInputElement;
  const files = input.files;
  if (files.length === 0) {
    return;
  }
  const file = files[0];
  console.log(file);
}
</script>

<style scoped></style>
