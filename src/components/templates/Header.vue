<template>
  <header class="header">
    <a class="toggle" @click="toggleMenu" v-if="!hideToggle">
      <i class="fa fa-lg" :class="icon"></i>
    </a>

    <h1 class="title">
      <router-link to="/">{{ title }}</router-link>
    </h1>

    <UserDropDown v-if="!hideUserDropDown" />
  </header>
</template>

<script>
import UserDropDown from "@/components/templates/UserDropDown";
export default {
  name: "Header",
  components: { UserDropDown },
  props: {
    title: String,
    hideToggle: Boolean,
    hideUserDropDown: Boolean,
  },
  computed: {
    icon() {
      return this.$store.state.isMenuVisible
        ? "fa fa-chevron-circle-down"
        : "fa fa-chevron-circle-left";
    },
  },
  methods: {
    toggleMenu() {
      this.$store.commit("toggleMenu");
    },
  },
};
</script>

<style>
.header {
  grid-area: header;
  background: linear-gradient(to right, #180135, #2a012f);

  display: flex;
  justify-content: center;
  align-items: center;
}

.title {
  font-size: 2em;
  color: #fff;
  font-weight: bold;
  flex-grow: 1;
  text-align: center;
}

.title a {
  color: #fff;
  text-decoration: none;
}
.title a:hover {
  color: #fff;
  text-decoration: none;
}
header.header > a.toggle {
  width: 60px;
  height: 100%;
  color: #fff;
  align-self: flex-start;
  text-decoration: none;

  display: flex;
  justify-content: center;
  align-items: center;
}

header.header > a.toggle:hover {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>