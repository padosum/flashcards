<template>
  <v-btn class="d-none" @click="openModal = true" role="button"> open </v-btn>
  <v-dialog v-model="openModal" width="70%" persistent v-if="openModal">
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
        <v-btn
          color="blue-darken-1"
          variant="text"
          data-testid="close"
          @click="openModal = false"
        >
          취소
        </v-btn>
        <v-btn color="blue-darken-1" variant="text" @click="openModal = false">
          추가
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
const props = defineProps({
  title: {
    type: String,
  },
  learnsetTitle: {
    type: String,
  },
});

const openModal = ref(false);
const learnsetTitle = computed(() => props.learnsetTitle);

const toggleModal = () => {
  openModal.value = !openModal.value;
};

defineExpose({
  toggleModal,
});
</script>

<style scoped></style>
