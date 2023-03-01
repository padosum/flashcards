<template>
  <div class="pa-10">
    <LearnsetChart :learnset-id="route.params.id as string" />
    <BaseButton text="학습 시작하기" :to="`/learn/${route.params.id}`" />
  </div>
</template>

<script setup lang="ts">
import LearnsetChart from '@/components/LearnsetChart.vue';
import BaseButton from '@/components/BaseButton.vue';

import { useRoute } from 'vue-router';
const route = useRoute();
</script>

<style scoped></style>
