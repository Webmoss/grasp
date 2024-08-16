<template>
  <div class="marketplace-filter">
    <div class="marketplace-filter-price">
      <h5>Price Range</h5>
      <div class="marketplace-filter-row">
        <div class="marketplace-filter-input">
          <input
            v-model="filter.price_min_input"
            name="priceMinInput"
            type="text"
            placeholder="Min"
            @input="priceMinHandle($event)"
          />
          <div class="chain-icon">
            <img src="@/assets/svgs/EduCoin.svg" />
          </div>
        </div>
        <div class="marketplace-filter-input">
          <input
            v-model="filter.price_max_input"
            name="priceMaxInput"
            type="text"
            placeholder="Max"
            @input="priceMaxHandle($event)"
          />
          <div class="chain-icon">
            <img src="@/assets/svgs/EduCoin.svg" />
          </div>
        </div>
      </div>
    </div>
    <div class="marketplace-filter-rarity">
      <h5>Rarity Rank</h5>
      <div class="marketplace-filter-row">
        <div class="marketplace-filter-input">
          <input
            v-model="filter.rarity_min_input"
            name="rarityMinInput"
            type="text"
            placeholder="Min"
            @input="rarityMinHandle($event)"
          />
          <div class="chain-icon">
            <img src="@/assets/svgs/EduCoin.svg" />
          </div>
        </div>
        <div class="marketplace-filter-input">
          <input
            v-model="filter.rarity_max_input"
            name="rarityMaxInput"
            type="text"
            placeholder="Max"
            @input="rarityMaxHandle($event)"
          />
          <div class="chain-icon">
            <img src="@/assets/svgs/EduCoin.svg" />
          </div>
        </div>
      </div>
    </div>
    <div class="marketplace-filter-traits">
      <template v-for="(attribute, j) in attributes" :key="j">
        <button
          :active="attribute.isDropped ? 'active' : ''"
          :class="
            attribute.isDropped
              ? 'marketplace-filter-traits-show activeBtn'
              : 'marketplace-filter-traits-show'
          "
          @click="$emit('updateAttribute', attribute.key)"
        >
          {{ attribute.key }} ({{ attribute.attributeCount }})
          <div v-if="attribute.isDropped" class="dropdown-icon">
            <img src="@/assets/svgs/ExpandCircleUp.svg" />
          </div>
          <div v-else class="dropdown-icon">
            <img src="@/assets/svgs/ExpandCircleDown.svg" />
          </div>
        </button>
        <transition name="fade">
          <ul v-if="attribute.isDropped" class="marketplace-filter-traits-list">
            <li v-for="(trait, i) in attribute.values" :key="i">
              <div class="marketplace-trait-input">
                <div class="marketplace-trait-label">
                  <label :for="`traitType-${i}`">{{ trait.value }}</label>
                  <div class="marketplace-trait-stats">
                    <div class="marketplace-trait-floor">
                      Floor {{ trait.floorAskPrice?.amount.decimal }}
                      <div class="currency-icon">
                        <img src="@/assets/svgs/EduCoin.svg" />
                      </div>
                    </div>
                    <div class="marketplace-trait-percentage">
                      {{ trait.count / 100 }} %
                    </div>
                  </div>
                </div>
                <input
                  :id="`traitType-${i}`"
                  :name="`traitType-${i}`"
                  type="checkbox"
                  @input="traitSelectHandle(trait.value)"
                />
              </div>
            </li>
          </ul>
        </transition>
      </template>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useStore } from "@/store";
import { storeToRefs } from "pinia";
import { attributeSidebarObject } from "src/models/attributeSidebar";

const store = useStore();
const { filter } = storeToRefs(store);

defineEmits(["updateAttribute"]);

export interface Props {
  attributes?: Array<attributeSidebarObject>;
}

withDefaults(defineProps<Props>(), {
  attributes: () => [],
});

/**
 * Update our Filter Minimum Price in Store
 */
function priceMinHandle(event: Event) {
  store.setPriceMinInput((event.target as HTMLInputElement).value);
}

/**
 * Update our Filter Maximium Price in Store
 */
function priceMaxHandle(event: Event) {
  store.setPriceMaxInput((event.target as HTMLInputElement).value);
}

/**
 * Update our Filter Minimum Rarity in Store
 */
function rarityMinHandle(event: Event) {
  store.setRarityMinInput((event.target as HTMLInputElement).value);
}

/**
 * Update our Filter Maximium Rarity in Store
 */
function rarityMaxHandle(event: Event) {
  store.setRarityMaxInput((event.target as HTMLInputElement).value);
}

/**
 * Update our Filter Trait Array in Store
 */
function traitSelectHandle(trait: string) {
  store.setSearchTraits(trait);
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";
@import "@/assets/styles/mixins.scss";

.marketplace-filter {
  width: 260px;
  list-style: none;
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0;
  margin-inline-end: 0;
  padding-inline-start: 0;
  background: $black;
  border: 1px solid rgb(69, 73, 77, 0.4);
  border-radius: 12px;
  padding: 8px 8px 0;
  margin: 0 auto 20px;

  h5 {
    width: 99%;
    margin-block-start: 0px;
    margin-block-end: 0px;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
    padding-left: 10px;
    font-size: 18px;
    margin-bottom: 10px;
  }

  .marketplace-filter-price,
  .marketplace-filter-rarity,
  .marketplace-filter-traits {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: center;
    margin-top: 15px;
  }
  .marketplace-filter-price {
    margin-top: 5px;
  }

  .marketplace-filter-row {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-content: center;
    align-items: center;
  }

  .marketplace-filter-input {
    width: 48%;
    height: 35px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
    align-items: center;
    background: $grey-20;
    border: 1px solid transparent;
    border-radius: 12px;
    padding: 0;
    transition: border-color 0.6s linear;
    cursor: pointer;

    &:hover,
    &:focus,
    &:focus-visible,
    &:active {
      border-color: rgb(69, 73, 77);
    }

    input {
      width: 88px;
      display: flex;
      flex-direction: row;
      align-content: center;
      justify-content: center;
      align-items: center;
      color: $black;
      font-size: 16px;
      font-weight: 600;
      background: inherit;
      margin: 0 4px;
      text-decoration: none;
      border: none;
      border-radius: 0;
      padding: 7px 0 8px;
      cursor: pointer;

      &::placeholder {
        color: $grey-90;
      }

      &:hover,
      &:focus,
      &:focus-visible,
      &:active {
        outline: 0;
      }
    }

    .chain-icon {
      width: 18px;
      display: flex;
      flex-direction: row;
      align-content: center;
      justify-content: center;
      align-items: center;
      img,
      svg {
        background: transparent;
        object-fit: contain;
        overflow: hidden;
      }
    }
  }

  .marketplace-filter-traits-show {
    width: 100%;
    height: 40px;
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: space-between;
    align-items: center;
    font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    color: #ffffff;
    font-size: 18px;
    font-weight: 600;
    background: rgb(17, 16, 16);
    margin: 0 0 6px 0;
    text-decoration: none;
    border: 1px solid transparent;
    border-radius: 0;
    padding: 8px 5px;
    transition: background-color 0.6s linear;
    text-align: left;
    cursor: pointer;

    &:hover {
      background: $grey-90;
    }

    .dropdown-icon {
      display: flex;
      flex-direction: row;
      align-content: center;
      justify-content: center;
      align-items: center;
      img,
      svg {
        width: 26px;
        background: transparent;
        object-fit: contain;
        overflow: hidden;
      }
    }
  }
  button.activeBtn {
    background: $grey-90;
  }
  .marketplace-filter-traits-list {
    width: 100%;
    list-style: none;
    margin-block-start: 0;
    margin-block-end: 0;
    margin-inline-start: 0;
    margin-inline-end: 0;
    padding-inline-start: 0;
    background: $black;
    border-radius: 12px;
    padding: 0;
    margin: 0 auto 5px;
    transform-origin: top;
    transition: transform 0.6s linear;

    li {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-content: center;
      align-items: center;
      border: 1px solid transparent;
      background-color: $black;
      border-radius: 12px;
      margin-bottom: 8px;
      padding: 8px;
      transition: border-color 0.6s linear;

      &:hover,
      &:focus,
      &:focus-visible {
        border-color: rgb(69, 73, 77);
      }

      .marketplace-trait-input {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-content: center;
        align-items: center;

        .marketplace-trait-label {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-content: center;
          align-items: center;

          label {
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-content: center;
            align-items: center;
            cursor: pointer;
          }

          .marketplace-trait-stats {
            width: 100%;
            display: flex;
            flex-direction: row nowrap;
            justify-content: space-between;
            align-content: center;
            align-items: center;
            .marketplace-trait-percentage {
              font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
                Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
                sans-serif;
              color: $white;
              font-size: 12px;
              font-weight: 400;
              margin-right: 10px;
              text-decoration: none;
              margin-right: 20px;
            }
            .marketplace-trait-floor {
              display: flex;
              flex-direction: row;
              justify-content: center;
              align-content: center;
              align-items: center;

              font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
                Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
                sans-serif;
              color: $white;
              font-size: 12px;
              font-weight: 400;
              margin-right: 4px;
              text-decoration: none;

              .currency-icon {
                width: 12px;
                display: flex;
                flex-direction: row;
                align-content: center;
                justify-content: center;
                align-items: center;
                margin-left: 2px;
                img,
                svg {
                  background: transparent;
                  object-fit: contain;
                  overflow: hidden;
                }
              }
            }
          }
        }
        input {
          margin: 0 4px 0 8px;
          cursor: pointer;
        }
      }
    }
  }
  // .slide-enter,
  // .slide-leave-to {
  //   transform: scaleY(0);
  // }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }
}
</style>
