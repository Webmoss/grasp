<template>
  <section id="content">
    <div class="main">
      <section id="page">
        <div class="left">
          <SidebarIntro />
          <section id="footer">
            <SidebarCollections />
            <SidebarSponsors />
            <SidebarFooter />
          </section>
        </div>
        <div class="right">
          <NFTView />
        </div>
        <section id="mobile-footer">
          <SidebarCollections />
          <SidebarSponsors />
          <SidebarFooter />
        </section>
      </section>
    </div>
  </section>
</template>
<script lang="ts" setup>
  import SidebarIntro from "@/components/Sidebar/SidebarIntro.vue";
  import SidebarCollections from "@/components/Sidebar/SidebarCollections.vue";
  import SidebarSponsors from "@/components/Sidebar/SidebarSponsors.vue";
  import SidebarFooter from "@/components/Sidebar/SidebarFooter.vue";
  import NFTView from "@/components/NFT/NFTView.vue";
</script>
