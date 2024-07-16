<template>
  <section id="educhain">
    <h1><img src="../../assets/svgs/owl-white.svg" class="intro-logo" />Grasp Academy</h1>
    <div class="subtitle">
      Grasp Academy allows users to learn, earn, and be rewarded for excellence
    </div>
    <div class="row">
      <div class="educhain-box-one bg-blue">
        <OpenCampusId />
      </div>
      <div class="educhain-box-two bg-cyan">
        <h2>EDU Chain</h2>
        <p>
          EDU Chain is the first L3 Blockchain built for Education. EDU Chain links
          learning experiences with earning opportunities, making every step of the
          journey trackable on the blockchain.
        </p>
      </div>
      <div class="educhain-box-three bg-white">
        <h2><img src="../../assets/images/Open-Campus-Logo.png" class="intro-logo" /></h2>
        <p>
          Open Campus is empowering the next generation of lifelong learners with Proof of
          Education on EduChain. Own your own academic achievements while earning rewards
          with Open Campus ID.
          <br />
          <br />
          Open Campus is a DAO and community-led protocol building a decentralized
          education ecosystem.
        </p>
      </div>
    </div>
  </section>
</template>
<script setup>
import OpenCampusId from "../../assets/svgs/OpenCampusId.vue";
</script>
<style lang="scss" scoped>
@import "../../assets/styles/variables.scss";
@import "../../assets/styles/mixins.scss";

section#educhain {
  background: $grasp-blue;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: space-between;
  padding: 30px 0 0 0;

  h1 {
    color: $white;
    font-size: 48px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-content: center;
    align-items: center;
    text-align: center;
    margin: 40px 0 10px 10px;
    z-index: 999;

    @include breakpoint($break-sm) {
      width: 100%;
      margin: 40px 0 10px 15%;
      justify-content: center;
      text-align: left;
    }

    img,
    svg {
      width: 55px;
      margin-right: 10px;
      @include breakpoint($break-sm) {
        width: 125px;
      }
    }
  }

  .subtitle {
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    justify-content: center;
    padding: 30px 20%;
    color: $white;
    font-size: 22px;
    line-height: 1.7;
    text-align: center;
    margin-bottom: 50px;
    z-index: 999;
    @include breakpoint($break-sm) {
      padding: 30px 5%;
      margin-bottom: 0;
    }
  }

  .row {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-content: center;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 30px;

    @include breakpoint($break-sm) {
      width: 100%;
      flex-direction: column;
      align-content: center;
      justify-content: center;
      margin-bottom: 0;
    }
    .educhain-box-one {
      width: 25%;
      min-height: 320x;
      padding: 3%;
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;

      @include breakpoint($break-sm) {
        width: 94%;
      }

      .svg-container {
        width: 300px;
        margin: 0 auto;
        padding: 0;
      }
    }
    .educhain-box-two {
      width: 26.3333333%;
      min-height: 320x;
      padding: 3%;
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;

      @include breakpoint($break-sm) {
        width: 94%;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    }
    .educhain-box-three {
      width: 28.3333333%;
      min-height: 320x;
      padding: 3%;
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;

      @include breakpoint($break-sm) {
        width: 94%;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
    }

    .bg-blue {
      background-color: $grasp-blue;
      h2 {
        color: $white;
        font-size: 2.25rem;
        margin-bottom: 20px;
        display: flex;
        flex-direction: row;
        align-content: center;
        align-items: center;
        @include breakpoint($break-sm) {
          font-size: 1.85rem;
        }
        .svg-container {
          width: 80px;
          margin-left: 12px;
          @include breakpoint($break-sm) {
            width: 60px;
          }
        }
      }

      a {
        color: $white;
        font-weight: bold;
        text-decoration: none;
      }

      p {
        color: $white;
        line-height: 1.7;
        margin-bottom: 20px;
      }
    }
    .bg-cyan {
      background-color: $grasp-cyan;
      h2 {
        color: $grasp-blue;
        font-size: 2.25rem;
        margin-bottom: 20px;
        @include breakpoint($break-sm) {
          font-size: 1.85rem;
        }
      }

      a {
        color: $grasp-blue;
        font-weight: bold;
        text-decoration: none;
      }

      p {
        color: $grasp-blue;
        line-height: 1.7;
        margin-bottom: 20px;
      }
    }
    .bg-white {
      background-color: $white;
      h2 {
        color: $grasp-blue;
        font-size: 2.25rem;
        margin-bottom: 20px;
        @include breakpoint($break-sm) {
          font-size: 1.85rem;
        }

        img.intro-logo {
          width: 260px;
        }
      }

      a {
        color: $grasp-blue;
        font-weight: bold;
        text-decoration: none;
      }

      p {
        color: $grasp-blue;
        line-height: 1.7;
        margin-bottom: 20px;
      }
    }
  }
}
</style>
