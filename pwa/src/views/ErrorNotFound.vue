<template>
  <section id="error-page">
    <div class="main">
      <section id="page">
        <div class="page-row">
          <h1 class="page-title">Error Not Found!</h1>
          <div class="button-column"></div>
        </div>

        <h2>Page Not Found</h2>
        <div class="page-description">
          The page you are looking forward could not be found, please return to the home
          page and try again!
        </div>
        <div class="line-divider"></div>
      </section>
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
@import "../assets/styles/variables.scss";
@import "../assets/styles/mixins.scss";

section#error-page {
  position: relative;
  height: 100%;
  overflow: scroll;
  background: $white;

  #error-page {
    padding-bottom: 30px;
  }

  .main {
    max-width: $max-width;
    width: 100%;
    height: calc(100vh - 40px);
    margin: 0 auto;
    padding: 0 0 30px 0;

    .page-row {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-content: center;
      align-items: flex-end;
      margin: 30px 0 8px 0;

      h1.page-title {
        width: 100%;
        font-family: "Poppins", sans-serif;
        color: $grasp-blue;
        font-size: 38px;
        font-weight: 600;
        line-height: 40px;
        text-align: left;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-content: flex-end;
        align-items: flex-end;
        margin: 0;

        img {
          width: 40px;
          margin-right: 8px;
          @include breakpoint($break-sm) {
            width: 40px;
          }
        }
      }
    }

    h2 {
      width: 100%;
      font-family: "Poppins", sans-serif;
      color: $grasp-blue;
      font-size: 30px;
      font-weight: 600;
      line-height: 32px;
      text-align: left;
      margin-block-start: 0px;
      margin-block-end: 0px;
      margin: 20px 0 16px 0;
    }

    .page-description {
      width: 100%;
      color: $black;
      font-size: 15px;
      font-weight: normal;
      text-align: left;
      margin: 0;
    }
  }
}

@media (min-width: 1024px) {
  .page {
    min-height: $page-height;
    display: flex;
    align-items: center;
  }
}
</style>
