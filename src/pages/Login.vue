<template>
  <div class="login-page">
    <div class="system-name">Digital signage<br>operational system</div>
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
          class="btn btn-lg btn-orange justify-content-end"
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
import { createToaster } from "@meforma/vue-toaster";
const toast = createToaster({position: 'top-right', maxToasts: 1});


const formRef = ref<HTMLFormElement | null>(null);
const form: LoginUser = reactive({
  username: "",
  password: "",
});

const { updateUser } = useUserStore();

const errors = ref();

const login = async () => {
  errors.value = '';

  if (!formRef.value?.checkValidity()) return;
  try {
    errors.value ='';
    const result = await api.auth.login({ ...form });
    if (result.ok) {
      updateUser(result.data);
      await pushRouter("dashboard");
    }
  } catch (err) {
    toast.error(`Wrong username or password`);
  }
};
</script>

<style scoped>
.login-page {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.form {
  transform: translateX(25%);
  background-color: var(--vt-c-black-soft);
  padding: 30px;
  border-radius: 3px;
  -webkit-box-shadow: 0px 0px 24px 0px var(--vt-c-black-darker);
  -moz-box-shadow: 0px 0px 24px 0px var(--vt-c-black-darker);
  box-shadow: 0px 0px 24px 0px var(--vt-c-black-darker);
}
.form form {
  display: flex;
  flex-direction: column;
  align-items: end;
}
.form-group {
  margin-bottom: 10px;
}

.form-control {
  background-color: var(--vt-background-soft)
}
.system-name {
  transform: translateX(-25%);
  font-size: 2.5rem;
  font-weight: bold;
  color: var(--color-heading);
  text-align: center;
}
</style>
