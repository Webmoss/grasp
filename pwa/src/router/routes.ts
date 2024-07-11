const routes = [
  {
    path: "/",
    name: "home",
    meta: {
      guest: true,
      title: "Home",
      description: "",
    },
    component: () => import("@/views/HomeView.vue"),
  },
  {
    path: "/login",
    name: "login",
    meta: {
      guest: true,
      title: "Login",
    },
    component: () => import("@/views/LoginView.vue"),
  },
  {
    path: "/dashboard",
    name: "dashboard",
    meta: {
      guest: true,
      title: "Dashboard",
    },
    component: () => import("@/views/DashboardView.vue"),
  },
  {
    path: "/courses",
    name: "courses",
    meta: {
      guest: true,
      title: "Courses",
    },
    component: () => import("@/views/CoursesView.vue"),
  },
  {
    path: "/course/:name",
    name: "course",
    meta: {
      guest: true,
      title: "Course",
    },
    component: () => import("@/views/CourseView.vue"),
  },
  {
    path: "/category/:type?/:name?",
    name: "category",
    meta: {
      guest: true,
      title: "Category",
    },
    component: () => import("@/views/CourseView.vue"),
  },
  {
    path: "/terms",
    name: "terms",
    meta: {
      guest: true,
      title: "Terms of Use",
    },
    component: () => import("@/views/TermsView.vue"),
  },
  {
    path: "/privacy",
    name: "privacy",
    meta: {
      guest: true,
      title: "Privacy Policy",
    },
    component: () => import("@/views/PrivacyView.vue"),
  },
  {
    path: "/:catchAll(.*)*",
    name: "NotFound",
    meta: {
      guest: true,
      title: "404 Not Found",
    },
    component: () => import("@/views/ErrorNotFound.vue"),
  },
];

export default routes;
