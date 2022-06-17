<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const openDialog = ref(false);

    return {
      openDialog,
    };
  },
});
</script>

<template>
  <div>
    <q-btn
      icon="delete"
      color="negative"
      flat
      round
      dense
      @click="openDialog = true"
    />
    <q-dialog v-model="openDialog" persistent>
      <q-card class="card">
        <q-card-section class="row justify-between items-center q-mb-xs">
          <p class="text-h6 q-ma-none">Excluir</p>
          <q-btn
            icon="close"
            color="grey-5"
            round
            dense
            size="xs"
            v-close-popup
          />
        </q-card-section>

        <q-separator inset />

        <q-card-section class="q-my-md">
          <q-btn icon="close" round color="negative" size="xs" v-close-popup />
          Confirmar a exclusão desse registro?
        </q-card-section>
        <q-separator inset />

        <q-card-actions align="right" class="q-pa-md">
          <q-btn outline label="cancelar" color="negative" v-close-popup />
          <q-btn
            label="excluir"
            color="negative"
            @click="$emit('deleteRecord')"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<style lang="scss" scoped>
.card {
  min-width: 400px;
}
</style>
