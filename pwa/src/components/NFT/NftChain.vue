<template>
  <div v-if="chain === 'ethereum'" class="nft-chain-icon">
    <img src="@/assets/images/logos/eth-diamond-white.svg" />
  </div>
  <div v-if="chain === 'goerli'" class="nft-chain-icon">
    <img src="@/assets/images/logos/eth-glyph-colored.png" />
  </div>
</template>
<script lang="ts" setup>
  export interface Props {
    chain?: string;
  }
  withDefaults(defineProps<Props>(), {
    chain: "ethereum",
  });
</script>
