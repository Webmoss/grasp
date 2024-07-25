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
          <div class="form-sidebar">
            <ul>
              <li>
                <img v-if="step >= 1" src="../../assets/svgs/Check.svg" height="20" />
                <img v-else src="../../assets/svgs/Check-Grey.svg" height="20" />
                Lesson Details
              </li>
              <li>
                <img v-if="step >= 2" src="../../assets/svgs/Check.svg" height="20" />
                <img v-else src="../../assets/svgs/Check-Grey.svg" height="20" /> Upload
                Assets
              </li>
              <li>
                <img v-if="step >= 3" src="../../assets/svgs/Check.svg" height="20" />
                <img v-else src="../../assets/svgs/Check-Grey.svg" height="20" /> Assign
                Categories
              </li>
              <li>
                <img v-if="step >= 4" src="../../assets/svgs/Check.svg" height="20" />
                <img v-else src="../../assets/svgs/Check-Grey.svg" height="20" /> Add
                Lessons
              </li>
              <li>
                <img v-if="step >= 5" src="../../assets/svgs/Check.svg" height="20" />
                <img v-else src="../../assets/svgs/Check-Grey.svg" height="20" /> Set
                Price
              </li>
            </ul>
          </div>
          <!-- Step 1 -->
          <div v-if="step === 1" class="form-container">
            <h2>Lesson Details</h2>
            <div class="input-row mb-10">
              <label for="name">Type</label>
              <input
                type="text"
                name="name"
                placeholder="Enter a lesson type, eg. Article, Video, Quiz"
                :value="lesson.type"
              />
            </div>
            <div class="input-row mb-10">
              <label for="title">Title</label>
              <input
                type="text"
                name="title"
                placeholder="Enter a title,eg. My Lesson"
                :value="lesson.title"
              />
            </div>
            <div class="input-row mb-10">
              <label for="description">Excerpt</label>
              <textarea
                type="text"
                name="excerpt"
                placeholder="Enter a short excerpt"
                :value="lesson.excerpt"
              />
            </div>
            <div class="input-row mb-10">
              <label for="description">Description</label>
              <textarea
                type="text"
                name="description"
                placeholder="Enter a long description"
                :value="lesson.description"
              />
            </div>
          </div>
          <!-- Step 2 -->
          <div v-if="step === 2" class="form-container">
            <h2>Upload Assets</h2>
            <div class="input-row mb-10">
              <label for="name">Banner</label>
              <input
                type="text"
                name="name"
                placeholder="Upload a banner for the lesson"
                :value="lesson.banner"
              />
            </div>
            <div class="input-row mb-10">
              <label for="name">Image</label>
              <input
                type="text"
                name="image"
                placeholder="Upload an image for the lesson"
                :value="lesson.image"
              />
            </div>
            <div class="input-row mb-10">
              <label for="description">Social Links</label>
              <textarea
                type="text"
                name="links"
                placeholder="Add social links for the lesson"
                :value="lesson.links"
              />
            </div>
          </div>
          <!-- Step 3 -->
          <div v-if="step === 3" class="form-container">
            <h2>Assign Categories</h2>
            <div class="input-row mb-10">
              <label for="name">Main Category</label>
              <input
                type="text"
                name="category"
                placeholder="Set the main category for the lesson"
                :value="lesson.category"
              />
            </div>
            <div class="input-row mb-10">
              <label for="name">Other Categories</label>
              <input
                type="text"
                name="categories"
                placeholder="Add additional categories"
                :value="lesson.categories"
              />
            </div>
          </div>
          <!-- Step 4 -->
          <div v-if="step === 4" class="form-container">
            <h2>Add Lessons</h2>
            <div class="input-row mb-10">
              <label for="name">Lessons</label>
              <input
                type="text"
                name="lessons"
                placeholder="Add lessons to your lesson"
                :value="lesson.lessons"
              />
            </div>
          </div>
          <!-- Step 5 -->
          <div v-if="step === 5" class="form-container">
            <h2>Set Price</h2>
            <div class="input-row mb-10">
              <label for="name">Price</label>
              <input
                type="text"
                name="price"
                placeholder="Enter a price for the full lesson"
                :value="lesson.price"
              />
            </div>
            <div class="input-row mb-10">
              <label for="name">Token</label>
              <input
                type="text"
                name="token"
                placeholder="Enter the token to charge for the lesson"
                :value="lesson.token"
              />
            </div>
          </div>
        </section>
        <footer class="modal-footer">
          <div class="footer-container">
            <button
              type="button"
              class="cancel-blue"
              @click="emit('close')"
              aria-label="Close modal"
            >
              Cancel
            </button>
            <div class="button-container">
              <button v-if="step > 1" type="button" class="cancel-blue" @click="goBack()">
                Back
              </button>
              <button v-if="step < 5" type="button" class="btn-blue" @click="nextStep()">
                Next
              </button>
              <button
                v-if="step === 5"
                type="button"
                class="btn-blue"
                @click="createLesson()"
              >
                Done
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  </transition>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";
import { useStore } from "../../store";

const emit = defineEmits(["close"]);
const store = useStore();

const step = ref(1);

const props = defineProps({
  showModal: {
    type: Boolean,
    default: false,
  },
  lesson: {
    type: Object,
    default: {},
    required: false,
  },
});

const form: any = reactive({
  id: undefined,
  type: undefined,
  category: undefined,
  categories: [],
  banner: undefined,
  image: undefined,
  title: undefined,
  excerpt: undefined,
  description: undefined,
  price: undefined,
  token: undefined,
  links: [],
  lessons: [],
  step: 0,
  isLive: false,
  created_date: undefined,
  updated_date: undefined,
});

const createLesson = async () => {
  console.log("Form", form);
  try {
    if (!form.value.name) {
      // await store.createLesson(form);
    }
  } catch {
    console.log("An error has occurred!");
  } finally {
    step.value = 1;
    emit("close");
  }
};

const goBack = () => {
  step.value -= 1;
};
const nextStep = () => {
  step.value += 1;
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
}

.modal {
  width: 100%;
  height: 100%;
  background: $white;
  padding: 0;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
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
    right: 10px;
    color: $grasp-blue;
    font-size: 24px;
    font-weight: bold;
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
  padding: 30px 0 0 0;

  .form-sidebar {
    width: 240px;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
    padding: 50px 0 0 0;

    ul {
      width: 100%;
      list-style: none;
      text-decoration: none;
      margin-block-start: 10px;
      margin-block-end: 0;
      margin-inline-start: 0;
      margin-inline-end: 0;
      padding-inline-start: 0;
      padding-inline-end: 0;
      border-top: 0.25px solid $white;
      border-bottom: 0.25px solid $white;

      li {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        align-content: center;
        margin: 0;
        padding: 8px 0;
        color: $black;
        font-size: 15px;
        font-weight: 600;
        text-decoration: none;
        transition: 0.6s;
        cursor: pointer;

        &:hover,
        &:active,
        &:focus,
        &:focus-visible {
          color: $grasp-cyan;
        }

        img {
          margin-right: 8px;
        }
      }
    }
  }

  .form-container {
    width: 560px;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    align-content: center;
    padding: 0;
    z-index: 999;

    h2 {
      width: 100%;
      color: $grasp-blue;
      font-style: normal;
      font-weight: 800;
      font-size: 24px;
      line-height: 30px;
      margin: 0 0 16px 0;
    }

    .input-row {
      width: 100%;
      max-width: 540px;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
    }

    label {
      color: $black;
      font-style: normal;
      font-weight: 800;
      font-size: 15px;
      line-height: 18px;
      margin: 8px 0 8px 8px;
    }

    input {
      width: 94%;
      height: 30px;
      color: $grasp-blue;
      background-color: #fdfdfd;
      border: 1px solid #d9d9d9;
      border-radius: 10px;
      letter-spacing: 1px;
      font-size: 14px;
      line-height: 24px;
      margin-bottom: 5px;
      padding: 1% 2%;
      text-align: left;
    }

    input::placeholder {
      color: #a8a8a8;
      letter-spacing: 1px;
    }

    input:read-only {
      color: #1a1a1a;
      border: 1px dashed #e0e0e0;
      letter-spacing: 1px;
      cursor: not-allowed;
    }

    input:focus {
      border: 1px solid $grasp-blue;
      outline: none;
    }

    textarea {
      width: 94%;
      height: 70px;
      color: $grasp-blue;
      background-color: #fdfdfd;
      border: 1px solid #d9d9d9;
      border-radius: 10px;
      letter-spacing: 1px;
      font-size: 14px;
      line-height: 24px;
      margin-bottom: 5px;
      padding: 1% 2%;
      text-align: left;
      resize: none;
    }

    textarea::placeholder {
      color: #a8a8a8;
      letter-spacing: 1px;
    }

    textarea:focus {
      border: 1px solid $grasp-blue;
      outline: none;
    }

    .select-row {
      width: 100%;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: 15px;

      label.black {
        width: 100%;
        color: $grasp-blue;
        font-style: normal;
        font-weight: 800;
        font-size: 20px;
        line-height: 24px;
        letter-spacing: 0.1em;
        margin: 8px 0 2px 15px;
        text-align: left;
      }
    }

    .mb-10 {
      margin-bottom: 10px;
    }
  }
}

.modal-footer {
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 30px 0 50px 0;

  .footer-container {
    width: 740px;
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

.cancel-blue {
  width: 100px;
  height: 40px;

  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  justify-content: center;

  color: $black;
  background-color: $white;
  font-size: 14px;
  font-weight: 600;

  border: 2px solid $black;
  border-radius: 10px;
  padding-left: 20px;
  padding-right: 20px;
  transition: all 0.5s linear;
  cursor: pointer;

  .icon-color {
    margin: 0 10px 0 0;
  }

  &:hover,
  &:active,
  &:focus,
  &:focus-visible {
    color: $grasp-blue;
    border: 2px solid $grasp-blue;
  }
}

.btn-blue {
  width: 100px;
  height: 40px;

  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  justify-content: center;
  color: $white;
  background-color: $grasp-blue;
  font-size: 14px;
  font-weight: bold;
  border: 2px solid $grasp-blue;
  border-radius: 10px;
  padding-left: 20px;
  padding-right: 20px;
  margin-left: 8px;
  transition: all 0.5s linear;
  cursor: pointer;

  .icon-color {
    margin: 0 10px 0 0;
  }

  &:hover {
    color: $grasp-cyan;
    border: 2px solid $grasp-cyan;
  }
}

.btn-green {
  width: 100px;
  height: 40px;

  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  justify-content: center;
  color: $grasp-blue;
  background-color: $grasp-cyan;
  font-size: 14px;
  font-weight: bold;

  border: 2px solid $grasp-cyan;
  border-radius: 10px;
  padding-left: 20px;
  padding-right: 20px;
  margin-left: 8px;
  transition: all 0.5s linear;
  cursor: pointer;

  .icon-color {
    margin: 0 5px 0 0;
  }

  &:hover,
  &:active,
  &:focus,
  &:focus-visible {
    border: 2px solid $grasp-blue;
  }

  &:disabled {
    background: #c6c6c6;
    border: 2px solid $grey-50;
    color: $grasp-blue;
    cursor: not-allowed;
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
