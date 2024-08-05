<template>
  <button
    :class="btnSize === 'large' ? `${color}-button` : `${color}-small-button`"
    @click="goToCreator()"
  >
    View
  </button>
</template>
<script lang="ts" setup>
import { useRouter } from "vue-router";

export interface Props {
  btnSize?: string;
  color?: string;
  creatorId?: string;
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
  creatorId: {
    type: String,
    default: null,
    required: false,
  },
});

const router = useRouter();

function goToCreator() {
  router.push({ name: "creator", params: { id: props.creatorId } });
}
</script>
