<template>
  <BaseButton text="open" class="d-none" role="button" @click="open = true" />
  <v-dialog v-model="open" v-if="open" :class="modalSize">
    <v-card>
      <v-card-title>
        <span class="text-h5">{{ title }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-text-field
            label="카드 뭉치 이름"
            required
            v-model="learnsetTitle"
          ></v-text-field>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <BaseButton
          text="취소"
          color="primary-darken-2"
          variant="text"
          data-testid="close"
          @click="open = false"
        />
        <BaseButton
          text="추가"
          color="primary"
          variant="text"
          data-testid="save"
          @click="addLearnset"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import BaseButton from './BaseButton.vue';

import { ref, computed, watchEffect } from 'vue';
import { useDisplay } from 'vuetify';

import useModal from '@/hooks/useModal';
const { open, toggleModal } = useModal();

const emit = defineEmits(['addLearnset']);

const props = defineProps({
  title: {
    type: String,
  },
  learnsetTitle: {
    type: String,
    required: true,
  },
});

const learnsetTitle = ref('');
watchEffect(() => (learnsetTitle.value = props.learnsetTitle));

const addLearnset = () => {
  open.value = false;
  emit('addLearnset', learnsetTitle.value);
};

const { name } = useDisplay();

const modalSize = computed(() => {
  switch (name.value) {
    case 'xs':
    case 'sm':
      return 'w-100';
    case 'md':
      return 'w-75';
    default:
      return 'w-25';
  }
});

defineExpose({
  toggleModal,
});
</script>

<style scoped></style>
