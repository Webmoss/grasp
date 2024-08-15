<script setup>
import { nanoid } from "nanoid";
import { ref } from "vue";
import CheckBoxInput from "./CheckBoxInput.vue";

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits({
  onChange: {
    type: "change",
    default: () => {},
  },
});

const itemsRef = ref(
  props.items.map((item) => {
    return {
      ...item,
      id: nanoid(),
    };
  })
);

const handleOnChange = (id) => {
  /* This is actually a multple select checkbox so reseting it here */
  const resetValue = itemsRef.value.map((item) => ({
    ...item,
    checked: false,
  }));
  itemsRef.value = resetValue;
  /* Remove above if you want that func again */

  const newValue = itemsRef.value.map((item) => ({
    ...item,
    checked: item.id === id ? !item.checked : item.checked,
  }));
  itemsRef.value = newValue;
  emit("onChange", newValue);
};
</script>

<template>
  <div class="checkbox-group-wrapper">
    <CheckBoxInput
      v-for="item in itemsRef"
      :id="item.id"
      :key="item.id"
      :label="item.label"
      :value="item.value"
      :checked="item.checked"
      @on-change="handleOnChange"
    />
  </div>
</template>

<style lang="scss">
.checkbox-group-wrapper {
  padding: 0.5rem;
}
</style>
