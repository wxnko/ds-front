<template>
  <div :class="classList">
    <div class="card m-2">
      <img :src="file.url" class="card-img-top" :alt="file.name" />
      <div class="card-icon cursor-pointer" @click="iconClicked">
        <i class="material-icons">{{ icon }}</i>
      </div>
      <div class="card-body">
        <h5 class="card-title">{{ file.name }}</h5>
        <p class="card-text">
          <span>File size: {{ calculateFileSize(file.size) }}</span>
        </p>
        <p class="card-text">
          <span
            >Default duration: {{ calculateDuration(file.default_time) }}</span
          >
        </p>
        <p class="card-text">
          <span>Date added: {{ prettyDate(file.created_at) }}</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { toRefs } from "vue";
import type { File } from "@/services/api/files";
export interface Props {
  file: File;
  row?: number;
}
export interface Emits {
  (e: 'add', id: number): void
}


const props = defineProps<Props>();
const { file, row } = toRefs(props);

const emit = defineEmits<Emits>()

let classList = "col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2";
let icon = "delete";
if (row.value) {
  icon = "add";
  classList = `col-${row.value}`;
}

const calculateFileSize = (size: number) => {
  const kb = size / 1024;
  if (kb < 1024) {
    return `${kb.toFixed(2)} KB`;
  }
  const mb = kb / 1024;
  return `${mb.toFixed(2)} MB`;
};

const calculateDuration = (durationMilliseconds: number) => {
  const seconds = durationMilliseconds / 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  if (hours > 1) {
    return `${hours.toFixed(2)} hours`;
  }
  if (minutes > 1) {
    return `${minutes.toFixed(2)} minutes`;
  }
  return `${seconds.toFixed(2)} seconds`;
};

const prettyDate = (date: string) => {
  const d = new Date(date);
  return d.toLocaleDateString();
};
function iconClicked() {
  if (!row) {
    deleteImage();
  } else {
    emit("add");
  }
}
function deleteImage() {
  confirm("Are you sure?");
}
</script>
