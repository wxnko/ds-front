<template>
  <Topbar title="Users">
    <template v-slot:buttons>
      <router-link to="/users/add"
        ><i class="material-icons">add</i>
      </router-link>
    </template>
  </Topbar>
  <div class="container">
    <Suspense>
      <UsersList />
      <template #fallback> Users downloading</template>
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import UsersList from "@/components/UsersList.vue";
import Topbar from "@/components/Topbar.vue";
</script>

<style scoped></style>
