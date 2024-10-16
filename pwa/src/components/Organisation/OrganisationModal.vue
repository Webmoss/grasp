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
                Organisation Details
              </li>
              <li>
                <img v-if="step >= 2" src="../../assets/svgs/Check.svg" height="20" />
                <img v-else src="../../assets/svgs/Check-Grey.svg" height="20" /> Add
                Contact Details
              </li>
              <li>
                <img v-if="step >= 3" src="../../assets/svgs/Check.svg" height="20" />
                <img v-else src="../../assets/svgs/Check-Grey.svg" height="20" /> Add
                Members
              </li>
              <li>
                <img v-if="step >= 4" src="../../assets/svgs/Check.svg" height="20" />
                <img v-else src="../../assets/svgs/Check-Grey.svg" height="20" /> Upload
                Assets
              </li>
            </ul>
          </div>
          <!-- Step 1 -->
          <div v-if="step === 1" class="form-container">
            <h2>Organisation Details</h2>
            <div class="input-row mb-5">
              <label for="name">Type</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your Organisation type, eg. College"
                v-model="form.type"
              />
            </div>
            <div class="input-row mb-5">
              <label for="category">Main Category</label>
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
            <div class="input-row mb-5">
              <label for="title">Title</label>
              <input
                type="text"
                name="title"
                placeholder="Enter your Organisation name"
                v-model="form.title"
              />
            </div>
            <div class="input-row mb-5">
              <label for="contact">Primary Contact</label>
              <input
                type="text"
                name="contact"
                placeholder="Enter a main contact person"
                v-model="form.contact"
              />
            </div>
            <div class="description-row">
              <label for="description">Description</label>
              <textarea
                rows="6"
                cols="50"
                type="text"
                name="description"
                placeholder="Enter Organisation description"
                v-model="form.description"
              />
            </div>
          </div>
          <!-- Step 2 -->
          <div v-if="step === 2" class="form-container">
            <h2>Add Contact Details</h2>
            <div class="input-row mb-5">
              <label for="email">Email</label>
              <input
                type="text"
                name="email"
                placeholder="Enter Organisation email"
                v-model="form.email"
              />
            </div>
            <div class="input-row mb-5">
              <label for="phone">Phone</label>
              <input
                type="text"
                name="phone"
                placeholder="Enter a contact no"
                v-model="form.phone"
              />
            </div>
            <div class="input-row mb-5">
              <label for="country">Country</label>
              <input
                type="text"
                name="country"
                placeholder="Enter country"
                v-model="form.country"
              />
            </div>
            <div class="input-row mb-20">
              <label for="city">City</label>
              <input
                type="text"
                name="city"
                placeholder="Enter city"
                v-model="form.city"
              />
            </div>
            <div class="description-row">
              <label for="city">Add Social Links</label>
              <div class="input-box mb-10">
                <img src="../../assets/svgs/socials/website.svg" alt="Website" />
                <input
                  type="text"
                  name="websiteTitle"
                  placeholder="Website Title"
                  v-model="form.website.title"
                />
                <input
                  type="text"
                  name="websiteUrl"
                  placeholder="Website link"
                  v-model="form.website.url"
                />
              </div>
              <div class="input-box mb-10">
                <img src="../../assets/svgs/socials/twitter.svg" alt="Twitter" />
                <input
                  type="text"
                  name="twitterTitle"
                  placeholder="Twitter Username"
                  v-model="form.twitter.title"
                />
                <input
                  type="text"
                  name="twitterUrl"
                  placeholder="Twitter link"
                  v-model="form.twitter.url"
                />
              </div>
              <div class="input-box mb-10">
                <img src="../../assets/svgs/Discord.svg" alt="Discord" />
                <input
                  type="text"
                  name="discordTitle"
                  placeholder="Discord Title"
                  v-model="form.discord.title"
                />
                <input
                  type="text"
                  name="discordUrl"
                  placeholder="Discord link"
                  v-model="form.discord.url"
                />
              </div>
              <div class="input-box mb-10">
                <img src="../../assets/svgs/socials/telegram.svg" alt="Telegram" />
                <input
                  type="text"
                  name="telegramTitle"
                  placeholder="Telegram Title"
                  v-model="form.telegram.title"
                />
                <input
                  type="text"
                  name="telegramUrl"
                  placeholder="Telegram link"
                  v-model="form.telegram.url"
                />
              </div>
              <div class="input-box mb-10">
                <img src="../../assets/svgs/socials/linkedin.svg" alt="LinkedIn" />
                <input
                  type="text"
                  name="linkedinTitle"
                  placeholder="LinkedIn Title"
                  v-model="form.linkedin.title"
                />
                <input
                  type="text"
                  name="linkedinUrl"
                  placeholder="LinkedIn link"
                  v-model="form.linkedin.url"
                />
              </div>
            </div>
          </div>
          <!-- Step 3 -->
          <div v-if="step === 3" class="form-container">
            <h2>Add Organisation Members</h2>
            <div class="description-row mb-10">
              <label for="name">Members</label>
              <input
                type="text"
                name="members"
                placeholder="Add members to your organisation"
                :value="selectedMembers"
              />
            </div>

            <div class="my-members-box">
              <template v-for="(member, i) in testUsers.data" :key="i">
                <div class="list-item">
                  <div class="member-copy">
                    <div class="member-role">
                      {{ member.role ? member.role : "" }}
                    </div>
                  </div>
                  <div class="member-copy">
                    <div class="member-name">
                      {{ member.name ? member.name : "" }}
                    </div>
                  </div>
                  <div class="lesson-list-buttons">
                    <div class="lesson-category">
                      <span class="category-indicator">{{
                        member.type ? member.type : ""
                      }}</span>
                    </div>
                    <div class="actions">
                      <button class="add-link-button" @click="addMembers(member as any)">
                        <img
                          src="../../assets/svgs/Add-Circle.svg"
                          alt="Add new member"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
          <!-- Step 4 -->
          <div v-if="step === 4" class="form-container">
            <h2>Organisation Assets</h2>
            <div class="input-row mb-10">
              <label for="banner">Upload Organisation Banner (1500x200px)</label>
              <div class="upload-box">
                <button class="select-file-button" @click="onBannerPick">
                  <img src="../../assets/svgs/File_upload.svg" height="20" /> Select file
                </button>
                {{ bannerImage?.name }}
                <input
                  type="file"
                  style="display: none"
                  ref="fileBannerInput"
                  accept="image/*"
                  @change="onBannerFilePicked"
                />
              </div>
            </div>
            <div class="input-row mb-10">
              <label for="image">Upload Organisation Logo (500x500px)</label>
              <div class="upload-box">
                <button class="select-file-button" @click="onIconPick">
                  <img src="../../assets/svgs/File_upload.svg" height="20" /> Select file
                </button>
                {{ iconImage?.name }}
                <input
                  type="file"
                  style="display: none"
                  ref="fileIconInput"
                  accept="image/*"
                  @change="onIconFilePicked"
                />
              </div>
            </div>

            <h2>Admin Settings</h2>
            <div class="checkbox-row">
              <div class="checkbox-box">
                <label for="enabled">Enabled</label>
                <input
                  type="checkbox"
                  id="enabled"
                  :true-value="true"
                  :false-value="false"
                  v-model="form.enabled"
                />
              </div>
              <div class="checkbox-box">
                <label for="verified">Verified</label>
                <input
                  type="checkbox"
                  id="verified"
                  :true-value="true"
                  :false-value="false"
                  v-model="form.verified"
                />
              </div>
              <div class="checkbox-box">
                <label for="blocked">Blocked</label>
                <input
                  type="checkbox"
                  id="blocked"
                  :true-value="true"
                  :false-value="false"
                  v-model="form.blocked"
                />
              </div>
            </div>
          </div>
        </section>
        <footer class="modal-footer">
          <div class="footer-container">
            <button
              type="button"
              class="cancel-button"
              @click="cancelCreate()"
              aria-label="Close modal"
            >
              Cancel
            </button>
            <div class="button-container">
              <button
                v-if="step >= 1"
                type="button"
                class="draft-grey"
                @click="saveDraft()"
              >
                Save Draft
              </button>
              <button
                v-if="step > 1"
                type="button"
                class="cancel-button"
                @click="goBack()"
              >
                Back
              </button>
              <button v-if="step < 4" type="button" class="btn-blue" @click="nextStep()">
                Next
              </button>
              <button
                v-if="step === 4"
                type="button"
                class="btn-blue"
                @click="createOrganisation()"
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
import { ref, Ref, reactive } from "vue";
import { useStore } from "../../store";
import { userObject } from "src/models/user";

import testUsers from "../../data/users.json";

const emit = defineEmits(["close"]);
const store = useStore();

const props = defineProps({
  showModal: {
    type: Boolean,
    default: false,
  },
  organisation: {
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
  description: undefined,
  contact: undefined,
  email: undefined,
  phone: undefined,
  city: undefined,
  country: undefined,
  website: { title: "", url: "", alt: "", icon: "website" },
  twitter: { title: "", url: "", alt: "", icon: "twitter" },
  discord: { title: "", url: "", alt: "", icon: "discord" },
  telegram: { title: "", url: "", alt: "", icon: "telegram" },
  linkedin: { title: "", url: "", alt: "", icon: "linkedin" },
  created_date: undefined,
  updated_date: undefined,
  enabled: false,
  verified: false,
  blocked: false,
  members: [],
});

const options = ref([
  { value: "", label: "Choose Category" },
  { value: "animation", label: "Animation" },
  { value: "ai", label: "Artificial Intelligence" },
  { value: "architecture", label: "Architecture & Spaces" },
  { value: "craft", label: "Craft" },
  { value: "education", label: "Education" },
  { value: "engineering", label: "Engineering" },
  { value: "fashion", label: "Fashion" },
  { value: "illustration", label: "Illustration" },
  { value: "marketing", label: "Marketing & Business" },
  { value: "music", label: "Music & Audio" },
  { value: "photography", label: "Photography" },
  { value: "video", label: "Video" },
  { value: "development", label: "Software Development" },
  { value: "web3", label: "Web3" },
  { value: "writing", label: "Writing" },
  { value: "other", label: "Other" },
]);

const step = ref(1);
const selectedMembers = ref([]);

/* Ref: name must match the ref in the template */
const fileBannerInput: Ref<HTMLElement | null> = ref(null);
const bannerImage = ref();
const bannerImageUrl = ref();

/* Ref: name must match the ref in the template */
const fileIconInput: Ref<HTMLElement | null> = ref(null);
const iconImage = ref();
const iconImageUrl = ref();

/* Ref: name must match the ref in the template */
const fileNftInput: Ref<HTMLElement | null> = ref(null);
const nftImage = ref();
const nftImageUrl = ref();

function onBannerPick() {
  fileBannerInput.value?.click();
}
function onIconPick() {
  fileIconInput.value?.click();
}
function onNftPick() {
  fileNftInput.value?.click();
}

function onBannerFilePicked(event: any) {
  const files = event.target.files;
  let filename = files[0].name;
  const fileReader = new FileReader();
  fileReader.addEventListener("load", () => {
    bannerImageUrl.value = fileReader.result;
  });
  fileReader.readAsDataURL(files[0]);
  bannerImage.value = files[0];
}

function onIconFilePicked(event: any) {
  const files = event.target.files;
  let filename = files[0].name;
  const fileReader = new FileReader();
  fileReader.addEventListener("load", () => {
    iconImageUrl.value = fileReader.result;
  });
  fileReader.readAsDataURL(files[0]);
  iconImage.value = files[0];
}

/**
 * * Add link
 */
// function addLink() {
//   form.links.push({ label: linkText.value, url: linkURL.value });
//   linkText.value = "";
//   linkURL.value = "";
// }

/**
 * * Add Member to Organisation
 */
function addMembers(members: userObject) {
  selectedMembers.value.push(members.name as never);
  form.members.push(members);
}

/**
 * * Update our Course Category
 */
function selectCategory(event: Event) {
  form.category = (event.target as HTMLInputElement).value;
}

const cancelCreate = async () => {
  form.value = {
    id: undefined,
    type: undefined,
    category: "",
    categories: [],
    banner: undefined,
    image: undefined,
    title: undefined,
    description: undefined,
    contact: undefined,
    email: undefined,
    phone: undefined,
    city: undefined,
    country: undefined,
    website: { title: "", url: "", alt: "", icon: "website" },
    twitter: { title: "", url: "", alt: "", icon: "twitter" },
    discord: { title: "", url: "", alt: "", icon: "discord" },
    telegram: { title: "", url: "", alt: "", icon: "telegram" },
    linkedin: { title: "", url: "", alt: "", icon: "linkedin" },
    created_date: undefined,
    updated_date: undefined,
    enabled: false,
    verified: false,
    blocked: false,
    members: [],
  };
  step.value = 1;
  emit("close");
};

const saveDraft = async () => {
  console.log("Save Draft Organisation", form);
  try {
    if (!form.title) {
      // await store.createOrganisation(form);
    }
    step.value = 1;
  } catch {
    console.log("An error has occurred!");
  } finally {
    step.value = 1;
    emit("close");
  }
};

const createOrganisation = async () => {
  console.log("Create Organidation", form);
  try {
    if (!form.title) {
      // await store.createOrganisation(form);
    }
    step.value = 1;
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
    top: 20px;
    right: 20px;
    color: $grasp-blue;
    font-size: 24px;
    font-weight: bold;
    background: transparent;
    border: none;
    z-index: 999;
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
        transition: all 0.5s linear;
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
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: center;
    padding: 0 0 180px 0;
    z-index: 999996;
    overflow-x: scroll;

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
      max-width: 400px;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;

      .link-text {
        color: $black;
        letter-spacing: 1px;
        font-size: 14px;
        line-height: 24px;
        text-align: left;
        padding: 4px 0 0 0;
      }
    }

    .description-row {
      width: 100%;
      max-width: 540px;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;

      .link-text {
        color: $black;
        letter-spacing: 1px;
        font-size: 14px;
        line-height: 24px;
        text-align: left;
        padding: 4px 0 0 0;
      }
    }

    .radio-row {
      width: 98%;
      height: 40px;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-content: center;
      align-items: center;
      background-color: #fdfdfd;
      border: 1px solid #d9d9d9;
      border-radius: 10px;

      .radio-box {
        display: flex;
        flex-direction: row;
        align-content: center;
        align-items: center;
        justify-content: space-between;
        margin: 0 48px 0 0;
        padding: 1% 2%;

        label {
          color: $black;
          font-size: 15px;
          font-weight: 600;
          line-height: 20px;
          font-style: normal;
          text-wrap: nowrap;
          margin: 0 36px 0 0;
        }

        input {
          width: 15px;
          color: $black;
        }

        input:read-only {
          height: 15px;
          color: $grasp-blue;
          cursor: pointer;
        }

        input:focus {
          border: 1px solid $grasp-blue;
          outline: none;
        }
      }
    }

    .checkbox-row {
      width: 98%;
      height: 40px;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-content: center;
      align-items: center;
      background-color: #fdfdfd;
      border: 1px solid #d9d9d9;
      border-radius: 10px;

      .checkbox-box {
        display: flex;
        flex-direction: row;
        align-content: center;
        align-items: center;
        justify-content: space-between;
        margin: 0 48px 0 0;
        padding: 1% 2%;

        label {
          color: $black;
          font-size: 15px;
          font-weight: 600;
          line-height: 20px;
          font-style: normal;
          text-wrap: nowrap;
          margin: 0 36px 0 0;
        }

        input {
          width: 15px;
          color: $black;
        }

        input:read-only {
          height: 15px;
          color: $grasp-blue;
          cursor: pointer;
        }

        input:focus {
          border: 1px solid $grasp-blue;
          outline: none;
        }
      }
    }

    .input-box {
      width: 98%;
      height: 40px;
      position: relative;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-content: center;
      align-items: center;
      color: $black;
      font-size: 14px;
      line-height: 24px;
      text-align: left;
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
        color: $black;
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
    }

    .upload-box {
      width: 98%;
      height: 60px;
      position: relative;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-content: center;
      align-items: center;
      color: $grey-70;
      font-size: 14px;
      font-weight: 500;
      line-height: 24px;
      text-align: left;
      background-color: #fdfdfd;
      border: 1px solid #d9d9d9;
      border-radius: 10px;
      margin-bottom: 5px;

      input {
        width: 100%;
        height: 40px;
        color: $black;
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

      .select-file-button {
        width: auto;
        height: 40px;
        display: flex;
        flex-direction: row;
        align-content: center;
        align-items: center;
        justify-content: center;
        color: $black;
        background-color: $grasp-cyan;
        font-size: 14px;
        font-weight: bold;
        border: 1px solid $grasp-cyan;
        border-radius: 10px;
        padding-left: 20px;
        padding-right: 20px;
        margin: 0 8px;
        transition: all 0.5s linear;
        cursor: pointer;

        img {
          width: 20px;
          margin-right: 4px;
        }

        &:hover,
        &:active,
        &:focus,
        &:focus-visible {
          border: 1px solid $black;
        }

        &:disabled {
          background: #c6c6c6;
          border: 2px solid $grey-50;
          color: $grasp-blue;
          cursor: not-allowed;
        }
      }
    }

    .date-row {
      width: 100%;
      max-width: 540px;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;

      label {
        color: $black;
        font-style: normal;
        font-weight: 800;
        font-size: 15px;
        line-height: 18px;
        margin: 8px 0 8px 8px;
      }
      .date-inputs {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        input {
          width: 46%;
          height: 30px;
          color: #a8a8a8;
          background-color: #fdfdfd;
          border: 1px solid #d9d9d9;
          border-radius: 10px;
          letter-spacing: 1px;
          font-size: 14px;
          line-height: 24px;
          margin-bottom: 5px;
          margin-right: 8px;
          padding: 1% 2%;
          text-align: left;
        }

        input::placeholder {
          color: #a8a8a8;
          letter-spacing: 1px;
        }

        input:read-only {
          height: 40px;
          color: #a8a8a8;
          border: 1px dashed #e0e0e0;
          letter-spacing: 1px;
          cursor: not-allowed;
          padding-top: 20px;
        }

        input:focus {
          border: 1px solid $grasp-blue;
          outline: none;
        }
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
      width: 96%;
      height: 30px;
      color: $black;
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
      height: 40px;
      color: #a8a8a8;
      border: 1px dashed #e0e0e0;
      letter-spacing: 1px;
      cursor: not-allowed;
      padding-top: 20px;
    }

    input:focus {
      border: 1px solid $grasp-blue;
      outline: none;
    }

    textarea {
      width: 96%;
      height: auto;
      color: $black;
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
        color: $black;
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

    .my-members-box {
      width: 94%;
      margin: 30px 0 30px 0;

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
        padding: 6px 0 6px 8px;
        transition: all 0.5s linear;

        .member-copy {
          width: auto;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-content: flex-start;
          align-items: flex-start;
          padding: 0;

          .member-role {
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-content: center;
            align-items: center;
            font-family: "Poppins", sans-serif;
            color: $black;
            font-size: 14px;
            font-weight: 500;
            text-align: left;
            text-transform: capitalize;
            margin: 0;
          }
          .member-name {
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-content: center;
            align-items: center;
            font-family: "Poppins", sans-serif;
            color: $grasp-blue;
            font-size: 14px;
            font-weight: 500;
            text-align: left;
            margin: 0;
          }
        }

        .lesson-list-buttons {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-content: center;
          align-items: center;
          padding: 0 8px;

          .lesson-category {
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-content: center;
            align-items: center;

            color: $black !important;
            font-size: 13px;
            font-weight: 500;
            text-transform: uppercase;
            margin: 0;

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
              padding-top: 1px;
              padding-bottom: 1px;
              --badge-color: $grey-40;
              color: $grey-90;
              box-shadow: none;
              border-width: 1.5px;
              border-style: solid;
              border-image: initial;
              border-color: #4d5358;
            }
          }

          .actions {
            width: 100%;
            min-width: 50px;
            display: flex;
            flex-direction: row;
            align-content: center;
            align-items: center;
            justify-content: flex-end;
            padding: 4px 0;
          }
        }
      }
    }

    .nft-preview {
      display: inline;
      float: left;
      box-sizing: border-box;
      width: 100%;
      max-width: 480px;
      background: $cream;
      border: 0.5px solid $grey-50;
      border-radius: 8px;
      box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;
      margin: 0;
      padding: 16px;
      transition: all 0.5s linear;
      overflow: hidden;

      .nft-image {
        position: relative;
        width: 100%;
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

      .nft-title {
        font-family: "Poppins", sans-serif;
        color: $grasp-blue;
        width: 100%;
        font-size: 16px;
        font-weight: 600;
        text-align: left;
        margin: 0 0 5px 0;
      }

      .nft-excerpt {
        width: 100%;
        color: $black;
        font-size: 13px;
        font-weight: normal;
        text-align: left;
        margin: 0 0 16px;
      }

      .nft-card-row {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-content: center;
        align-items: flex-end;
      }

      .nft-category {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
        align-items: center;

        color: $black;
        font-size: 13px;
        font-weight: 500;
        text-transform: uppercase;
        margin: 0;

        .nft-date {
          font-family: inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue",
            sans-serif;
          color: $grey-60;
          font-size: 12px;
          font-weight: 500;
          text-decoration: none;
          text-transform: uppercase;
          margin: 0 0 4px 0;
        }

        .category-indicator {
          width: 80%;
          outline: transparent solid 2px;
          outline-offset: 2px;
          border-radius: 9999px;
          transition: background-color 0.2s ease-out 0s;
          background: $grasp-cyan;
          font-size: 12px;
          text-align: center;
          text-wrap: nowrap;
          padding-inline: 8px;
          padding-top: 1px;
          padding-bottom: 1px;
          --badge-color: $grey-40;
          color: $grey-90;
          box-shadow: none;
          border-width: 1.5px;
          border-style: solid;
          border-image: initial;
          border-color: #4d5358;
        }
      }
      .button-column {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-content: center;
        align-items: center;
        padding: 0;
        margin: 0;
      }
    }

    .mb-20 {
      margin-bottom: 20px;
    }
    .mb-10 {
      margin-bottom: 10px;
    }
    .mb-5 {
      margin-bottom: 5px;
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
  background: $white;
  box-shadow: 0px 16px 32px 0px rgba(52, 58, 64, 0.3);
  z-index: 999999;

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

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>
