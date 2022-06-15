<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useQuasar } from 'quasar';
import UserDialogResgister from './UserDialogResgister.vue';
import UserDialogDelete from './UserDialogDelete.vue';
import { record } from 'src/@types';
import { columnsProvider } from 'src/providers/dataTableColumns';

export default defineComponent({
  components: {
    UserDialogResgister,
    UserDialogDelete,
  },
  setup() {
    const q = useQuasar();

    const initialPagination = {
      sortBy: 'asc',
      descending: false,
      page: 1,
      rowsPerPage: 5,
    };

    const columns = columnsProvider;

    const rows: Array<record> = [
      {
        id: 1,
        name: 'lucas',
        age: 21,
        github: 'luccasalves',
        address: 'belem',
      },
      {
        id: 2,
        name: 'jr',
        age: 22,
        github: 'noeRj',
        address: 'rio',
      },
    ];

    function deleteRecord(userId: unknown): void {
      alert(userId);
    }
    return {
      q,
      columns,
      rows,
      deleteRecord,
      initialPagination,
      filter: ref(''),
    };
  },
});
</script>

<template>
  <div>
    <q-table
      :rows="rows"
      :columns="columns"
      row-key="id"
      :pagination="initialPagination"
      :filter="filter"
      no-data-label="Sem registros"
    >
      <template v-slot:top-left class="row justify-between">
        <UserDialogResgister
          :actionTypeButton="'create'"
          :labelButton="'Salvar'"
          :labelForm="'Adicionar'"
        />
      </template>

      <template v-slot:top-right>
        <q-input
          borderless
          dense
          debounce="300"
          v-model="filter"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <div class="row justify-center q-gutter-md no-wrap">
            <UserDialogDelete @delete-record="deleteRecord(props.key)" />

            <UserDialogResgister
              :userId="props.key"
              :actionTypeButton="'edit'"
              :labelButton="'Salvar'"
              :labelForm="'Editar'"
            />
          </div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>
