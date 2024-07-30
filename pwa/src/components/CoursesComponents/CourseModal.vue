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
                Course Details
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
            <h2>Course Details</h2>
            <div class="input-row mb-10">
              <label for="name">Type</label>
              <input
                type="text"
                name="name"
                placeholder="Enter a course type, eg. Activity, Independent Study, etc. "
                :value="form.type"
              />
            </div>
            <div class="input-row mb-10">
              <label for="name">Main Category</label>
              <select
                v-model="form.category"
                class="category-select"
                name="category"
                @change="selectCategory($event)"
              >
                <option
                  v-for="option in options"
                  :key="option.value"
                  :value="option.value"
                >
                  {{ option.label }}
                </option>
              </select>
            </div>
            <div class="input-row mb-10">
              <label for="title">Title</label>
              <input
                type="text"
                name="title"
                placeholder="Enter a title,eg. My Course"
                :value="form.title"
              />
            </div>
            <div class="input-row mb-10">
              <label for="description">Excerpt</label>
              <textarea
                rows="4"
                cols="50"
                type="text"
                name="excerpt"
                placeholder="Enter a short excerpt"
                :value="form.excerpt"
              />
            </div>
            <div class="input-row mb-10">
              <label for="description">Description</label>
              <textarea
                rows="6"
                cols="50"
                type="text"
                name="description"
                placeholder="Enter a full description"
                :value="form.description"
              />
            </div>
          </div>
          <!-- Step 2 -->
          <div v-if="step === 2" class="form-container">
            <h2>Course Assets</h2>
            <div class="input-row mb-10">
              <label for="banner">Upload a Banner (1500x200px)</label>
              <input
                type="file"
                name="banner"
                accept="image/png, image/jpeg"
                :value="form.banner"
              />
            </div>
            <div class="input-row mb-10">
              <label for="image">Upload a Icon (500x500px)</label>
              <input
                type="file"
                name="image"
                placeholder="Upload an icon image for the course"
                :value="form.image"
              />
            </div>
            <div class="input-row mb-10">
              <label for="description">Add Links</label>
              {{form.links}}
              <div v-for="(link, i) in form.links"  :key="i" class="input-box mb-10">
                <img src="../../assets/svgs/socials/website.svg" alt="Website" />
                <span class="link-text">{{ link }}</span>
              </div>
              <div class="input-box mb-10">
                <img src="../../assets/svgs/socials/website.svg" alt="Website" />
                <input
                  type="text"
                  name="website"
                  placeholder="Add a link"
                  v-model="linkText"
                />
                <button class="add-link-button" @click="addLink()">
                  <img src="../../assets/svgs/Add-Circle.svg" alt="Add link" />
                </button>
              </div>
              <!-- <div class="input-box mb-10">
                <img src="../../assets/svgs/socials/twitter.svg" alt="Twitter" />
                <input
                  type="text"
                  name="twitter"
                  placeholder="Twitter"
                  :value="form.links.twitter"
                />
              </div>
              <div class="input-box mb-10">
                <img src="../../assets/svgs/socials/facebook.svg" alt="Facebook" />
                <input
                  type="text"
                  name="facebook"
                  placeholder="Facebook"
                  :value="form.links.facebook"
                />
              </div>
              <div class="input-box mb-10">
                <img src="../../assets/svgs/socials/linkedin.svg" alt="Linkedin" />
                <input
                  type="text"
                  name="linkedin"
                  placeholder="Linkedin"
                  :value="form.links.linkedin"
                />
              </div>
              <div class="input-box mb-10">
                <img src="../../assets/svgs/socials/instagram.svg" alt="Instagram" />
                <input
                  type="text"
                  name="instagram"
                  placeholder="Instagram"
                  :value="form.links.instagram"
                />
              </div>
              <div class="input-box mb-10">
                <img src="../../assets/svgs/socials/youtube.svg" alt="Youtube" />
                <input
                  type="text"
                  name="youtube"
                  placeholder="Youtube"
                  :value="form.links.youtube"
                />
              </div>
              <div class="input-box mb-10">
                <img src="../../assets/svgs/socials/telegram.svg" alt="Telegram" />
                <input
                  type="text"
                  name="telegram"
                  placeholder="Telegram"
                  :value="form.links.telegram"
                />
              </div>
              <div class="input-box mb-10">
                <img src="../../assets/svgs/socials/skype.svg" alt="Skype" />
                <input
                  type="text"
                  name="skype"
                  placeholder="Skype"
                  :value="form.links.skype"
                />
              </div> -->
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
                placeholder="Set the main category for the course"
                :value="form.category"
              />
            </div>
            <div class="input-row mb-10">
              <label for="name">Other Categories</label>
              <input
                type="text"
                name="categories"
                placeholder="Add additional categories"
                :value="form.categories"
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
                placeholder="Add lessons to your course"
                :value="form.lessons"
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
                placeholder="Enter a price for the full course"
                :value="form.price"
              />
            </div>
            <div class="input-row mb-10">
              <label for="name">Token</label>
              <input
                type="text"
                name="token"
                placeholder="Enter the token to charge for the course"
                :value="form.token"
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
                @click="createCourse()"
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
const linkText = ref("");

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
  category: "",
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

const options = ref([
  { value: "", label: "Choose Category" },
  { value: "animation", label: "Animation" },
  { value: "ai", label: "Artificial Intelligence" },
  { value: "architecture", label: "Architecture & Spaces" },
  { value: "craft", label: "Craft" },
  { value: "fashion", label: "Fashion" },
  { value: "illustration", label: "Illustration" },
  { value: "marketing", label: "Marketing & Business" },
  { value: "music", label: "Music & Audio" },
  { value: "photography", label: "Photography" },
  { value: "video", label: "Video" },
  { value: "web", label: "Web" },
  { value: "writing", label: "Writing" },
]);

/**
 * * Add link
 */
function addLink() {
  form.links.push(linkText.value);
  linkText.value = "";
}

/**
 * * Update our Course Category
 */
function selectCategory(event: Event) {
  form.category = (event.target as HTMLInputElement).value;
}

const createCourse = async () => {
  console.log("Form", form);
  try {
    if (!form.value.name) {
      // await store.createCourse(form);
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

    .input-box {
      width: 94%;
      max-width: 540px;
      height: 40px;
      position: relative;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-content: center;
      align-items: center;
      background-color: #fdfdfd;
      border: 1px solid #d9d9d9;
      border-radius: 10px;
      margin-bottom: 5px;

      img,
      svg {
        width: 20px;
        margin: 0 12px;
      }

      input {
        width: 100%;
        height: 40px;
        color: $grasp-blue;
        background-color: transparent;
        border: none;
        border-radius: 10px;
        letter-spacing: 1px;
        font-size: 14px;
        line-height: 24px;
        text-align: left;
        padding: 4px 0 0 0;
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
        border: none;
        outline: none;
      }

      .link-text {
        color: $black;
        letter-spacing: 1px;
        font-size: 14px;
        line-height: 24px;
        text-align: left;
        padding: 4px 0 0 0;
      }
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
      height: auto;
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
    .category-select {
      width: 98%;
      height: 40px;
      color: $grey-60;
      background-color: #fdfdfd;
      border: 1px solid #d9d9d9;
      border-radius: 10px;
      letter-spacing: 1px;
      font-size: 14px;
      line-height: 24px;
      margin-bottom: 5px;
      padding: 1% 2%;
      text-align: left;
      transition: all 0.5s linear;
      cursor: pointer;

      &:focus,
      &:focus-visible,
      &:active {
        color: $grey-90;
        border: 0.5px solid $grey-50;
        outline: -webkit-focus-ring-color auto 0px;
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
.add-link-button {
  width: 26px;
  height: 26px;
  display: flex;
  flex-direction: row;
  align-content: center;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: none;
  padding: 0;
  margin-right: 4px;
  cursor: pointer;

  &:hover {
    color: $grasp-cyan;
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
