<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useQuasar } from 'quasar';
import UserDialogResgister from './UserDialogResgister.vue';
import UserDialogDelete from './UserDialogDelete.vue';
import { createUserDto } from 'src/@types/app';
import { columnsMock } from 'src/mocks/dataTableColumns';
import axios from 'axios';
import { useTableStore } from 'src/stores/datatableStore';
import UserDialogEdit from './UserDialogEdit.vue';

export default defineComponent({
  components: {
    UserDialogResgister,
    UserDialogDelete,
    UserDialogEdit,
  },
  setup() {
    const q = useQuasar();
    const tableStore = useTableStore();
    q.loading.show();

    void axios
      .get<createUserDto[]>('http://localhost:3000/users')
      .then((res) => {
        res.data.forEach((user) => {
          tableStore.setRecordAtTable(user);
        });
        q.loading.hide();
      });

    const initialPagination = {
      sortBy: 'asc',
      descending: false,
      page: 1,
      rowsPerPage: 5,
    };

    const columns = columnsMock;

    function deleteRecord(userId: string): void {
      tableStore.deleleRecord(userId);
    }
    return {
      q,
      columns,
      tableStore,
      initialPagination,
      deleteRecord,
      filter: ref(''),
    };
  },
});
</script>

<template>
  <div>
    <q-table
      :rows="tableStore.getRows"
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

            <UserDialogEdit :id="props.key" />
          </div>
        </q-td>
      </template>
    </q-table>
  </div>
</template>
