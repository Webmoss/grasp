<template>
  <div class="intro">
    <h2>
      Where all the great Apes<br class="hide-mobile" />
      come to stay and play
    </h2>
  </div>
  <div class="apecoin-powered">
    <a
      title="Powered by ApeCoin"
      class="sponsor-logo"
      href="https://apecoin.com/"
      target="_blank"
      rel="nofollow"
      ><img
        src="@/assets/images/apecoin/ApeCoinPowered.png"
        alt="Powered by ApeCoin"
        height="46"
    /></a>
  </div>
</template>
<style lang="scss" scoped>
  @import "@/assets/styles/variables.scss";
  @import "@/assets/styles/mixins.scss";

  .intro {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
    align-items: center;
    margin: 0;
    padding: 0;

    h2 {
      color: $white;
      font-size: 20px;
      line-height: 26px;
      font-weight: 400;
      text-align: center;
      padding: 8px 20px 0;
    }
  }
  .apecoin-powered {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 15px 0 10px;
  }
</style>
