import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import HomeView from "./pages/Home.vue";
import { isAuthorized } from "./stores/user";

export type RouteNames = "home" | "dashboard" | "login" | "logout";

export const redirectIfNotLogged = () => {
  if (isAuthorized()) {
    return true;
  } else {
    pushRouter("login");
    return false;
  }
};

export const redirectIfLogged = () => {
  if (isAuthorized()) {
    pushRouter("dashboard");
    return false;
  } else {
    return true;
  }
};

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    beforeEnter: () => redirectIfNotLogged(),
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: HomeView,
    beforeEnter: () => redirectIfNotLogged(),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/pages/Login.vue"),
    beforeEnter: () => redirectIfLogged(),
  },
  {
    path: "/users",
    name: "users",
    component: () => import("@/pages/Users.vue"),
    beforeEnter: () => redirectIfNotLogged(),
  },
];

export const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});

export function pushRouter(
  name: RouteNames,
  params?: RouteParams
): ReturnType<typeof router.push> {
  return router.push({ name, params });
}

export default router;
