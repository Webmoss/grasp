<template>
  <button class="vote-button" @click="voteCourse()">Vote Now</button>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";

export interface Props {
  courseId?: string;
}

const props = defineProps({
  courseId: {
    type: Number,
    default: null,
    required: false,
  },
});

const router = useRouter();

function voteCourse() {
  router.push({ name: "course", params: { id: props.courseId } });
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/variables.scss";
@import "../../assets/styles/mixins.scss";

.vote-button {
  width: 130px;
  height: 35px;

  display: flex;
  flex-direction: row nowrap;
  justify-content: center;
  align-content: center;
  align-items: center;

  color: $white;
  background-color: $grasp-blue;
  font-size: 18px;
  font-weight: 600;
  border: 0.5px solid $grasp-blue;
  border-radius: 30px;
  padding-left: 16px;
  padding-right: 16px;
  transition: all 0.5s linear;
  cursor: pointer;

  &:hover,
  &:focus {
    color: $grasp-cyan;
    border: 0.5px solid $white;
  }
  @include breakpoint($break-sm) {
    margin: 15px auto;
  }
}
</style>
