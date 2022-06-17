import { createUserDto, record } from './../@types/app';
import { defineStore } from 'pinia';

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application

type State = {
  rowsTable: Array<record>;
};

export const useTableStore = defineStore('datatable', {
  state: (): State => {
    return {
      rowsTable: [],
    };
  },

  getters: {
    getRows(state) {
      return state.rowsTable;
    },
  },
  actions: {
    setRecordAtTable(record: record): void {
      const obRecord: record = {
        address: `${record.addressStreet}, ${record.addresNumber},
          ${record.addressDistrict} -  ${record.addressCity}/${record.addressUF}`,
        ...record,
      };
      this.rowsTable.push(obRecord);
    },
  },
});
