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
                For a limited time you can mint our Early Birds EDU Owl NFT and you'll receive access
                to our premium course materials, lessons and more
              </div>
              <div class="nft-copy">
                Take courses on Art, Design, Illustration, Photography, Crafts, Marketing,
                Architecture, Web3 Development, dApp Design, and much more, all for FREE
              </div>
              <div class="nft-call-to-action" @click="mintNft()">
                Mint&nbsp;<img
                  src="../../assets/svgs/owl-blue.svg"
                  class="grasp-logo"
                />&nbsp;<span class="white">Grasp</span>Plus&nbsp;<img
                  src="../../assets/svgs/EduCoin.svg"
                /> 10
              </div>
            </div>
            <div class="modal-nft-preview">
              <div class="nft-image">
                <img :src="imageUrl" />
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
          </div>
        </footer>
      </div>
    </div>
  </transition>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useStore } from "../../store";

const emit = defineEmits(["close"]);
const store = useStore();

const price = ref(10);
const imageUrl = ref(
  "https://cloudflare-ipfs.com/ipfs/QmRWWCdjKyvUX29BrhDffvnu1e1t2Mzj8aa1X24VgLdzwJ"
);

const props = defineProps({
  showModal: {
    type: Boolean,
    default: false,
  },
});

const mintNft = async () => {
  console.log("Mint NFT");
  try {
  } catch {
    console.log("An error has occurred!");
  } finally {
    emit("close");
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
  z-index: 999999;
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

    .modal-content {
      width: 50%;
      height: auto;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      align-content: center;
      padding: 0 30px;

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
          margin: 50px auto 10px;
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
      }

      .nft-header {
        width: 100%;
        color: $black;
        font-size: 14px;
        font-weight: 500;
        text-align: left;
        margin: 0 0 24px;
      }

      .nft-copy {
        width: 100%;
        color: $black;
        font-size: 14px;
        font-weight: 500;
        text-align: left;
        margin: 0 0 30px;
      }

      .nft-call-to-action {
        width: 90%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
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
        padding: 20px 4%;
        cursor: pointer;

        .grasp-logo {
          width: 32px;
          height: 32px;
          object-fit: contain;
          overflow: hidden;
          background: transparent;
          margin: 0 -2px 0 0 ;
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
    }

    .modal-nft-preview {
      width: 50%;
      display: inline;
      float: left;

      max-width: 400px;
      background: $grasp-cyan;
      border: 0.5px solid $grey-50;
      border-radius: 12px;
      box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;
      box-sizing: border-box;
      margin: 0 auto;
      padding: 20px;
      overflow: hidden;

      .nft-image {
        position: relative;
        width: 100%;
        max-width: 400px;
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
</style>
