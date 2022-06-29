<template>
  <div
    class="sidenav-menuitem"
    @click="
      openSubmenu();
      $emit('click');
    "
  >
    <router-link :to="path"
      ><i class="material-icons">{{ icon }}</i> {{ name }}
    </router-link>
  </div>
  <template v-if="!!items">
    <div ref="itemsRef" class="sidenav-submenuitems">
      <div
        v-for="item in items"
        v-bind:key="item.id"
        class="sidenav-submenuitem"
      >
        <router-link :to="item.path" :key="item.id">{{
          item.name
        }}</router-link>
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
import { ref } from "vue";
const itemsRef = ref<HTMLDivElement | null>(null);
function openSubmenu() {
  if (!itemsRef.value) return;
  const classList = itemsRef.value.classList;
  const children = itemsRef.value.children;
  if (classList.contains("active")) {
    classList.remove("active");
    itemsRef.value.style.height = "";
  } else {
    let height = 0;
    for (const child of children) {
      height += child.clientHeight;
    }
    itemsRef.value.style.height = height + "px";
    classList.add("active");
  }
}
</script>
<script lang="ts">
export default {
  props: {
    path: String,
    icon: String,
    name: String,
    items: Array,
  },
  emits: ["click"],
};
</script>

<style scoped>
.sidenav-menuitem {
  font-size: 1.2em;
  transition: all 250ms;
}
.sidenav-menuitem + .sidenav-menuitem,
.sidenav-submenuitems + .sidenav-menuitem {
  margin-top: 10px;
}
.sidenav-menuitem .material-icons {
  margin-right: 5px;
}
.sidenav-menuitem:hover {
  margin-left: 5px;
}
.sidenav-submenuitems {
  margin-left: 34px;
  height: 0px;
  overflow: hidden;
  transition: all 250ms;
}
.sidenav-submenuitems.active {
}
.sidenav-submenuitem {
  padding: 3px 0;
}
.material-icons {
  vertical-align: sub;
}
</style>
