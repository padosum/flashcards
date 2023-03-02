<template>
  <div>
    <v-card class="mx-auto" variant="outlined">
      <v-card-item>
        <div>
          <div class="text-h6 font-weight-bold mb-1">당신의 카드 뭉치</div>
          <div class="text-caption">
            학습을 위해 추가된 카드 뭉치 목록입니다.
          </div>
        </div>
      </v-card-item>
      <v-card-text>
        <v-list lines="two" role="list">
          <v-list-item
            v-for="learnset in learnsets"
            :key="learnset.id"
            :title="learnset.name"
            active-color="primary"
            @click="moveLearnset(learnset.id)"
            role="listitem"
          >
            <template v-slot:append>
              <BaseButton
                text=""
                color="grey-lighten-1"
                variant="text"
                @click.stop="deleteLearnset({ id: learnset.id })"
                :aria-label="`${learnset.name} 삭제하기`"
              >
                <v-icon icon="mdi-delete"></v-icon>
              </BaseButton>
            </template>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue';
import { MutationTypes } from '@/store/mutations';
import type { MyStore } from '@/store/types';
import type { Learnset } from '@/types/interfaces';
import type { PropType } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

defineProps({
  learnsets: {
    type: Array as PropType<Array<Learnset>>,
    required: true,
  },
});

const store: MyStore = useStore();

const deleteLearnset = ({ id }: { id: string }) => {
  const [learnset] = store.getters.learnset(id);

  const deleteLearnset = confirm(
    `"${learnset.name}" 카드 뭉치를 삭제하시겠습니까?`
  );

  if (deleteLearnset) {
    router.push('/');
    store.commit(MutationTypes.DELETE_LEARNSET, learnset);
  }
  return;
};

const router = useRouter();

const moveLearnset = (id: string) => {
  router.push(`/learnset/${id}`);
};
</script>

<style scoped></style>
