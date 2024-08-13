<template>
  <transition name="modal-fade">
    <div v-if="showModal" class="modal-backdrop">
      <div
        class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header class="modal-header" id="modalTitle">
          <button
            type="button"
            class="btn-close"
            @click="emit('close')"
            aria-label="Close modal"
          >
            x
          </button>
        </header>
        <section class="modal-body" id="modalDescription">
          <div class="modal-container">
            <div class="modal-content">
              <h2>
                <img src="../../assets/svgs/owl-blue.svg" />Grasp
                <span class="blue"> Plus</span>
              </h2>
              <div class="nft-slogan">Congratulations, you're an early bird</div>
              <div class="nft-header">
                For a limited time you can mint an Early Bird NFT and
                receive access to all of our premium course materials and so much more.
              </div>
              <div class="nft-copy">
                Take courses on Art, Design, Illustration, Photography, Crafts, Marketing,
                Architecture, Web3 Development, dApp Design, and much more, all for FREE
              </div>
              <div class="nft-outro">
                Be sure to hodl and stay tuned, because the EDU Owls will be hatching soon and are sure to fly high.
              </div>
              <div class="modal-nft-preview show-mobile">
                <div class="nft-image">
                  <img src="../../assets/images/owls/EDU-Owl-21.png" />
                </div>
              </div>
              <div class="nft-call-to-action" @click="mintNFT()">
                <div class="mint-button">
                Mint&nbsp;<img
                  src="../../assets/svgs/owl-blue.svg"
                  class="grasp-logo"
                />&nbsp;<span class="white">Grasp</span> Plus
                </div>
                <div class="mint-price">
                <img
                    src="../../assets/svgs/EduCoin.svg"
                  />
                  10
                </div>
              </div>
            </div>
            <div class="modal-nft-preview hide-mobile">
              <div class="nft-image">
                <img src="../../assets/images/EDUBirds-Blue.png" />
              </div>
            </div>
          </div>
        </section>
        <footer class="modal-footer">
          <div class="footer-container">
            <!-- <button
              type="button"
              class="cancel-button"
              @click="emit('close')"
              aria-label="Close modal"
            >
              Close
            </button> -->
            <!-- <div class="button-container">
              <button type="button" class="btn-blue" @click="mintNft()">Mint {{ price }}</button>
            </div> -->
            <!-- <button
              v-show="!tokenId"
              :class="!approvedMint ? 'btn-blue' : 'cyan-button'"
              @click="ConfirmApprovedMint(true)"
            >
              {{ !approvedMint ? "approve" : "Let's mint" }}
            </button> -->
          </div>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useStore } from "@/store";
import { storeToRefs } from "pinia";
// import { Contracts } from "@/types";
// import Web3 from "web3";
import { ethers } from "ethers";
import contractJson from "@/contracts/GraspNFT.sol/GraspNFT.json";

import owls from "@/data/mint.json";
// console.log("owls", owls.data);

const contractAddress = process.env.VUE_APP_GRASP_NFT_CONTRACT
  ? process.env.VUE_APP_GRASP_NFT_CONTRACT
  : "0x7E97F031Aab9F389BD3C8Cd1ae8eF98C8a15b5f6";

// const stylesContract = ["color: black", "background: cyan"].join(";");
// console.log(
//   "%cGrasp 🦉 NFT Contract Address %s",
//   stylesContract,
//   contractAddress
// );
// const stylesAbi = ["color: black", "background: cyan"].join(";");
// console.log("%c🦉 NFT Mint Contract ABI %s", stylesAbi, contractJson.abi);

const emit = defineEmits(["close"]);

const store = useStore();
const { account, loading } = storeToRefs(store);

// const approvedMint = ref(false);
const tokenId = ref("");
// const price = ref(10);

const imageUrl = ref(
  "https://cloudflare-ipfs.com/ipfs/Qmb3wWuCm3kiRTPTxa11HkhdzBveg7VeDiJ8NeXAgDKKzT"
);

// const metadata = ref(
//   "ipfs://QmR7idkua1kuAffvePPwjkvVRCm1EqJRZQ22N3ymGxi1FC"
// );

const props = defineProps({
  showModal: {
    type: Boolean,
    default: false,
  },
});

// const ConfirmApprovedMint = (value: boolean) => {
//   approvedMint.value = value;
// };


/**
 * Mint NFT
 */
const mintNFT = async () => {

  /* Random selector for the Owl Mint DEV NOTE: Needs more random results or logic */
  const owlsMintData = owls.data as any;
  let keys = Object.keys(owlsMintData);
  let randomProperty = keys[Math.floor(keys.length*Math.random())]
  let owl = owlsMintData[randomProperty]
  console.log(`Owl Metadata Token URI`, owl);

  /**
   * Some very basic form validation
   */
  if (!owl.metadata) {
    console.log(`Please upload NFT metadata to continue!`);
    return;
  }

  /* Show loading */
  store.setLoading(true);
  try {
    const { ethereum } = window;

    if (ethereum) {

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractJson.abi, signer);
      /**
       *  Receive Emitted Event from Contract
       *  @dev See Transfer emitted from our smart contract safeMint function
       */
      // contract.on("Transfer", (from, to, tokenId) => {
      //   console.log("Transfer From :", from);

      //   console.log("Transfer to :", to);

      //   // createdAt.value = moment.unix(timestamp).toString();
      //   // console.log("Created At :", createdAt.value);

      //   tokenId.value = tokenId.toNumber();
      //   console.log("TokenId :", tokenId.value);
      //   store.setLoading(false);
      // });

      // const mintDate = new Date();
      // const mintDateTimestamp = mintDate.getTime();
      // const mintDateString = mintDateTimestamp.toString();
      // console.log("mintDateString", mintDateString);

      console.log("account", account.value);

      let signerAddress = await signer.getAddress();
      console.log("signerAddress", signerAddress);

      /* Mint our Grasp Early Bird NFT */
      let nftTxn = await contract.safeMint(signerAddress, owl.metadata);

      const stylesMining = ["color: black", "background: cyan"].join(";");
      console.log("%cMining the ⛓️ ...please wait! %s", stylesMining, nftTxn.hash);

      // The OpenZeppelin base ERC721 contract emits a Transfer event
      // when a token is issued. tx.wait() will wait until a block containing
      // our transaction has been mined and confirmed. The transaction receipt
      // contains events emitted while processing the transaction.
      const receipt = await nftTxn.wait();

      const stylesReceipt = ["color: black", "background: #00EDBE"].join(";");
      console.log(
        "%c🦉 Another Grasp EDU Owl has taken flight %s ",
        stylesReceipt,
        nftTxn.hash
      );

      /* Check our Transaction results */
      if (receipt.status === 1) {
        /**
         * @dev NOTE: Switch up these links once we go to Production
         * Currently set to use Polygon Mumbai Testnet
         */
        const stylesBlockscout = ["color: white", "background: #141BEB"].join(";");
        console.log(
          `%cNFT minted on Blockscout, see transaction: https://opencampus-codex.blockscout.com/tx/${nftTxn.hash} %s`,
          stylesBlockscout,
          nftTxn.hash
        );
        store.setLoading(false);
      }
      /* Stop loading */
      store.setLoading(false);
      return;
    } else {
      /* Stop loading */
      store.setLoading(false);
      console.log("Ethereum object doesn't exist!");
    }
  } catch (error) {
    /* Stop loading */
    store.setLoading(false);
    console.log("error", error);
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/variables.scss";
@import "../../assets/styles/mixins.scss";

.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999997;
}

.modal {
  width: 80%;
  max-width: 940px;
  height: auto;
  background: $cream;
  padding: 0;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  border-radius: 30px;
  z-index: 999998;

  @include breakpoint($break-sm) {
    width: 100%;
    height: 100%;
    border-radius: 0;
    margin: 0;
    padding: 0;
  }
}

.modal-header {
  width: 100%;
  height: 40px;
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 0;

  .btn-close {
    position: absolute;
    top: 10px;
    right: 15px;
    color: $grasp-blue;
    font-size: 30px;
    font-weight: 400;
    background: transparent;
    border: none;
    cursor: pointer;
    z-index: 999999;
  }
}

.modal-body {
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  align-content: center;
  padding: 0;

  .modal-container {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    align-content: center;
    padding: 10px 50px 0 0;
    z-index: 999;

    @include breakpoint($break-sm) {
      flex-direction: column;
      padding: 0 10px;
    }

    .modal-content {
      width: 90%;
      height: auto;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      align-content: center;
      padding: 0 5%;

      h2 {
        width: 100%;
        color: $grasp-cyan;
        font-size: 38px;
        text-align: center;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-content: flex-end;
        align-items: center;
        margin: 10px 0 20px 10px;

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

      .nft-slogan {
        width: 100%;
        color: $grasp-blue;
        font-size: 18px;
        font-weight: 600;
        text-align: left;
        margin: 0 0 24px;
        @include breakpoint($break-sm) {
          margin: 0 0 20px;
        }
      }

      .nft-header {
        width: 100%;
        color: $black;
        font-size: 14px;
        font-weight: 500;
        text-align: left;
        margin: 0 0 24px;
        @include breakpoint($break-sm) {
          margin: 0 0 20px;
        }
      }

      .nft-copy {
        width: 100%;
        color: $black;
        font-size: 14px;
        font-weight: 500;
        text-align: left;
        margin: 0 0 30px;

        @include breakpoint($break-sm) {
          margin: 0 0 20px;
        }
      }

      .nft-outro {
        width: 100%;
        color: $black;
        font-size: 14px;
        font-weight: 500;
        text-align: left;
        margin: 0 0 30px;

        @include breakpoint($break-sm) {
          margin: 0 0 20px;
        }
      }

      .nft-call-to-action {
        width: 90%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        align-content: center;
        color: $grasp-blue;
        background: $grasp-cyan;
        border: 0.5px solid $grey-50;
        border-radius: 12px;
        box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;
        font-size: 26px;
        font-weight: 600;
        text-align: left;
        margin: 4px 0 16px;
        padding: 20px 5%;
        cursor: pointer;

        @include breakpoint($break-sm) {
          padding: 10px 5%;
          margin: 0 0 20px;
        }

        .mint-button {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
          align-content: center;

          .grasp-logo {
            width: 32px;
            height: 32px;
            object-fit: contain;
            overflow: hidden;
            background: transparent;
            margin: 0 -2px 0 0;
          }

          .white {
            color: $white;
          }

          img,
          svg {
            color: $grasp-blue;
            width: 40px;
            height: 40px;
            object-fit: contain;
            overflow: hidden;
            background: transparent;
          }
        }

        .mint-price {
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
          align-items: center;
          align-content: center;
          img,
          svg {
            color: $grasp-blue;
            width: 40px;
            height: 40px;
            object-fit: contain;
            overflow: hidden;
            background: transparent;
          }
        }
      }
    }
  }

  .modal-nft-preview {
    width: 50%;
    display: inline;
    float: left;
    background: $grasp-cyan;
    border: 0.5px solid $grey-50;
    border-radius: 12px;
    box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;
    box-sizing: border-box;
    margin: 0 auto;
    padding: 20px;
    overflow: hidden;

    @include breakpoint($break-sm) {
      width: 80%;
      max-width: 100%;
      padding: 5%;
      margin: 0 0 20px;
    }

    .nft-image {
      position: relative;
      width: 100%;
      max-width: 420px;
      margin: 0 auto;
      padding: 0;
      overflow: hidden;
      background: transparent;

      img,
      svg {
        width: 100%;
        height: 100%;
        object-fit: contain;
        overflow: hidden;
        background: transparent;
      }
    }
  }
}

.modal-footer {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 20px 40px;

  .footer-container {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    .button-container {
      display: flex;
      flex-direction: row;
      justify-content: center;
    }
  }
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}

.hide-mobile {
  display: inline;
}
.show-mobile {
  display: none !important;
}
/* Mobile Styles */
@include breakpoint($break-sm) {
  .hide-mobile {
    display: none !important;
  }
  .show-mobile {
    display: inline !important;
  }
}
</style>
