<template>
  <div class="nft-view-row">
    <div class="column width-100">
      <div class="token-details">
        <h4>Activity</h4>
        <div class="nft-token-detail">
          <span class="grey-label">Feature</span>
          <span class="nft-token-detail-value">...coming soon!</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  defineProps({
    token: {
      type: Object,
      default: null,
      required: false,
    },
  });
</script>
<style lang="scss" scoped>
  @import "@/assets/styles/variables.scss";
  @import "@/assets/styles/mixins.scss";
</style>
