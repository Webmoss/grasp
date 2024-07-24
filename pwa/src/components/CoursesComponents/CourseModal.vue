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
              <li>Step 1</li>
              <li>Step 2</li>
              <li>Step 3</li>
              <li>Step 4</li>
            </ul>
          </div>
          <div class="form-container">
            <h2>Create Course</h2>
            <div class="input-row mb-10">
              <label for="name">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter a name,eg. My Course"
                :value="course.name"
              />
            </div>
            <div class="input-row mb-10">
              <label for="name">Category</label>
              <input
                type="text"
                name="name"
                placeholder="Enter a category, eg. Web3"
                :value="course.category"
              />
            </div>
            <div class="input-row mb-10">
              <label for="description">Description</label>
              <textarea
                type="text"
                name="description"
                placeholder="Enter a short description"
                :value="course.description"
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
              <button type="button" class="btn-blue" @click="CreateCourse()">Next</button>
              <button type="button" class="btn-green" @click="CreateCourse()">
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
import { reactive } from "vue";
import { useStore } from "../../store";

const emit = defineEmits(["close"]);
const store = useStore();

const props = defineProps({
  showModal: {
    type: Boolean,
    default: false,
  },
  course: {
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
  name: undefined,
  banner: undefined,
  image: undefined,
  title: undefined,
  excerpt: undefined,
  description: undefined,
  price: undefined,
  links: [],
  lessons: [],
  step: 0,
  isLive: false,
  created_date: undefined,
  updated_date: undefined,
});

const CreateCourse = async () => {
  console.log("Form", form);
  try {
    if (!form.value.name) {
      // await store.createCourse(form);
    }
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
  padding: 0;

  .form-sidebar {
    width: 200px;
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
        margin: 0;
        padding: 8px 0;
        color: $black;
        font-size: 16px;
        text-decoration: none;
        transition: 0.6s;
        cursor: pointer;

        &:hover,
        &:active,
        &:focus,
        &:focus-visible {
          color: $grasp-cyan;
        }
      }
    }
  }

  .form-container {
    width: 700px;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
      margin: 0 0 8px 0;
    }

    .input-row {
      width: 100%;
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
      font-size: 16px;
      line-height: 20px;
      margin: 8px 0 2px 8px;
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
      padding: 2% 3%;
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
      border: 1px solid $grasp-cyan;
      outline: none;
    }

    textarea {
      width: 94%;
      height: 60px;
      color: $grasp-blue;
      background-color: #fdfdfd;
      border: 1px solid #d9d9d9;
      border-radius: 10px;
      letter-spacing: 1px;
      font-size: 14px;
      line-height: 24px;
      margin-bottom: 5px;
      padding: 2% 3%;
      text-align: left;
      resize: none;
    }

    textarea::placeholder {
      color: #a8a8a8;
      letter-spacing: 1px;
    }

    textarea:focus {
      border: 1px solid $grasp-cyan;
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
    width: 900px;
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
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  justify-content: center;
  color: $black;
  background-color: $white;
  font-size: 14px;
  font-weight: bold;
  width: auto;
  height: 35px;
  border: 2px solid $black;
  border-radius: 10px;
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 5px;
  margin-right: 10px;
  transition: 0.6s;
  cursor: pointer;

  .icon-color {
    margin: 0 10px 0 0;
  }

  &:hover {
    color: $grasp-cyan;
    border: 2px solid $grasp-cyan;
  }
}

.btn-blue {
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  justify-content: center;
  color: $white;
  background-color: $grasp-blue;
  font-size: 14px;
  font-weight: bold;
  width: auto;
  height: 35px;
  border: 2px solid $grasp-blue;
  border-radius: 10px;
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 5px;
  margin-right: 10px;
  transition: 0.6s;
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
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  justify-content: center;
  color: $grasp-blue;
  background-color: $grasp-cyan;
  font-size: 14px;
  font-weight: bold;
  width: auto;
  height: 35px;
  border: 2px solid $grasp-cyan;
  border-radius: 10px;
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 5px;
  margin-right: 10px;
  transition: 0.6s;
  cursor: pointer;

  .icon-color {
    margin: 0 5px 0 0;
  }

  &:hover {
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
