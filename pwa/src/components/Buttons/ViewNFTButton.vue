<template>
  <button class="view-button" @click="goToNFT()">View</button>
</template>
<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";

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
  tokenId: {
    type: String,
    default: null,
    required: false,
  },
});

const route = useRoute();
const router = useRouter();

function goToNFT() {
  router.push({
    name: "nft",
    params: { collection: route.params.name as string, id: props.tokenId },
  });
}
</script>

<style lang="scss">
@import "../../assets/styles/variables.scss";
@import "../../assets/styles/mixins.scss";

.view-button {
  width: auto;
  height: 30px;
  display: flex;
  flex-direction: row nowrap;
  justify-content: flex-start;
  align-content: center;
  align-items: center;
  color: $white;
  background-color: $grasp-blue;
  font-size: 15px;
  font-weight: bold;
  border: 0.5px solid $grasp-blue;
  border-radius: 30px;
  padding-left: 14px;
  padding-right: 14px;
  transition: all 0.5s linear;
  cursor: pointer;

  &:hover,
  &:active,
  &:focus,
  &:focus-visible {
    color: $grasp-cyan;
    border: 0.5px solid $white;
  }
  img,
  svg {
    color: #ffffff;
    width: 22px;
    margin-left: -6px;
    margin-right: 4px;
  }
}
</style>
