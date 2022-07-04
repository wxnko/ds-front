<template>
  <div v-if="usersDownloading">Users downloading</div>
  <div v-else-if="users.length === 0">No users found</div>
  <template v-else>
    <table class="table table-xs-responsive">
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Username</th>
          <th scope="col">First name</th>
          <th scope="col">Last name</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id" :user="user">
          <th scope="row">{{ user.id }}</th>
          <td>{{ user.username }}</td>
          <td>{{ user.first_name }}</td>
          <td>{{ user.last_name }}</td>
          <td>
            <router-link :to="{ name: 'usersEdit', params: { id: user.id }}">
              <i class="material-icons">edit</i>
            </router-link>
            <i class="material-icons">delete</i>
          </td>
        </tr>
      </tbody>
    </table>
    <AppPagination :count="usersTotal" :page="page" :limit="limit" @page-change="changePage" />
  </template>
</template>

<script setup lang="ts">
import AppPagination from "@/components/AppPagination.vue";
import { useUsers } from "@/composable/useUsers";
const limit = 25;
const { fetchUsers, usersDownloading, users, usersTotal, changePage, page } =
  useUsers();

await fetchUsers(limit);
</script>
