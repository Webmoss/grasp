<template>
  <section id="tokenomics">
    <div class="left">
      <div class="tokenomics-logo">
        <GraspLogo label="Tokenomics" color="cyan" />
      </div>
      <div class="token-supply">
        <span class="white">Total Supply</span>&nbsp;420,000,000,000&nbsp;
        <span class="white">$GRASP</span>
      </div>
      <div class="tokenomics-row">
        <div class="tokenomics-box">
          <h1>About GRASP</h1>
          <div class="tokenomics-description">
            Grasp Token is designed to empower the Web3 education ecosystem, leveraging
            Open Campus and the EDU Chain to foster decentralized learning environments.
            It incentivizes educators, learners, and content creators, while promoting
            interoperability and engagement across educational platforms, using the EDU
            token.
          </div>
        </div>
        <div class="tokenomics-box">
          <h1>GRASP Distribution</h1>
          <div class="tokenomics-description">
            Grasp Token's distribution is designed to support sustainable growth, reward
            contributors, and engage the educational community. This model promotes
            long-term success by emphasizing both the community and the development of the
            Web3 education ecosystem.
          </div>
        </div>
      </div>
      <div class="tokenomics-chart-row">
        <div class="tokenomics-chart">
          <Doughnut ref="tokenomicsChart" :data="data" :options="tokenomicsData" />
        </div>
      </div>
      <div class="tokenomics-logo">
        <GraspLogo label="Utility" color="cyan" />
      </div>
      <div class="tokenomics-row">
        <div class="tokenomics-box">
          <h3>Primary Payment Currency</h3>
          <div class="tokenomics-description">
            Grasp Token will act as a currency within the Open Campus network, enabling
            transactions for educational content, courses, certifications, and more across
            platforms built on the EDU Chain.
          </div>
        </div>
        <div class="tokenomics-box">
          <h3>Cross-Chain Fees</h3>
          <div class="tokenomics-description">
            EDU will serve as the "gas fee" for cross-chain transactions, facilitating
            seamless movement of credentials, content, and value between interoperable
            educational platforms within the Open Campus ecosystem.
          </div>
        </div>
      </div>
      <div class="tokenomics-row">
        <div class="tokenomics-box">
          <h3>Proof-of-Loyalty</h3>
          <div class="tokenomics-description">
            Grasp Token will reward educators and learners based on the number of tokens
            held and how long they hold them. Long-term holders will gain access to
            premium content, governance roles, and exclusive educational opportunities.
          </div>
        </div>
        <div class="tokenomics-box">
          <h3>Growth-Oriented Services</h3>
          <div class="tokenomics-description">
            Token holders will be able to monetize educational achievements, content, and
            personal reputation, contributing to the overall growth of the Web3 education
            economy.
          </div>
        </div>
      </div>
      <div class="tokenomics-row">
        <div class="tokenomics-box">
          <h1>GRASP Community</h1>
          <div class="tokenomics-description">
            Over 50% of the Token Supply Directed Towards the Community**: - A significant
            portion of Grasp supply, including network incentives and community sales,
            will focus on stimulating community growth, driving engagement, and rewarding
            contributions within the Open Campus ecosystem.<br />Airdrops, staking
            programs, and referral incentives will play a key role in promoting active
            participation.
          </div>
        </div>
        <div class="tokenomics-box">
          <h1>GRASP Future</h1>
          <div class="tokenomics-description">
            Grasp Token is designed to empower a decentralized Web3 education network on
            EDU Chain, leveraging the power of the Open Campus ecosystem. By promoting
            interoperability, rewarding active engagement, and fostering a sustainable
            educational economy, Grasp will reshape how knowledge is shared, valued, and
            rewarded in the Web3 education space.
          </div>
        </div>
      </div>
      <div class="tokenomics-chart-row">
        <div class="tokenomics-box">
          <div class="slogan">Learn, earn and be rewarded for academic excellence</div>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="grasp-allocation">
        <div class="allocation">
          <h3>
            Network Incentives
            <span class="allocation-amount">35% (147,000,000,000 GRASP)</span>
          </h3>
        </div>
        <div class="line-divider"></div>
        <div class="purpose">
          <h3>Purpose:</h3>
          To incentivize growth within the Open Campus and Grasp educational ecosystem by
          rewarding students, educators, and content creators. These rewards will be
          distributed on EDU Chain through airdrops, staking, and engagement campaigns and
          initiatives to ensure active participation.
        </div>
        <div class="details">
          <h3>Details:</h3>
          Grasp token will be released over time to onboard new users, drive educational
          content creation and activity.
        </div>
      </div>
      <div class="grasp-allocation">
        <div class="allocation">
          <h3>
            Ecosystem &amp; Treasury
            <span class="allocation-amount">18% (75,600,000,000 GRASP)</span>
          </h3>
        </div>
        <div class="line-divider"></div>
        <div class="purpose">
          <h3>Purpose:</h3>
          To maintain a strong reserve to support educational tools, curriculum
          development, and partnerships aimed at building on EDU Chain and the Grasp
          Academy platform.
        </div>
        <div class="details">
          <h3>Purpose:</h3>
          Funds will also support infrastructure development, research, and partnerships
          to enhance the utility of Grasp.
        </div>
      </div>
      <div class="grasp-allocation">
        <div class="allocation">
          <h3>
            Community Sale
            <span class="allocation-amount">2% (8,400,000,000 GRASP)</span>
          </h3>
        </div>
        <div class="line-divider"></div>
        <div class="purpose">
          <h3>Purpose:</h3>
          Reserved for the initial community sale, allowing early supporters and backers
          exclusive access to Grasp Tokens. This aligns with the long-term mission of the
          platform.
        </div>
        <div class="details">
          <h3>Purpose:</h3>
          A Community sale will offer early adopters priority access to the $GRASP token,
          with no additional rounds thereafter.
        </div>
      </div>
      <div class="grasp-allocation">
        <div class="allocation">
          <h3>
            Strategic Partners
            <span class="allocation-amount">10% (42,000,000,000 GRASP)</span>
          </h3>
        </div>
        <div class="line-divider"></div>
        <div class="purpose">
          <h3>Purpose:</h3>
          Allocated to create strategic partnerships with educational institutions,
          content platforms, and key players building on EDU Chain and within the Open
          Campus ecosystem.
        </div>
        <div class="details">
          <h3>Purpose:</h3>
          These partners will help integrate Grasp into their platforms, fostering
          widespread use in educational sectors.
        </div>
      </div>
      <div class="grasp-allocation">
        <div class="allocation">
          <h3>
            Liquidity Reserve
            <span class="allocation-amount">10% (42,000,000,000 GRASP)</span>
          </h3>
        </div>
        <div class="line-divider"></div>
        <div class="purpose">
          <h3>Purpose:</h3>
          To provide liquidity across decentralized and centralized exchanges (DEXs and
          CEXs), ensuring stable trading and easy access for users.
        </div>
        <div class="details">
          <h3>Purpose:</h3>
          Liquidity pools will be established on the EDU Chain to support smooth
          transactions across educational platforms.
        </div>
      </div>
      <div class="grasp-allocation">
        <div class="allocation">
          <h3>
            Operational Expenses
            <span class="allocation-amount">6% (25,200,000,000 GRASP)</span>
          </h3>
        </div>
        <div class="line-divider"></div>
        <div class="purpose">
          <h3>Purpose:</h3>
          To cover the operational costs of the Grasp network, including maintenance,
          marketing, and legal expenses, ensuring the platform runs smoothly.
        </div>
        <div class="details">
          <h3>Purpose:</h3>
          These funds will also be used to promote the token and onboard new users,
          educators, and education providers.
        </div>
      </div>
      <div class="grasp-allocation">
        <div class="allocation">
          <h3>
            Team Allocation
            <span class="allocation-amount">10% (42,000,000,000 GRASP)</span>
          </h3>
        </div>
        <div class="line-divider"></div>
        <div class="purpose">
          <h3>Purpose:</h3>
          To incentivize the development team and ensure their long-term commitment to the
          project’s success. Tokens will be vested over a four-year period.
        </div>
        <div class="details">
          <h3>Purpose:</h3>
          These funds will also support new hires and bonuses tied to platform milestones.
        </div>
      </div>
      <div class="grasp-allocation">
        <div class="allocation">
          <h3>
            Contributors &amp; Advisors
            <span class="allocation-amount">9% (37,800,000,000 GRASP)</span>
          </h3>
        </div>
        <div class="line-divider"></div>
        <div class="purpose">
          <h3>Purpose:</h3>
          To reward key contributors, advisors, and content creators who help shape and
          guide the Grasp ecosystem.
        </div>
        <div class="details">
          <h3>Purpose:</h3>
          Vested over 1-2 years to ensure ongoing support from educational experts and
          Web3 leaders.
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { ref } from "vue";
import { Doughnut } from "vue-chartjs";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import GraspLogo from "../Logo/GraspLogo.vue";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const tokenomicsChart = ref(null);

const data = {
  labels: [
    "Network Incentives",
    "Ecosystem & Treasury",
    "Community Sale",
    "Strategic Partners",
    "Liquidity Reserve",
    "Operational Expenses",
    "Team Allocation",
    "Contributors & Advisors",
  ],
  datasets: [
    {
      label: "Allocations",
      data: [35, 18, 2, 10, 10, 6, 10, 9],
      backgroundColor: [
        "rgba(20, 27, 235, 1)",
        "rgba(0, 237, 190, 1)",
        "rgba(252, 102, 45, 1)",
        "rgba(244, 244, 244, 1)",
        "rgba(251, 245, 0, 1)",
        "rgba(82, 82, 82, 1)",
        "rgba(141, 141, 141, 1)",
        "rgba(198, 198, 198, 1)",
      ],
      hoverOffset: 4,
    },
  ],
};

const tokenomicsData = {
  type: "pie",
  data: data,
};
</script>
<style lang="scss" scoped>
@import "../../assets/styles/variables.scss";
@import "../../assets/styles/mixins.scss";

section#tokenomics {
  width: 97%;
  background-image: url("../../assets/images/hexBG.png");
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: top left;
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: flex-start;
  justify-content: space-between;
  padding: 80px 0;

  @include breakpoint($break-sm) {
    background-image: url("../../assets/images/hexBG.png"),
      url("../../assets/images/EduChain.png");
    background-position: top left, top left;
    background-repeat: repeat, no-repeat;
    background-size: auto, 100%;
    padding: 150px 0 30px;
  }

  .left {
    width: 70%;
    justify-content: center;
    align-content: center;
    align-items: flex-start;

    @include breakpoint($break-sm) {
      width: 100%;
      align-items: center;
      padding-top: 20px;
    }

    .tokenomics-logo {
      width: 300px;
      justify-content: center;
      align-content: center;
      align-items: center;
      margin-left: 38%;
      margin-bottom: 30px;
    }

    .token-supply {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-content: center;
      align-items: center;
      justify-content: center;
      color: $grasp-cyan;
      font-size: 20px;
      font-weight: 600;
      line-height: 1.5;
      text-align: center;
      margin: 0 0 20px 40px;

      @include breakpoint($break-sm) {
        width: 90%;
        font-size: 18px;
        padding: 20px 5%;
        margin: 0;
      }

      .white {
        color: $white;
      }
    }

    .tokenomics-row {
      display: flex;
      flex-direction: row;
      align-content: center;
      align-items: flex-start;
      justify-content: space-around;
    }

    .tokenomics-chart-row {
      display: flex;
      flex-direction: row;
      align-content: center;
      align-items: center;
      justify-content: center;
      margin: 40px auto 60px;

      .tokenomics-chart {
        width: 60%;
        margin: 0 auto;
      }
    }

    .tokenomics-box {
      width: 40%;
      display: flex;
      flex-direction: column;
      align-content: flex-start;
      align-items: flex-start;
      justify-content: flex-start;

      .tokenomics-description {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-content: center;
        align-items: center;
        justify-content: center;
        color: $white;
        font-size: 15px;
        line-height: 1.7;
        text-align: left;
        margin: 0 0 30px 0;

        @include breakpoint($break-sm) {
          width: 90%;
          font-size: 15px;
          padding: 20px 5%;
          margin-bottom: 0;
        }
      }
      .slogan {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-content: center;
        align-items: center;
        justify-content: center;
        color: $grasp-cyan;
        font-size: 20px;
        font-weight: 600;
        line-height: 1.5;
        text-align: center;
        margin: 0 0 20px 20px;

        @include breakpoint($break-sm) {
          width: 90%;
          font-size: 18px;
          padding: 20px 5%;
          margin: 0;
        }
      }
    }
  }

  .right {
    width: 30%;
    justify-content: center;
    align-content: center;
    align-items: center;

    .grasp-allocation {
      width: 95%;
      display: flex;
      flex-direction: column;
      align-content: flex-start;
      align-items: flex-start;
      justify-content: flex-start;
      background: $white;
      border: 0.5px solid $grey-50;
      border-radius: 20px;
      box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;
      padding: 20px;
      margin: 0 5% 10px 0;
      overflow: hidden;

      .allocation {
        width: 100%;
        color: $black;
        font-size: 13px;
        font-weight: 600;
        line-height: 1.7;
        text-align: left;
        margin: 0;

        @include breakpoint($break-sm) {
          font-size: 12px;
        }

        h3 {
          width: 100%;
          display: flex;
          flex-direction: row;
          align-content: flex-start;
          align-items: flex-start;
          justify-content: space-between;
          background: $white;
          margin-block-start: 0;
          margin-block-end: 0;
          margin-inline-start: 0px;
          margin-inline-end: 0px;

          .allocation-amount {
            color: $black;
            font-size: 13px;
            font-weight: 600;
            line-height: 1.7;
            text-align: right;
            margin: 0;

            @include breakpoint($break-sm) {
              font-size: 12px;
            }
          }
        }
      }
      .purpose {
        width: 100%;
        color: $black;
        font-size: 13px;
        font-weight: 600;
        line-height: 1.7;
        text-align: left;
        margin: 8px 0 0 0;

        @include breakpoint($break-sm) {
          font-size: 12px;
          margin: 4px 0 0 0;
        }

        h3 {
          width: 100%;
          margin-block-start: 0;
          margin-block-end: 0;
          margin-inline-start: 0px;
          margin-inline-end: 0px;
        }
      }
      .details {
        width: 100%;
        color: $black;
        font-size: 13px;
        font-weight: 500;
        line-height: 1.7;
        text-align: left;
        margin: 8px 0 0 0;

        @include breakpoint($break-sm) {
          font-size: 12px;
          margin: 4px 0 0 0;
        }

        h3 {
          width: 100%;
          margin-block-start: 0;
          margin-block-end: 0;
          margin-inline-start: 0px;
          margin-inline-end: 0px;
        }
      }
    }
  }
}
</style>
