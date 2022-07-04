import { ref, watch } from "vue";
import type { MultipleUserResponse, User, UpdateUser, AddUser, UserResponse } from '@/services/api/users';
import { api } from "@/services";
import useAsync from "@/utils/use-async";

export function useUser() {
  const userRef = ref<User>({} as User);

  async function fetchUser(userId): Promise<void> {
    userRef.value = {} as User;
    let responsePromise: null | Promise<UserResponse> = null;
    responsePromise = api.users.getUser({ userId }).then(res => res.data);

    responsePromise
      .then(response => {
        userRef.value = response as User;
      })
      .catch(err => {
        console.log(err)
      });
  }

  async function upsertUser(user: User): Promise<void> {
    let responsePromise: null | Promise<UserResponse> = null;
    if(user.id) {
      responsePromise = api.users.updateUser(user).then(res => res.data);
    } else {
      responsePromise = api.users.newUser(user).then(res => res.data);
    }

    responsePromise
      .then(response => {
        userRef.value = response as User;
      })
      .catch(err => {
        console.log(err)
      });
  }

  const { active: userDownloading, run: runWrappedFetchGet } = useAsync(fetchUser);
  const { active: userUpserting, run: runWrappedFetchUpsert } = useAsync(upsertUser);
  return {
    fetchUser: runWrappedFetchGet,
    upsertUser: runWrappedFetchUpsert,
    userDownloading,
    userUpserting,
    userRef,
  }
}