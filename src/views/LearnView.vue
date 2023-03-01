<template>
  <v-container class="d-flex flex-column pa-4">
    <v-switch
      class="align-self-end"
      v-model="showReviewCards"
      label="학습이 필요한 항목만 보기"
      color="primary"
      :value="true"
      hide-details
    ></v-switch>
    <v-sheet
      elevation="12"
      :width="sheetSize"
      rounded="lg"
      class="pa-4 text-center mx-auto"
    >
      <v-banner color="error" icon="mdi-alert-box" stacked v-if="!cards">
        <span class="text-h5">학습이 필요한 항목이 없습니다.</span>
      </v-banner>

      <swiper
        :effect="'cards'"
        :grabCursor="true"
        :modules="modules"
        :navigation="true"
        class="mySwiper"
        else
      >
        <swiper-slide v-for="card in learnset.cards" :key="card.id">
          <LearnsetCard :card="card" :review="showReviewCards" />
        </swiper-slide>
      </swiper>
    </v-sheet>
  </v-container>
</template>

<script setup lang="ts">
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-cards';

import { Swiper, SwiperSlide } from 'swiper/vue';
import { EffectCards, Navigation } from 'swiper';

import { ref, computed } from 'vue';
import { useDisplay } from 'vuetify';
import { useStore } from 'vuex';
import type { MyStore } from '@/store/types';

import { useRoute } from 'vue-router';

import LearnsetCard from '@/components/LearnsetCard.vue';

const modules = [EffectCards, Navigation];

const showReviewCards = ref(false);

const route = useRoute();
const store: MyStore = useStore();
const {
  params: { id },
} = route;

const cards = computed(() => {
  return learnset.value.cards.length > 0;
});

const learnset = computed(() => {
  if (showReviewCards.value) {
    return store.getters.reviewCards({ id: id as string })[0];
  } else {
    return store.getters.learnset(id as string)[0];
  }
});

const { name } = useDisplay();

const sheetSize = computed(() => {
  switch (name.value) {
    case 'xs':
    case 'sm':
      return '80%';
    default:
      return '60%';
  }
});
</script>

<style scoped>
h2 {
  font-size: 24px;
  color: #242424;
}

.swiper-slide {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 18px;
  font-size: 22px;
  font-weight: bold;
}

.swiper-slide {
  background-color: var(--bg-color);
}
</style>
