<template>
  <button
    :class="btnSize === 'large' ? `${color}-button` : `${color}-small-button`"
    @click="goToCourse()"
  >
    INFO
  </button>
</template>
<script lang="ts" setup>
import { useRouter } from "vue-router";

export interface Props {
  btnSize?: string;
  color?: string;
  tokenId?: string;
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
    type: String,
    default: "",
    required: false,
  },
});

const router = useRouter();

function goToCourse() {
  router.push({ name: "course", params: { id: props.courseId } });
}
</script>
