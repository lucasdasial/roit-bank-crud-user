<script lang="ts">
import { defineComponent } from 'vue';

import DataTable from 'src/components/DataTable.vue';
export default defineComponent({
  components: {
    DataTable,
  },
  setup() {
    return {};
  },
});
</script>

<template>
  <q-page class="flex flex-center bg-secondary">
    <main class="app-max-width q-pa-md">
      <q-img
        src="https://mundo.roit.ai/hubfs/logo_roit_bank_branca_dourada%20(1)-2.png"
        width="300px"
      />
      <p class="text-white text-h6">Teste Engenheiro de software fullstack</p>
      <DataTable />
    </main>
  </q-page>
</template>
