<template>
  <v-layout class="d-flex flex-column pa-4">
    <v-switch
      class="align-self-end"
      v-model="showReviewCards"
      label="학습이 필요한 항목만 보기"
      color="primary"
      value="primary"
      hide-details
    ></v-switch>
  </v-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const showReviewCards = ref(false);
</script>

<style scoped></style>
