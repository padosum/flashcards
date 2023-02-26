<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer">
      <NavigationDrawer />
    </v-navigation-drawer>
    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <div data-testid="toolbar-title">{{ pageTitle }}</div>
      </v-toolbar-title>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import NavigationDrawer from '@/components/NavigationDrawer.vue';
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import type { MyStore } from '@/store/types';

const drawer = ref(true);

const route = useRoute();
const store: MyStore = useStore();

const pageTitle = computed(() => {
  const learnset = store.state.learnsets.find(
    ({ id }) => id === route.params.id
  );

  return learnset ? learnset.name : 'Dashboard';
});
</script>

<style scoped></style>
