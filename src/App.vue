<script lang="ts" setup>
import { reactive } from "vue";
import Column from "./components/Column.vue";
import DarkMode from "./components/DarkMode.vue";

const columns = reactive([
  { id: "open", title: "Open", cards: [] },
  { id: "inProgress", title: "In Progress", cards: [] },
  { id: "done", title: "Done", cards: [] },
]);
</script>

<template>
  <div class="p-6 min-h-screen">
    <header class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">Drag & Drop Board</h1>
      <DarkMode />
    </header>
    <div class="flex gap-4">
      <Column
        v-for="column in columns"
        :key="column.id"
        :column="column"
        @update-columns="columns = $event"
      />
    </div>
  </div>
</template>

<style scoped>
/* Add any global styles here */
</style>
