<template>
  <div class="tab-box">
    <div class="box-header">{{ label }} Lessons</div>
    <div class="box">
      <div class="box-value">
        <span class="box-label">From Date</span>
        {{ fromDate ? fromDate : "" }}
      </div>
      <div class="box-value">
        <span class="box-label">To Date</span>
        {{ toDate ? toDate : "" }}
      </div>
    </div>
    <AdminSearch />
    <div class="tab-box">
      <div class="list-item">
        <div class="list-item-box">
          <div class="list-item-header-role">Role</div>
        </div>
        <div class="list-item-box">
          <div class="list-item-header-name">Full Name</div>
        </div>
        <div class="list-item-box">
          <div class="list-item-header-organisation">Organisation</div>
        </div>
        <div class="list-item-box">
          <div class="list-item-header-courses">Courses</div>
        </div>
        <div class="list-item-box">
          <div class="list-item-header-lessons">Lessons</div>
        </div>
        <div class="list-item-box">
          <div class="list-item-header-nfts">NFTs</div>
        </div>
        <div class="list-item-box">
          <div class="list-item-header-categories">Category</div>
        </div>
        <div class="list-item-box">
          <div class="list-item-header-sales">Sales</div>
        </div>
      </div>
      <template v-for="(user, index) in members" :key="index">
        <div class="list-item">
          <div class="list-item-box">
            <div class="list-item-role">
              <span class="list-item-index">{{ index + 1 }}.</span>
              {{ user.role ? prettyName(user.role) : "-" }}
            </div>
          </div>
          <div class="list-item-box">
            <div class="list-item-name">
              {{ user.name ? user.name : "-" }}
            </div>
          </div>
          <div class="list-item-box">
            <div class="list-item-organisation">
              {{ user.orgName ? user.orgName : "-" }}
            </div>
          </div>
          <div class="list-item-box">
            <div class="list-item-courses">
              {{ courses ? courses : "-" }}
            </div>
          </div>
          <div class="list-item-box">
            <div class="list-item-lessons">
              {{ lessons ? lessons : "-" }}
            </div>
          </div>
          <div class="list-item-box">
            <div class="list-item-nfts">
              {{ nfts ? nfts : "-" }}
            </div>
          </div>
          <div class="list-item-sales">
            <div v-if="user && user.type" class="list-item-category">
              <span class="category-indicator">{{ user.type ? user.type : "" }}</span>
            </div>
          </div>
          <div class="list-item-sales">
            <div class="sales">
              <span class="list-item-index">Total </span
              ><span class="sales-amount">
                <img src="../../assets/svgs/EduCoin.svg" />
                {{ sales ? sales : "0.00" }}</span
              >
            </div>
          </div>
        </div>
      </template>
    </div>
    <AdminPagination :pagination="pagination" :total="total" :last-page="lastPage" />
  </div>
</template>
<script lang="ts" setup>
import { ref, computed, onMounted, watch } from "vue";
import { useStore } from "@/store";
import { storeToRefs } from "pinia";
import { userObject } from "src/models/user";
import { prettyName } from "@/services/prettyName";
import AdminSearch from "@/components/Admin/AdminSearch.vue";
import AdminPagination from "@/components/Admin/AdminPagination.vue";

/* All Posts stored in a JSON */
import testUsers from "../../data/users.json";

const store = useStore();
const { members, pagination, filter } = storeToRefs(store);

const props = defineProps({
  label: {
    type: String,
    default: "User",
  },
  orgId: {
    type: String,
    default: "",
  },
  userId: {
    type: String,
    default: "",
  },
});

const lastPage = ref(1);
const lastSearchTerm = ref("");
const fromDate = ref("");
const toDate = ref("");

const courses = ref(0);
const lessons = ref(0);
const nfts = ref(0);
const sales = ref(0);

const newSearchTerm = computed(() => {
  return filter.value.search_term;
});

const shouldGetData = computed(() => {
  return newSearchTerm.value !== lastSearchTerm.value;
});

const total = computed(() => {
  return members.value ? members.value.length : 0;
});

const fetchMembers = () => {
  console.log("filter.value.search_term", filter.value.search_term);
  let filteredMembers = testUsers.data;

  if (props.orgId) {
    filteredMembers = filteredMembers.filter((user) => user.orgId === props.orgId);
  }

  if (props.userId) {
    filteredMembers = filteredMembers.filter((user) => user.id === props.userId);
  }

  if (filter.value.search_term !== "") {
    filteredMembers = filteredMembers.filter((user) =>
      user.name.toLowerCase().includes(filter.value.search_term.toLowerCase())
    );
  }
  store.setMembers((filteredMembers as unknown) as userObject[]);
};

watch(shouldGetData, async (newValue) => {
  if (newValue) {
    await fetchMembers();
  }
  lastSearchTerm.value = newSearchTerm.value as string;
});

onMounted(() => {
  fetchMembers();
});
</script>

<style lang="scss">
@import "../../assets/styles/variables.scss";
@import "../../assets/styles/mixins.scss";

.box-header {
  font-family: "Poppins", sans-serif;
  color: $grey-100;
  width: 99%;
  font-size: 18px;
  font-weight: 600;
  text-align: left;
  margin: 0 0 4px 8px;
}
.box {
  width: 99%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: flex-start;
  align-items: flex-start;
  background: $white;
  border: 0.5px solid $grey-50;
  border-radius: 8px;
  box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;
  margin: 0 0 24px 0;
  padding: 12px 0 4px 12px;
}

.box-value {
  width: 100%;
  font-family: inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  color: $grey-90;
  font-size: 14px;
  font-weight: 500;
  margin: 0 0 8px 0;

  .box-label {
    width: 140px;
    display: inline-block;
    color: $grey-90;
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
    text-transform: capitalize;
  }
}

.list-item {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  background: $white;
  border: 0.5px solid $grey-50;
  border-radius: 8px;
  box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;
  margin: 0 0 8px 0;
  padding: 8px 0;
  transition: all 0.5s linear;

  .list-item-box {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: flex-start;
    align-items: flex-start;
    padding: 0;

    .list-item-header-role {
      min-width: 50px;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-content: center;
      align-items: center;
      font-family: "Poppins", sans-serif;
      color: $grey-100;
      font-size: 13px;
      font-weight: 600;
      text-align: left;
      margin: 0;
      padding: 0 0 0 24px;
    }
    .list-item-role {
      min-width: 80px;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-content: center;
      align-items: center;
      font-family: "Poppins", sans-serif;
      color: $grey-90;
      font-size: 12px;
      font-weight: 600;
      text-align: left;
      margin: 0;

      .list-item-index {
        color: $black;
        font-size: 12px;
        font-weight: 600;
        padding: 0 2px 0 12px;
      }
    }

    .list-item-header-name {
      width: 100%;
      min-width: 160px;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-content: center;
      align-items: center;
      font-family: "Poppins", sans-serif;
      color: $grey-100;
      font-size: 13px;
      font-weight: 600;
      text-align: left;
      margin: 0;
    }
    .list-item-name {
      width: 100%;
      min-width: 160px;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-content: center;
      align-items: center;
      font-family: "Poppins", sans-serif;
      color: $grey-90;
      font-size: 12px;
      font-weight: 500;
      text-align: left;
      margin: 0;
    }

    .list-item-header-organisation {
      width: 100%;
      min-width: 200px;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-content: center;
      align-items: center;
      font-family: "Poppins", sans-serif;
      color: $grey-100;
      font-size: 13px;
      font-weight: 600;
      text-align: left;
      margin: 0;
    }
    .list-item-organisation {
      width: 100%;
      min-width: 200px;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-content: center;
      align-items: center;
      font-family: "Poppins", sans-serif;
      color: $grey-90;
      font-size: 12px;
      font-weight: 500;
      text-align: left;
      margin: 0;
    }

    .list-item-header-courses,
    .list-item-header-lessons,
    .list-item-header-nfts {
      width: 100%;
      min-width: 120px;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-content: center;
      align-items: center;
      font-family: "Poppins", sans-serif;
      color: $grey-100;
      font-size: 13px;
      font-weight: 600;
      text-align: left;
      margin: 0;
    }
    .list-item-courses,
    .list-item-lessons,
    .list-item-nfts {
      width: 100%;
      min-width: 120px;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-content: center;
      align-items: center;
      font-family: "Poppins", sans-serif;
      color: $grey-90;
      font-size: 12px;
      font-weight: 500;
      text-align: left;
      margin: 0;
    }
  }

  .list-item-header-categories {
    width: 100%;
    min-width: 160px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-content: center;
    align-items: center;
    font-family: "Poppins", sans-serif;
    color: $grey-100;
    font-size: 13px;
    font-weight: 600;
    text-align: left;
    margin: 0;
  }
  .list-item-header-sales {
    width: 100%;
    min-width: 160px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-content: center;
    align-items: center;
    font-family: "Poppins", sans-serif;
    color: $grey-100;
    font-size: 13px;
    font-weight: 600;
    text-align: left;
    margin: 0;
  }
  .list-item-sales {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
    align-items: center;
    padding: 0 8px 0 0;

    .list-item-category {
      width: 100%;
      min-width: 148px;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-content: center;
      align-items: center;
      color: $black;
      font-size: 13px;
      font-weight: 500;
      text-transform: uppercase;
      margin: 0;
      padding: 0;

      .category-indicator {
        width: auto;
        outline: transparent solid 2px;
        outline-offset: 2px;
        border-radius: 9999px;
        transition: background-color 0.2s ease-out 0s;
        background: $grasp-cyan;
        font-size: 12px;
        text-align: center;
        text-wrap: nowrap;
        padding-inline: 8px;
        --badge-color: $grey-40;
        color: $grey-90;
        box-shadow: none;
        border-width: 1.5px;
        border-style: solid;
        border-image: initial;
        border-color: #4d5358;
      }
    }

    .sales {
      width: 100%;
      min-width: 152px;
      display: flex;
      flex-direction: row;
      align-content: center;
      align-items: center;
      justify-content: space-between;
      font-family: "Poppins", sans-serif;
      color: $grey-90;
      font-size: 12px;
      font-weight: 500;
      text-align: left;
      margin: 0;
      padding: 0;

      .list-item-index {
        color: $black;
        font-size: 12px;
        font-weight: 600;
        padding: 0 6px 0 0;
      }

      .sales-amount {
        display: flex;
        flex-direction: row;
        align-content: center;
        align-items: center;
        justify-content: center;
        font-family: "Poppins", sans-serif;
        color: $black;
        font-size: 12px;
        font-weight: 500;
        text-align: left;

        img,
        svg {
          width: 22px;
          background: transparent;
          object-fit: contain;
          overflow: hidden;
          margin: 0 2px 0 0;
        }
      }
    }
  }
}
</style>
