<template>
  <section id="campus">
    <h2>
      <img src="../../assets/images/Open-Campus-Logo.png" class="intro-logo" />
    </h2>
    <div class="subtitle">
      Open Campus fosters an open ecosystem that unites educators, learners, publishers,
      and co-publishers worldwide. At the heart of the Protocol is a content tokenization
      engine that brings educational content to the blockchain
    </div>
    <div class="row">
      <div class="campus-box bg-cyan">
        <h3>dApps</h3>
        <p>
          Learners interact directly with educational Dapps supported by Open Campus ID.
          Offering personalized learning experiences, credential portability, and earning
          opportunities.
        </p>
      </div>
      <div class="campus-box">
        <h3>Tools</h3>
        <p>
          Tools that developers and educational institutions can use to build and
          distribute educational products and services to reach the Open Campus learner
          base.
        </p>
      </div>
      <div class="campus-box bg-yellow">
        <h3>Liquidity</h3>
        <p>
          LPs provide the liquidity necessary for the ecosystem's development and scaling;
          in return, they can earn transaction fees or other financial incentives.
        </p>
      </div>
    </div>
    <div class="row">
      <div class="campus-box bg-orange">
        <h3>Nodes</h3>
        <p>
          Principal Node operators help to secure the chain by detecting fraudulent
          transactions and are rewarded with tokens and a share in sequencer revenues.
        </p>
      </div>
      <div class="campus-box bg-cyan">
        <h3>Powered by $EDU</h3>
        <p>
          $EDU token is the native gas token for EDU Chain and the governance token for
          the Open Campus DAO. It powers the entire Open Campus ecosystem.
        </p>
      </div>
      <div class="campus-box">
        <h3>The Education Blockchain</h3>
        <p>
          EDU Chain is the pioneering Layer 3 blockchain tailored for education.
          <br />
          <a href="https://www.opencampus.xyz/" title="Open Campus" class="link-button"
            >Read More</a
          >
        </p>
      </div>
    </div>
  </section>
</template>
<script setup></script>
<style lang="scss" scoped>
@import "../../assets/styles/variables.scss";
@import "../../assets/styles/mixins.scss";

section#campus {
  width: 100%;
  background: $white;
  background-image: url("../../assets/images/Open-Campus-BG.png");
  background-repeat: no-repeat;
  background-position: bottom;
  background-size: contain;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: center;
  padding-top: 60px;
  padding-bottom: 80px;

  h2 {
    width: 100%;
    color: $grasp-blue;
    font-size: 40px;
    text-align: center;
    z-index: 999;
    @include breakpoint($break-ssm) {
      font-size: 2.55rem;
      margin-bottom: 0;
    }

    img.intro-logo {
      width: 260px;
    }
  }

  .subtitle {
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    justify-content: center;
    padding: 10px 19%;
    color: $grasp-blue;
    font-size: 22px;
    font-weight: 600;
    line-height: 1.3;
    text-align: center;
    margin-bottom: 80px;
    z-index: 999;
    @include breakpoint($break-ssm) {
      padding: 20px 1%;
    }
  }

  .row {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-content: center;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;

    @include breakpoint($break-ssm) {
      width: 100%;
      flex-direction: column;
      align-content: center;
      justify-content: center;
      margin-bottom: 0;
    }
    .campus-box {
      width: 90%;
      min-height: 270px;
      margin: 0 3%;
      padding: 2%;
      border-radius: 20px;

      display: flex;
      flex-direction: column;
      align-content: center;
      align-items: center;
      justify-content: center;
      background-color: $grasp-blue;

      @include breakpoint($break-ssm) {
        width: 92%;
        padding: 3%;
        margin: 1%;
      }

      h3 {
        color: $white;
        font-size: 1.9rem;
        margin-bottom: 5px;
        display: flex;
        flex-direction: row;
        align-content: center;
        align-items: center;
        text-align: center;
        .svg-container {
          width: 80px;
          margin-left: 12px;
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
        text-align: center;
      }
    }

    .campus-box.bg-cyan {
      background-color: $grasp-cyan;

      h3 {
        color: $grasp-blue;
      }

      a {
        color: $grasp-blue;
      }

      p {
        color: $grasp-blue;
      }
    }

    .campus-box.bg-orange {
      background-color: $grasp-orange;

      h3 {
        color: $white;
      }

      a {
        color: $white;
      }

      p {
        color: $white;
      }
    }

    .campus-box.bg-yellow {
      background-color: $grasp-yellow;

      h3 {
        color: $grasp-blue;
      }

      a {
        color: $grasp-blue;
      }

      p {
        color: $grasp-blue;
      }
    }
  }
}
</style>
