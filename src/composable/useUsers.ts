import { ref, watch } from "vue";
import type { MultipleUserResponse, User, UpdateUser, AddUser } from '@/services/api/users';
import { api } from "@/services";
import useAsync from "@/utils/use-async";

export function useUsers() {
  const users = ref<User[]>([]);
  const usersTotal = ref(0);
  const page = ref(1);

  async function fetchUsers(): Promise<void> {
    users.value = [];
    let responsePromise: null | Promise<MultipleUserResponse> = null;
    responsePromise = api.users.getUsers({ pageSize: 25, page: page.value }).then(res => res.data);

    responsePromise
      .then(response => {
        users.value = response.users;
        usersTotal.value = response.total;
      })
      .catch(err => {
        console.log(err)
      });
  }

  const changePage = (value: number): void => {
    page.value = value;
  }

  const { active: usersDownloading, run: runWrappedFetch } = useAsync(fetchUsers);

  watch(page, runWrappedFetch);
  return {
    fetchUsers: runWrappedFetch,
    usersDownloading,
    users,
    usersTotal,
    changePage,
    page
  }
}