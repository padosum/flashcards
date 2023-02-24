<template>
  <span data-testid="location-display">Dashboard</span>
  <div class="d-flex flex-column">
    <BaseButton text="카드 뭉치 추가하기" @click="importLearnset" />
    <AddLearnsetModal
      :learnset-title="mdFile.name"
      title="카드 뭉치 추가하기"
      ref="modal"
    />
  </div>
</template>

<script setup lang="ts">
import fileDialog from 'file-dialog';

import BaseButton from '@/components/BaseButton.vue';
import AddLearnsetModal from '@/components/AddLearnsetModal.vue';
import { ref, reactive } from 'vue';
import type { File } from '@/types/interfaces';

const mdFile: File = reactive({
  name: '',
  contents: '',
});

const modal = ref<InstanceType<typeof AddLearnsetModal> | null>(null);

const importLearnset = async () => {
  const { name, contents } = await openDialog();
  mdFile.name = name;
  mdFile.contents = contents;

  modal.value?.toggleModal();
};

const openDialog = async (): Promise<File> => {
  const [file] = await fileDialog({ accept: '.md,.markdown' });

  return new Promise((resolve, reject) => {
    if (!file) reject(new Error('No file selected'));
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () =>
      resolve({
        name: file.name,
        contents: reader.result?.toString(),
      });
    reader.onerror = () => reject(new Error('No file selected'));
  });
};
</script>

<style scoped></style>
