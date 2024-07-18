<template>
  <section id="solutions">
    <div class="left">
      <h2>Learn &amp; Earn</h2>
      <h3>Grasp puts learners and education first</h3>
      <p>
        Grasp supports diverse learning styles and provides education resources tailored
        to different individual learning needs.
      </p>
      <div class="solutions-graphic">
        <img src="../../assets/svgs/LearnEarn.svg" />
      </div>
      <p>
        With a strong focus on providing a high-quality educational experience and
        prioritising the needs of learners and educators to ensure effective knowledge
        transfer.
      </p>
    </div>
    <div class="right">
      <div class="solutions-box bg-blue">
        <h3>LMS</h3>
        <p>
          Grasp is the perfect Learning Management System (LMS) for onboarding users,
          students, staff, and web3 community members. Create structured educational
          tracks for various purposes, including students, companies and even
          DAOs.
        </p>
      </div>
      <div class="solutions-box bg-cyan">
        <h3>EduFi Integration</h3>
        <p>
          Grasp allows you to offer incentives for completing courses or general student
          lessons, or even onboarding into companies and web3 communities. Grasp will
          provide seamless integration with EduFi for financial support and open up
          various student financing options through onchain grants and loans.
        </p>
      </div>
      <div class="solutions-box bg-cyan">
        <h3>Reward Learning</h3>
        <p>
          Grasp Academy encourages excellence and engagement through tangible rewards.
          Users and learners can earn additional NFTs and $EDU tokens upon course
          completion with verifiable proof of completion.
        </p>
      </div>
      <div class="solutions-box bg-blue">
        <h3>Platform for Creators</h3>
        <p>
          Grasp supports a variety of content formats, including video tutorials,
          articles, and interactive courses and enables creators to share their work,
          videos, and educational content. Creators can earn directly from their
          contributions using the Grasp web3 platform.
        </p>
      </div>
    </div>
  </section>
</template>
<script setup></script>
<style lang="scss" scoped>
@import "../../assets/styles/variables.scss";
@import "../../assets/styles/mixins.scss";

section#solutions {
  color: $grasp-blue;
  background: $white;
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: flex-start;
  justify-content: space-between;
  padding: 0;

  @include breakpoint($break-ssm) {
    flex-direction: column;
    justify-content: center;
  }

  .left {
    width: 26%;
    display: flex;
    align-content: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    padding: 2%;
    overflow: hidden;

    @include breakpoint($break-ssm) {
      width: 94%;
      padding: 3%;
      align-content: center;
      justify-content: center;
    }

    h2 {
      color: $grasp-blue;
      font-size: 42px;
      margin-block-start: 0.5em;
      margin-block-end: 0.15em;
      z-index: 999;
    }
    h3 {
      color: $grasp-blue;
      font-size: 16px;
      margin-bottom: 0;
      z-index: 999;
    }
    a {
      color: $grasp-blue;
      font-weight: bold;
      text-decoration: none;
      z-index: 999;
    }

    p {
      color: $grasp-blue;
      line-height: 1.7;
      margin-bottom: 20px;
      z-index: 999;
    }

    .solutions-graphic {
      width: 100%;
      padding: 0;
      z-index: 998;
      overflow: hidden;

      img,
      svg {
        width: 240px;
        object-fit: contain;
        overflow: hidden;
        margin: 0 0 0 20px;
        @include breakpoint($break-ssm) {
          width: 220px;
        }
      }
    }
  }

  .right {
    width: 70%;
    float: left;
    padding: 0;
    @include breakpoint($break-ssm) {
      width: 100%;
    }

    .solutions-box {
      float: left;
      width: 44%;
      min-height: 340px;
      padding: 2% 3% 0;
      @include breakpoint($break-ssm) {
        width: 94%;
      }
    }

    .bg-blue {
      background-color: $grasp-blue;
      h3 {
        color: $white;
        font-size: 2.25rem;
        margin-bottom: 20px;
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
      h3 {
        color: $grasp-blue;
        font-size: 2.25rem;
        margin-bottom: 20px;
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
      h3 {
        color: $grasp-blue;
        font-size: 2.25rem;
        margin-bottom: 20px;
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
