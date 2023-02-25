<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer">
      <div class="text-h4 font-weight-black text-center py-3">FlashMD</div>
      <v-divider></v-divider>
      <v-list>
        <v-list-item title="Navigation drawer"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ pageTitle }}</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();

const drawer = ref(true);
const pageTitle = computed(() => route.name);
</script>

<style scoped></style>
