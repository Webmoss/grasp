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

<script setup>
import { ref } from "vue";
import { nanoid } from "nanoid";
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

<style lang="scss">
.checkbox-group-wrapper {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  align-content: center;
  padding: 0;
}
</style>
