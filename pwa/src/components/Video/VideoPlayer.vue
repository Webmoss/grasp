<template>
  <video
    ref="videoPlayer"
    :class="class"
    :src="src"
    :muted="muted"
    :autoplay="autoplay"
    :controls="controls"
    :loop="loop"
    :width="width"
    :height="height"
    :poster="poster"
    :preload="preload"
    :playsinline="true"
  />
  <slot
    name="controls"
    :play="play"
    :pause="pause"
    :toggle-play="togglePlay"
    :playing="playing"
    :percentage-played="percentagePlayed"
    :seek-to-percentage="seekToPercentage"
    :duration="duration"
    :convert-time-to-duration="convertTimeToDuration"
    :video-muted="videoMuted"
    :toggle-mute="toggleMute"
  ></slot>
</template>
<script setup lang="ts">
import { debounce } from "lodash";
import { ref, onMounted, onUnmounted } from "vue";

const EVENTS = [
  "play",
  "pause",
  "ended",
  "loadeddata",
  "waiting",
  "playing",
  "timeupdate",
  "canplay",
  "canplaythrough",
  "statechanged",
];

defineProps({
  class: { type: String, required: true },
  src: { type: String, required: true },
  controls: { type: Boolean, default: false },
  loop: { type: Boolean, default: false },
  width: { type: Number, default: 540 },
  height: { type: Number, default: 304 },
  autoplay: { type: Boolean, default: false },
  muted: { type: Boolean, default: false },
  poster: { type: String, required: false },
  preload: { type: String as () => "auto" | "metadata" | "none", default: "auto" },
});

const emit = defineEmits<{
  (
    event:
      | "abort"
      | "auxclick"
      | "animationstart"
      | "animationcancel"
      | "animationend"
      | "animationiteration"
      | "blur"
      | "beforeinput"
      | "beforetoggle"
      | "cancel"
      | "change"
      | "click"
      | "canplay"
      | "canplaythrough"
      | "close"
      | "play"
      | "pause"
      | "ended"
      | "encrypted"
      | "loadeddata"
      | "waiting"
      | "playing"
      | "timeupdate"
      | "statechanged"
      | "fullscreenchange"
      | "fullscreenerror"
      | "waitingforkey",
    payload: { event: Event; player: HTMLVideoElement }
  ): void;
}>();

const videoPlayer = ref<HTMLVideoElement | null>(null);
const playing = ref(false);
const duration = ref(0);
const percentagePlayed = ref(0);
const videoMuted = ref(false);

const play = () => {
  if (!videoPlayer.value) return;
  videoPlayer.value.play();
  playing.value = true;
};
const pause = () => {
  if (!videoPlayer.value) return;
  videoPlayer.value.pause();
  playing.value = false;
};
const togglePlay = () => {
  playing.value ? pause() : play();
};
const seekToPercentage = (percentage: number) => {
  if (!videoPlayer.value) return;
  videoPlayer.value.currentTime = (percentage / 100) * duration.value;
};
const mute = () => {
  if (!videoPlayer.value) return;
  videoPlayer.value.muted = true;
  videoMuted.value = true;
};
const unmute = () => {
  if (!videoPlayer.value) return;
  videoPlayer.value.muted = false;
  videoMuted.value = false;
};
const toggleMute = () => {
  if (!videoMuted.value) return;
  videoMuted.value ? unmute() : mute();
};
const setMuted = (state: boolean) => {
  videoMuted.value = state;
};
const convertTimeToDuration = (seconds: number): string => {
  return [Math.floor(seconds / 60), seconds % 60]
    .map((time) => time.toString().padStart(2, "0")) // Ensures two digits with leading zeroes
    .join(":");
};

const handleEvent = (which: keyof HTMLMediaElementEventMap) => (event: Event) => {
  if (which === "loadeddata") {
    duration.value = videoPlayer.value?.duration || 0;
  }
  if (which === "timeupdate") {
    percentagePlayed.value =
      ((videoPlayer.value?.currentTime ?? 0) / (duration.value || 1)) * 100;
  }
  emit(which, { event, player: videoPlayer.value });
};

const eventHandlers = EVENTS.reduce((handlers, event) => {
  handlers[event] = handleEvent(event);
  return handlers;
}, {} as Record<keyof HTMLMediaElementEventMap, (event: Event) => void>);

const bindVideoEvent = (which: keyof HTMLMediaElementEventMap) => {
  videoPlayer.value?.addEventListener(which, eventHandlers[which], true);
};

const unbindVideoEvent = (which: keyof HTMLMediaElementEventMap) => {
  videoPlayer.value?.removeEventListener(which, eventHandlers[which], true);
};

defineExpose({
  videoPlayer,
  play,
  pause,
  togglePlay,
  toggleMute,
  seekToPercentage,
});

onMounted(() => {
  EVENTS.forEach((event) => {
    bindVideoEvent(event);
  });
  if (videoPlayer.value?.muted) {
    setMuted(true);
  }
});

onUnmounted(() => {
  EVENTS.forEach((event) => {
    unbindVideoEvent(event);
  });
});
</script>
