<template>
  <div class="video-track">
    <input
      type="range"
      min="0"
      max="100"
      step="1"
      :value="percentage.toFixed(1)"
      @input="onInput"
    />
  </div>
</template>
<script setup lang="ts">
defineProps({
  percentage: {
    type: Number,
    required: true,
    default: 0,
  },
});

const emit = defineEmits(["seek"]);

const onInput = (event: Event) => {
  emit("seek", (event.target as HTMLInputElement).value);
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/variables.scss";
@import "../../assets/styles/mixins.scss";

input[type="range"] {
  position: relative;
  top: -1px;
  overflow: hidden;
  width: 245px;
  appearance: none;
  -webkit-appearance: none;
  background-color: #ccc;
  border-radius: 5px;
}

input[type="range"]:focus {
  outline: none;
}

input[type="range"]::-webkit-slider-runnable-track {
  height: 8px;
  appearance: none;
  -webkit-appearance: none;
  color: $grasp-blue;
  margin-top: -1px;
}

input[type="range"]::-webkit-slider-thumb {
  width: 8px;
  -webkit-appearance: none;
  height: 8px;
  cursor: ew-resize;
  background: $grasp-blue;
  box-shadow: -245px 0 0 245px $grasp-blue;
}
</style>
