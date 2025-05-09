<script lang="ts" setup>
import { Icon } from "@iconify/vue";
import { defineProps } from "vue";
import Card from "@/components/ui/card/Card.vue";
import Button from "@/components/ui/button/Button.vue";
const props = defineProps<{ card: { id: string; title: string } }>();
</script>

<template>
  <Card class="flex-row p-4">
    <input v-model="card.title" class="w-full bg-transparent border-none focus:outline-none" />
    <div class="flex gap-1">
      <Button @click="$emit('duplicate')" variant="outline" size="icon" class="ml-2">
        <Icon icon="lucide:copy" />
      </Button>
      <Button @click="$emit('delete')" variant="outline" size="icon" class="ml-2">
        <Icon icon="lucide:trash" />
      </Button>
    </div>
  </Card>
</template>
