<template>
  <div
    :class="wrapperClass"
    tabindex="0"
    role="checkbox"
    :aria-checked="props.checked"
    @click="handleClick"
  >
    <span :class="iconClass">
      <img v-if="!props.checked" src="../../assets/svgs/CheckBoxOutline.svg" height="22" />
      <img  v-if="props.checked" src="../../assets/svgs/CheckBox.svg" height="22" />
    </span>
    <span :id="`label-${props.id}`" class="label">
      {{ props.label }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const emit = defineEmits(['onChange']);

const props = defineProps({
  value: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  checked: {
    type: Boolean,
    default: false,
  },
  id: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const wrapperClass = computed(() => {
  const { checked } = props;
  return {
    "check-box": true,
    "check-box--checked": checked,
  };
});

const iconClass = computed(() => {
  const { checked } = props;
  return {
    "check-box__icon": true,
    "check-box__icon--checked": checked,
  };
});

const handleClick = () => {
  emit("onChange", props.id);
};
</script>

<style scoped lang="scss">
@import "../../assets/styles/variables.scss";
@import "../../assets/styles/mixins.scss";

.check-box {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid transparent;
  padding: 0.5rem;
  user-select: none;
  cursor: pointer;
}

.label {
  color: $black;
  padding-left: 0.5rem;
}

.check-box__icon {
  display: block;
  height: 24px;
  width: 24px;

  img,
  svg {
    height: 100%;
    width: 100%;
  }
}
</style>
