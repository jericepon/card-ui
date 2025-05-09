<script lang="ts" setup>
import BoardCard from "@/components/BoardCard.vue";
import Button from "@/components/ui/button/Button.vue";
import Card from "@/components/ui/card/Card.vue";
import CardFooter from "@/components/ui/card/CardFooter.vue";
import CardHeader from "@/components/ui/card/CardHeader.vue";
import CardTitle from "@/components/ui/card/CardTitle.vue";
import { defineEmits, defineProps } from "vue";
import type { CardData } from "@/types";
import { Icon } from "@iconify/vue";
// @ts-ignore
import draggable from "vuedraggable";

const props = defineProps<{
  column: { id: string; title: string; cards: { id: string; title: string }[] };
}>();

const emit = defineEmits(["update-columns"]);

function addCard() {
  props.column.cards.push({ id: crypto.randomUUID(), title: "New Task" });
}

function deleteCard(cardId: string) {
  const index = props.column.cards.findIndex((c) => c.id === cardId);
  if (index !== -1) {
    props.column.cards.splice(index, 1);
  }
}

function duplicateCard(card: CardData) {
  const index = props.column.cards.findIndex((c) => c.id === card.id);
  if (index !== -1) {
    const newCard = { ...props.column.cards[index], id: crypto.randomUUID() };
    props.column.cards.splice(index + 1, 0, { ...newCard, title: "Copy of " + newCard.title });
  }
}

function onDragEnd() {
  emit("update-columns");
}
</script>

<template>
  <Card class="flex-1 py-4 gap-3">
    <CardHeader class="px-3">
      <CardTitle>
        <input
          v-model="column.title"
          class="text-foreground text-lg font-semibold w-full focus:outline-none focus:border-b hover:bg-foreground/10 rounded-lg px-3"
        />
      </CardTitle>
    </CardHeader>

    <draggable
      v-model="column.cards"
      group="tasks"
      itemKey="id"
      @end="onDragEnd"
      class="flex flex-1 flex-col gap-2 px-6 vuedraggable"
    >
      <template #item="{ element }">
        <BoardCard
          :key="element.id"
          :card="element"
          @delete="() => deleteCard(element.id)"
          @duplicate="() => duplicateCard(element)"
        />
      </template>
    </draggable>

    <CardFooter v-if="column.id === 'open'">
      <Button @click="addCard" variant="outline" size="sm">
        <Icon icon="lucide:plus" /> Add item
      </Button>
    </CardFooter>
  </Card>
</template>
