<template>
  <v-card class="mx-auto mb-4" variant="outlined">
    <v-card-item>
      <div class="text-h6 font-weight-bold mb-1">학습 진행 상태</div>
    </v-card-item>
    <div
      class="chart-container mb-4"
      style="position: relative; height: 100%; width: 100%"
    >
      <canvas ref="canvas"></canvas>
    </div>
    <template v-if="cardType">
      <v-table density="compact" class="pa-2">
        <thead>
          <tr>
            <th class="text-left font-weight-bold">질문</th>
            <th class="text-center font-weight-bold">맞춘 횟수</th>
            <th class="text-center font-weight-bold">틀린 횟수</th>
            <th class="text-center font-weight-bold">연속 정답 횟수</th>
            <th class="text-center font-weight-bold">최근 학습일</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="card in cards" :key="card.id">
            <td>
              <router-link :to="`/learnset/${card.learnsetId}`">
                {{ card.title }}
              </router-link>
            </td>
            <td class="text-center">{{ card.correctCnt || 0 }}</td>
            <td class="text-center">{{ card.incorrectCnt || 0 }}</td>
            <td class="text-center">{{ card.repetition || 0 }}</td>
            <td class="text-center">{{ dateFormat(card.reviewDate) }}</td>
          </tr>
        </tbody>
      </v-table>
    </template>
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

import { useStore } from 'vuex';
import type { MyStore } from '@/store/types';

import { useChartjs } from '@/plugins/chartjs';

const canvas = ref<HTMLCanvasElement | null>(null);

const store: MyStore = useStore();

const props = defineProps({
  learnsetId: {
    type: String,
  },
});

const cardType = ref('');

const cards = computed(() => {
  if (cardType.value === 'know') {
    if (props.learnsetId) {
      return store.getters.knowCards.filter(
        (card) => card.learnsetId === props.learnsetId
      );
    }
    return store.getters.knowCards;
  } else {
    if (props.learnsetId) {
      return store.getters.learningCards.filter(
        (card) => card.learnsetId === props.learnsetId
      );
    }
    return store.getters.learningCards;
  }
});

const renderChart = () => {
  const data = props.learnsetId
    ? store.getters.progressById(props.learnsetId)
    : store.getters.progress;

  const ctx = canvas.value?.getContext('2d');

  const Chart = useChartjs();
  if (ctx && Chart) {
    new Chart(ctx as CanvasRenderingContext2D, {
      type: 'doughnut',
      data: {
        labels: data.map((row) => row.label),
        datasets: [
          {
            data: data.map((row) => row.count),
            backgroundColor: ['#d1c4e9', '#242424'],
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        onClick: (e, [elements]) => {
          if (elements) {
            const i = elements.index;
            cardType.value = data[i].type;
          }
        },
      },
    });
  }
};
onMounted(() => {
  renderChart();
});

const dateFormat = (date: string) => {
  if (date !== '') {
    return new Intl.DateTimeFormat('ko-KR').format(new Date(date));
  }
  return date;
};
</script>

<style scoped></style>
