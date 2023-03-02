<template>
  <v-container class="d-flex justify-center align-center">
    <v-sheet class="pa-6" min-width="50%">
      <LearnsetChart :learnset-id="route.params.id as string" />
      <BaseButton
        color="primary"
        text="학습 시작하기"
        :to="`/learn/${route.params.id}`"
      />
    </v-sheet>
  </v-container>
</template>

<script setup lang="ts">
import LearnsetChart from '@/components/LearnsetChart.vue';
import BaseButton from '@/components/BaseButton.vue';

import { useRoute } from 'vue-router';
const route = useRoute();
</script>

<style scoped></style>
