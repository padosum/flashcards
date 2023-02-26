<template>
  <div class="text-h4 font-weight-black text-center py-3">FlashMD</div>

  <v-list>
    <v-list-item
      ><v-icon icon="mdi-view-dashboard"></v-icon
      ><router-link to="/" data-testid="dashboard-link">
        Dashboard</router-link
      ></v-list-item
    >
    <v-divider></v-divider>
    <v-list-item v-for="learnset in store.state.learnsets" :key="learnset.id">
      <router-link :to="`/learnset/${learnset.id}`">{{
        learnset.name
      }}</router-link>
    </v-list-item>
  </v-list>
</template>

<script setup lang="ts">
import type { MyStore } from '@/store/types';
import { useStore } from 'vuex';

const store: MyStore = useStore();
</script>

<style scoped></style>
