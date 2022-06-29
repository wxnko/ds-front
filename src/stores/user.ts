import { defineStore } from "pinia";
import { api } from "@/services";
import type { UserLogin } from "@/services/api/auth";
import Storage from "@/utils/storage";
import { computed, ref } from "vue";
import { pushRouter } from "@/router";

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
      let oldData = userStorage.get();
      if (!userData.refreshToken) {
        userData.refreshToken = oldData?.refreshToken;
      }
      userStorage.set(userData);
      api.setSecurityData({accessToken: userData.accessToken});
      user.value = userData;
    }
  }

  function updateToken() {
    return new Promise((resolve, reject) => {
      let user = userStorage.get();
      if(user.refreshToken) {
        api.auth.refreshToken({refreshToken: user.refreshToken})
          .then((res: {data: UserLogin}) => res.data)
          .then((userresp: UserLogin) => {
            updateUser(userresp);
            setTimeout(function() {
              resolve(userresp);
            }, 5)
          })
          .catch(() => {
            reject();
            logout();
          });
      } else {
        reject();
        logout();
      }
    })
  }

  function logout() {
    userStorage.remove();
    api.setSecurityData(null);
    user.value = null;
    pushRouter("login");
  }

  return {
    user,
    isAuthorized,
    updateUser,
    updateToken,
    logout,
  };
});
