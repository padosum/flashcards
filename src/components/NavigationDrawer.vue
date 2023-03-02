<template>
  <div
    class="d-flex justify-center align-center text-h4 font-weight-black py-5"
  >
    <span class="logo d-flex mr-2" v-html="Logo"></span>
    FlashMD
  </div>

  <v-list>
    <v-list-item to="/" exact>
      <template v-slot:prepend>
        <v-icon icon="mdi-view-dashboard"></v-icon>
      </template>
      <v-list-item-title> Dashboard</v-list-item-title>
    </v-list-item>
    <v-list-subheader>카드 뭉치 목록</v-list-subheader>
    <v-list :lines="false" density="compact" nav>
      <v-list-item
        v-for="item in store.state.learnsets"
        :key="item.id"
        active-color="primary"
        :to="`/learnset/${item.id}`"
        exact
      >
        {{ item.name }}
      </v-list-item>
    </v-list>
  </v-list>
</template>

<script setup lang="ts">
/// <reference types="vite-svg-loader" />
import Logo from '@/assets/logo.svg?raw';

import type { MyStore } from '@/store/types';
import { useStore } from 'vuex';

const store: MyStore = useStore();
</script>

<style scoped></style>
