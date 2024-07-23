import { createRouter, createWebHistory } from "vue-router";
import { authGuard } from "./guards";
import { nextTick } from "vue";

import routes from "./routes";

const baseURL = "";
const baseTitle = "Grasp Academy";

const router = createRouter({
  history: createWebHistory(baseURL),
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      const el = window.location.href.split("#")[1];
      if (el.length) {
        setTimeout(() => {
          document.getElementById(el)?.scrollIntoView({
            behavior: "smooth",
          });
        }, 100);
      }
    } else if (savedPosition) {
      return savedPosition || { top: 0, left: 0};
    } else {
      document
        .getElementById("app")
        ?.scrollIntoView({ behavior: "smooth" });
    } 
  },
  routes,
});

router.beforeEach((to, from, next) => {
  authGuard(to, next);
});

router.afterEach((to) => {
  nextTick(() => {
    document.title = to.meta.title
      ? `${to.meta.title} - ${baseTitle}`
      : baseTitle;
  });
});

export default router;
