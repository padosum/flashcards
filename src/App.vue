<script setup lang="ts">
import { ref } from 'vue';

const drawer = ref(false);
</script>

<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer"> </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<style scoped></style>