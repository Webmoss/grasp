<template>
  <button
    :class="btnSize === 'large' ? `${color}-button` : `${color}-small-button`"
    @click="goToCourse()"
  >
    View
  </button>
</template>
<script lang="ts" setup>
import { useRouter } from "vue-router";

export interface Props {
  btnSize?: string;
  color?: string;
  courseId?: string;
}

const props = defineProps({
  btnSize: {
    type: String,
    default: "large",
    required: false,
  },
  color: {
    type: String,
    default: "blue",
    required: false,
  },
  courseId: {
    type: Number,
    default: null,
    required: false,
  },
});

const router = useRouter();

function goToCourse() {
  router.push({ name: "course", params: { id: props.courseId } });
}
</script>
