<template>
  <section id="roadmap">
    <GraspLogo label="Roadmap" color="blue" />
    <div class="timeline-box">
      <div class="timeline-box-image">
        <img src="../../assets/images/OC-I.png" />
      </div>
      <div class="timeline-box-copy">
        <div class="timeline-current"><span class="black">Q4</span> 2024</div>
        <div class="current-news">
          Grasp Academy was awarded a 3rd place prize in the Open Campus EDU Chain
          hackathon in Sept 2024.<br />Grasp is currently taking part in the Open Campus
          Incubator which is set to finish by December 2024.

          <div class="timeline-phase-title">
            <span class="black"> Open Campus Incubator</span> Month 1-2
          </div>
          <ul class="timeline-phase-list">
            <li>1. Refining project scope and requirements</li>
            <li>2. Build user interface and user journey</li>
            <li>3. $GRASP tokenomics and governance planning</li>
            <li>4. Finalise integrations with EDU Chain and OCID</li>
            <li>5. Onboard Advisors, Partners and Investors</li>
            <li>6. Launch Early Bird Founders NFT</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="timeline">
      <div class="timeline-boxes">
        <div class="timeline-box-title"><span class="black">Q1</span> 2025</div>
        <div class="line-divider"></div>
        <ul class="timeline-phase-list">
          <li>1. Launch Grasp platform MVP</li>
          <li>2. Launch $GRASP token on EDU Chain mainnet</li>
          <li>3. Launch first onboarding and educational courses</li>
          <li>4. Comprehensive testing (functionality, security and performance)</li>
          <li>5. Grasp Investor funding rounds</li>
        </ul>
      </div>
      <div class="timeline-boxes">
        <div class="timeline-box-title"><span class="black">Q2</span> 2025</div>
        <div class="line-divider"></div>
        <ul class="timeline-phase-list">
          <li>1. Launch Grasp Hootie Hoo NFT</li>
          <li>2. Integrate AI features &amp; functionality</li>
          <li>3. Integrate EduFi features,eg. grants and loans</li>
          <li>4. Integrate SocialFi features for content sharing</li>
          <li>5. Beta testing and user feedback campaigns</li>
        </ul>
      </div>
      <div class="timeline-boxes">
        <div class="timeline-box-title"><span class="black">Q3</span> 2025</div>
        <div class="line-divider"></div>
        <ul class="timeline-phase-list">
          <li>1. Marketing &amp; Social media campaigns</li>
          <li>2. Onboard Content Creators and web3 communities</li>
          <li>3. Enhance features and functionalities based on feedback</li>
          <li>4. Monitor platform performance and user feedback</li>
          <li>5. Scale the platform to accommodate more users</li>
        </ul>
      </div>
      <div class="timeline-boxes">
        <div class="timeline-box-title"><span class="black">Q4</span> 2025</div>
        <div class="line-divider"></div>
        <ul class="timeline-phase-list">
          <li>1. Launch Content Creator program</li>
          <li>2. Launch Grasp Merch lines</li>
          <li>3. Create fund for first IRL Grasp Campus for learners</li>
          <li>4. Review of our KPIs and targets</li>
          <li>5. Reward our Hootie Hoo's' 🦉 and Capy's 🍊</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import GraspLogo from "../Logo/GraspLogo.vue";
</script>

<style lang="scss" scoped>
@import "../../assets/styles/variables.scss";
@import "../../assets/styles/mixins.scss";

section#roadmap {
  width: 100%;
  background: $grasp-cyan;
  background-image: url("../../assets/images/hexBG.png");
  background-repeat: no-repeat;
  background-position: top left;
  background-size: 100%;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: center;
  padding: 60px 0 80px;

  @include breakpoint($break-sm) {
    background-size: cover;
    padding: 0;
  }

  h1 {
    width: 100%;
    color: $white;
    font-size: 40px;
    text-align: center;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: flex-end;
    align-items: center;
    margin: 0 0 50px 0;

    @include breakpoint($break-sm) {
      width: 100%;
      align-content: center;
      margin: 20px auto;
    }

    span.blue {
      color: $grasp-blue;
    }

    img.intro-logo {
      width: 40px;
      margin-right: 8px;
    }
  }

  .timeline-box {
    width: 90%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-content: flex-start;
    align-items: flex-start;
    background: $white;
    border: 0.5px solid $grey-50;
    border-radius: 8px;
    box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;
    color: $black;
    font-size: 14px;
    font-weight: 500;
    line-height: 1.7;
    text-align: left;
    padding: 0;
    margin: 50px auto;
    overflow: hidden;

    @include breakpoint($break-sm) {
      width: 90%;
      flex-direction: column;
      margin: 0 5% 20px;
    }

    .timeline-box-image {
      width: 355px;
      height: 355px;
      display: flex;
      flex-direction: row;
      align-content: center;
      align-items: center;
      justify-content: center;

      @include breakpoint($break-sm) {
        width: 100%;
        margin: 0;
      }

      img {
        display: block;
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
      }
    }

    .timeline-box-copy {
      width: calc(100% - 355px);
      display: flex;
      flex-direction: column;
      align-content: flex-start;
      align-items: flex-start;
      justify-content: flex-start;
      padding: 3% 5% 2%;

      @include breakpoint($break-sm) {
        width: 90%;
        margin: 0;
      }

      .timeline-current {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-content: flex-start;
        align-items: flex-end;
        justify-content: flex-start;
        color: $black;
        font-size: 14px;
        font-weight: 600;
        line-height: 20px;
        margin: 0 auto 10px;

        .black {
          color: $grasp-blue;
          font-size: 26px;
          font-weight: 600;
          line-height: 26px;
          margin-right: 4px;
        }
      }

      .current-news {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-content: center;
        align-items: flex-start;
        justify-content: flex-start;
        color: $black;
        font-size: 14px;
        font-weight: 500;
        line-height: 1.7;
        text-align: left;
        margin: 0 auto;
      }

      .timeline-phase-title {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-content: flex-start;
        align-items: flex-end;
        justify-content: flex-start;
        color: $black;
        font-size: 14px;
        font-weight: 600;
        line-height: 20px;
        margin: 20px auto 10px;

        .black {
          color: $grasp-blue;
          font-size: 22px;
          font-weight: 600;
          line-height: 26px;
          margin-right: 8px;

          @include breakpoint($break-sm) {
            font-size: 20px;
          }
        }
      }
    }
  }

  .timeline {
    width: 90%;
    display: flex;
    flex-direction: row;
    align-content: flex-start;
    align-items: flex-start;
    justify-content: space-between;

    @include breakpoint($break-sm) {
      width: 90%;
      flex-direction: column;
      padding: 0 5%;
      margin: 0;
    }

    .timeline-boxes {
      width: 21%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-content: flex-start;
      align-items: flex-start;
      background: $white;
      border: 0.5px solid $grey-50;
      border-radius: 8px;
      box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;
      color: $black;
      font-size: 14px;
      font-weight: 500;
      line-height: 1.5;
      text-align: left;
      padding: 20px;
      margin: 0 0 20px 0;

      @include breakpoint($break-sm) {
        width: 90%;
        padding: 20px 5%;
        margin: 0 0 20px 0;
      }
    }

    .timeline-box-title {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-content: flex-start;
      align-items: flex-end;
      color: $black;
      font-size: 16px;
      font-weight: 500;
      line-height: 20px;
      margin: 0 auto 4px;
      .black {
        color: $grasp-blue;
        font-size: 26px;
        font-weight: 600;
        line-height: 26px;
        margin-right: 4px;
      }
    }
  }

  .timeline-phase-list {
    width: 100%;
    list-style: none;
    text-decoration: none;
    margin-block-start: 0;
    margin-block-end: 0;
    margin-inline-start: 0;
    margin-inline-end: 0;
    padding-inline-start: 0;
    padding-inline-end: 0;

    li {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      align-content: center;
      color: $black;
      font-size: 14px;
      font-weight: 500;
      text-decoration: none;
      margin: 0;
      padding: 0;
    }
  }

  .line-divider {
    width: 98%;
    margin: 0 auto 5px;
    border-bottom: 1px solid $grey-30;
  }
}
</style>
