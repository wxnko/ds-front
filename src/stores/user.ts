import { defineStore } from "pinia";
import { api } from "@/services";
import type { UserLogin } from "@/services/api/auth";
import Storage from "@/utils/storage";
import { computed, ref } from "vue";

export const userStorage = new Storage<User>("user");

export const isAuthorized = (): boolean => !!userStorage.get();

export const useUserStore = defineStore("user", () => {
  const user = ref(userStorage.get());
  const isAuthorized = computed(() => user.value !== null);

  function updateUser(userData?: UserLogin | null) {
    if (userData === undefined || userData === null) {
      userStorage.remove();
      api.setSecurityData(null);
      user.value = null;
    } else {
      userStorage.set(userData);
      api.setSecurityData(userData.accessToken);
      user.value = userData;
    }
  }

  function logout() {
    userStorage.remove();
    api.setSecurityData(null);
    user.value = null;
  }

  return {
    user,
    isAuthorized,
    updateUser,
    logout,
  };
});
