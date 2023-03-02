<template>
  <div
    class="d-flex justify-center align-center text-h5 font-weight-black py-5"
  >
    <span class="logo d-flex mr-2">
      <LogoSvg />
    </span>
    FlashCards
  </div>

  <v-list role="navigation">
    <v-list-item to="/" exact>
      <template v-slot:prepend>
        <v-icon icon="mdi-view-dashboard"></v-icon>
      </template>
      <v-list-item-title> Dashboard</v-list-item-title>
    </v-list-item>
    <v-list-subheader>카드 뭉치 목록</v-list-subheader>
    <v-list :lines="false" density="compact" nav role="navigation">
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
import LogoSvg from '@/components/LogoSvg.vue';

import type { MyStore } from '@/store/types';
import { useStore } from 'vuex';

const store: MyStore = useStore();
</script>

<style scoped></style>
