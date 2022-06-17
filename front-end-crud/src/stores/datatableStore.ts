import { createUserDto } from './../@types/app';
import { defineStore } from 'pinia';
import axios from 'axios';
import { Notify } from 'quasar';

type State = {
  rowsTable: Array<createUserDto>;
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
    updateRows(array: Array<createUserDto>) {
      this.rowsTable = array;
    },
    setRecordAtTable(record: createUserDto): void {
      const obRecord: createUserDto = {
        address: `${record.addressStreet}, ${record.addresNumber},
          ${record.addressDistrict} -  ${record.addressCity}/${record.addressUF}`,
        ...record,
      };
      this.rowsTable.push(obRecord);
    },
    deleleRecord(id: string) {
      this.rowsTable.forEach((record) => {
        if (record.id == id) {
          // const i = this.rowsTable.indexOf(record);
          const newlist = this.rowsTable.filter((item) => item.id !== id);
          this.updateRows(newlist);

          void axios.delete(`http://localhost:3000/users/${id}`).then((res) => {
            if (res.status == 200) {
              Notify.create({
                message: 'Opereção feita com sucesso',
                type: 'positive',
                position: 'top',
              });
              return;
            }
            Notify.create({
              message: 'Ocorreu um erro, tente novamente',
              type: 'negative',
              position: 'top',
            });
          });

          return;
        }
      });
    },
  },
});
