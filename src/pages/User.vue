<template>
  <Topbar title="User form">
  </Topbar>
  <div class="container">
    <Suspense>
      <UserForm :userId="userId" />
      <template #fallback> Users download</template>
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import UserForm from "@/components/UserForm.vue";
import Topbar from "@/components/Topbar.vue";
import { useRoute } from 'vue-router'
import { computed } from 'vue';

const route = useRoute()
const userId = computed<string>(() => route.params.id as string)


</script>

<style scoped></style>
