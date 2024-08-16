<template>
  <div v-if="chainId === 1" class="nft-chain-icon">
    <img src="@/assets/images/logos/eth-diamond-black.png" />
  </div>
  <div v-if="chainId === 5" class="nft-chain-icon">
    <img src="@/assets/images/logos/eth-glyph-colored.png" />
  </div>
</template>
<script lang="ts" setup>
export interface Props {
  chainId?: number;
}
withDefaults(defineProps<Props>(), {
  chainId: 1,
});
</script>
