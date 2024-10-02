<template>
  <section id="roadmap">
    <h1>
      <img src="../../assets/svgs/owl-blue.svg" class="intro-logo" />Grasp
      <span class="blue"> Roadmap</span>
    </h1>

    <div class="timeline-box">
      <div class="timeline-box-image">
        <img src="../../assets/images/OC-I.png" />
      </div>
      <div class="timeline-box-copy">
        <div class="timeline-current"><span class="black">Q4</span> 2024</div>
        <div class="current-news">
          Grasp Academy was awarded a 3rd place prize in the Open Campus EDU Chain
          hackathon in Sept 2024. Grasp is currently taking part in the Open Campus
          Incubator which is set to finish by December 2024.

          <div class="timeline-phase-title">
            <span class="black"> Planning and Design</span> Month 1-2
          </div>
          <ul class="timeline-phase-list">
            <li>1. Refining project scope and requirements</li>
            <li>2. Build user interface and user journey</li>
            <li>3. $GRASP token economics and governance planning</li>
            <li>4. Finalise integrations with EDU Chain and Open Campus ID</li>
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
          <li>1. Complete Grasp platform MVP</li>
          <li>2. Launch $GRASP governance token on EDU Chain mainnet</li>
          <li>3. Launch first onboarding and educational courses</li>
          <li>4. Comprehensive testing (functionality, security, and performance)</li>
          <li>5. Grasp Investor funding rounds</li>
        </ul>
      </div>
      <div class="timeline-boxes">
        <div class="timeline-box-title"><span class="black">Q2</span> 2025</div>
        <div class="line-divider"></div>
        <ul class="timeline-phase-list">
          <li>1. Launch Grasp Hootie Hoo NFT</li>
          <li>2. Integrate AI features &amp; functionality</li>
          <li>3. Integrate EduFi features for grants and loans</li>
          <li>4. Integrate SocialFi features for content sharing</li>
          <li>5. Beta testing and user feedback survey campaign</li>
        </ul>
      </div>
      <div class="timeline-boxes">
        <div class="timeline-box-title"><span class="black">Q3</span> 2025</div>
        <div class="line-divider"></div>
        <ul class="timeline-phase-list">
          <li>1. Marketing and Social media campaigns</li>
          <li>2. Onboard content creators and web3 communities</li>
          <li>3. Enhance features and functionalities based on feedback</li>
          <li>4. Monitor platform performance and user feedback</li>
          <li>5. Scale the platform to accommodate more users</li>
        </ul>
      </div>
      <div class="timeline-boxes">
        <div class="timeline-box-title"><span class="black">Q4</span> 2025</div>
        <div class="line-divider"></div>
        <ul class="timeline-phase-list">
          <li>1. Launch Content Creator campaigns</li>
          <li>2. Launch Grasp Academy Merch lines</li>
          <li>3. Create fund for our first IRL Grasp Campus for learners</li>
          <li>4. Review of our KPIs and targets</li>
          <li>5. Reward our Hooti Hoo family</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
@import "../../assets/styles/variables.scss";
@import "../../assets/styles/mixins.scss";

section#roadmap {
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
  padding: 100px 60px;

  @include breakpoint($break-sm) {
    width: 100%;
    padding: 20px;
  }

  h1 {
    width: 100%;
    color: $white;
    font-size: 38px;
    text-align: center;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: flex-end;
    align-items: center;
    margin: 0 0 50px 10px;

    @include breakpoint($break-sm) {
      width: 100%;
      align-content: center;
      margin: 20px auto 10px;
    }

    span.blue {
      color: $grasp-blue;
    }

    img {
      width: 40px;
      margin-right: 8px;
      @include breakpoint($break-sm) {
        width: 35px;
      }
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
    margin: 0 auto 50px;

    @include breakpoint($break-sm) {
      width: 90%;
      font-size: 16px;
      padding: 10px 5% 30px;
      margin: 0 0 20px 0;
    }

    .timeline-box-image {
      width: 35%;
      display: flex;
      flex-direction: row;
      align-content: center;
      align-items: center;
      justify-content: center;

      img {
        display: block;
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
      }
    }

    .timeline-box-copy {
      width: 60%;
      display: flex;
      flex-direction: column;
      align-content: flex-start;
      align-items: flex-start;
      justify-content: flex-start;
      padding: 3% 5%;

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

        @include breakpoint($break-sm) {
          width: 90%;
          padding: 20px 5%;
          margin-bottom: 0;
        }
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
        margin: 10px auto;

        .black {
          color: $grasp-blue;
          font-size: 26px;
          font-weight: 600;
          line-height: 26px;
          margin-right: 4px;
        }
      }
    }
  }

  .timeline {
    display: flex;
    flex-direction: row;
    align-content: flex-start;
    align-items: flex-start;
    justify-content: space-between;

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
        font-size: 16px;
        padding: 10px 5% 30px;
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
      margin: 0;
      padding: 0;
      color: $black;
      font-size: 14px;
      font-weight: 500;
      text-decoration: none;
      transition: all 0.5s linear;
      cursor: pointer;

      // &:hover {
      //   color: $grasp-cyan;
      // }
    }
  }

  .line-divider {
    width: 98%;
    margin: 0 auto 5px;
    border-bottom: 1px solid $grey-30;
  }
}
</style>
