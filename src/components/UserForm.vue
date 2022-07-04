<template>
  <form @submit.prevent="onSubmit">
    <input type="hidden" class="form-control" :value="user?.id" />
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label">Username</label>
      <input type="text" class="form-control" v-model="user.username" />
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">Password</label>
      <input type="text" class="form-control" v-model="user.password" />
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">Email</label>
      <input type="text" class="form-control" v-model="user.email" />
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">First name</label>
      <input type="text" class="form-control" v-model="user.first_name" />
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label">Last name</label>
      <input type="text" class="form-control" v-model="user.last_name" />
    </div>
    <div class="mb-3 form-check">
      <input type="checkbox" class="form-check-input" v-model="user.is_super" />
      <label class="form-check-label" for="exampleCheck1">Super user</label>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
</template>

<script setup lang="ts">
import { toRefs } from "vue";
import { useUser } from "@/composable/useUser";
import { createToaster } from "@meforma/vue-toaster";
const toast = createToaster({position: 'top-right', maxToasts: 1});

export interface Props {
  userId?: number;
}
let user = {};
const props = defineProps<Props>();
const { userId } = toRefs(props);
const { fetchUser, userDownloading, userRef, upsertUser, userUpserting } =
  useUser();

user = userRef;
if(userId.value)
  await fetchUser(userId.value);

async function onSubmit() {
  try {
    await upsertUser(user.value);
  } catch (err) {
    toast.error('Set every field!');
  }
}

function isSuperUser() {
  console.log;
}
</script>
