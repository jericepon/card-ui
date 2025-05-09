<script lang="ts" setup>
import BoardCard from "@/components/BoardCard.vue";
import Button from "@/components/ui/button/Button.vue";
import Card from "@/components/ui/card/Card.vue";
import { defineEmits, defineProps } from "vue";
import CardHeader from "@/components/ui/card/CardHeader.vue";
import CardTitle from "@/components/ui/card/CardTitle.vue";
import CardFooter from "@/components/ui/card/CardFooter.vue";
// @ts-ignore
import draggable from "vuedraggable";
import { Icon } from "@iconify/vue";

const props = defineProps<{
  column: { id: string; title: string; cards: { id: string; title: string }[] };
}>();
const emit = defineEmits(["update-columns"]);

const addCard = () => {
  props.column.cards.push({ id: crypto.randomUUID(), title: "New Task" });
};

const deleteCard = (index: number) => {
  props.column.cards.splice(index, 1);
};

const onDragEnd = () => {
  emit("update-columns");
};
</script>

<template>
  <Card class="flex-1 py-4">
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
      itemkey="id"
      @end="onDragEnd"
      class="flex flex-1 flex-col gap-2 px-6 vuedraggable"
    >
      <template #item="{ element }">
        <transition-group name="list" tag="div">
          <BoardCard :card="element" @delete="() => deleteCard(element.id)" />
        </transition-group>
      </template>
    </draggable>

    <CardFooter v-if="column.id === 'open'">
      <Button @click="addCard" variant="outline" size="sm">
        <Icon icon="lucide:plus" /> Add item
      </Button>
    </CardFooter>
  </Card>
</template>
