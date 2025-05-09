<script lang="ts" setup>
import Button from "@/components/ui/button/Button.vue";
import Card from "@/components/ui/card/Card.vue";
import type { CardData } from "@/types";
import { Icon } from "@iconify/vue";
import { defineProps } from "vue";

defineProps<{ card: { id: string; title: string } }>();

const emit = defineEmits<{
  delete: [cardId: string];
  duplicate: [card: CardData];
}>();
</script>

<template>
  <Card class="flex-row p-4">
    <input v-model="card.title" class="w-full bg-transparent border-none focus:outline-none" />
    <div class="flex gap-1">
      <Button @click="emit('duplicate', card)" variant="outline" size="icon" class="ml-2">
        <Icon icon="lucide:copy" />
      </Button>
      <Button @click="emit('delete', card.id)" variant="outline" size="icon" class="ml-2">
        <Icon icon="lucide:trash" />
      </Button>
    </div>
  </Card>
</template>
