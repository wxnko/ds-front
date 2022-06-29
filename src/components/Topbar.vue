<template>
  <div class="top-bar">
    <div class="top-bar-title">
      {{ title }}
    </div>
    <div v-if="hasButtonSlot()" class="buttons">
      <slot name="buttons"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toRefs, useSlots } from "vue";
export interface Props {
  title: string;
}

const props = defineProps<Props>();
const { title } = toRefs(props);

const slots = useSlots();
function hasButtonSlot() {
  return !!slots.buttons;
}
</script>
<style scope>
.top-bar {
  width: 100%;
  background-color: var(--color-background-top);
  color: var(--color-text-top);
  padding: 10px 20px;
  display: flex;
  align-items: center;
}
.top-bar-title {
  font-size: 1.2em;
}
.buttons {
  margin-left: auto;
}
</style>
