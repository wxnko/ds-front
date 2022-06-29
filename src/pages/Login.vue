<template>
  <div class="login-page">
    <div class="form">
      <form ref="formRef" @submit.prevent="login">
        <fieldset class="form-group" aria-required="true">
          <input
            v-model="form.username"
            class="form-control form-control-lg"
            required
            placeholder="Email"
          />
        </fieldset>
        <fieldset class="form-group">
          <input
            v-model="form.password"
            class="form-control form-control-lg"
            type="password"
            required
            placeholder="Password"
          />
        </fieldset>
        <button
          class="btn btn-lg btn-primary pull-xs-right"
          :disabled="!form.username || !form.password"
          type="submit"
        >
          Sign in
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { pushRouter } from "@/router";
import { api } from "@/services";
import type { LoginUser } from "@/services/api/auth";
import { useUserStore } from "@/stores/user";
import { reactive, ref } from "vue";

const formRef = ref<HTMLFormElement | null>(null);
const form: LoginUser = reactive({
  username: "",
  password: "",
});

const { updateUser } = useUserStore();

const errors = ref();

const login = async () => {
  errors.value = {};

  if (!formRef.value?.checkValidity()) return;

  const result = await api.auth.login({ ...form });
  console.log(result);
  if (result.ok) {
    updateUser(result.data);
    await pushRouter("dashboard");
  } else {
    errors.value = await result.error;
  }
};
</script>
