import { QTableProps } from 'quasar';

export const columnsMock: QTableProps['columns'] = [
  {
    name: 'id',
    label: 'ID',
    field: 'id',
    align: 'left',
    headerClasses: 'bg-grey-3',
  },
  {
    name: 'name',
    label: 'Nome',
    field: 'name',
    align: 'left',
    headerClasses: 'bg-grey-3',
  },
  {
    name: 'age',
    label: 'Idade',
    field: 'age',
    align: 'left',
    headerClasses: 'bg-grey-3',
  },
  {
    name: 'github',
    label: 'Github profile',
    field: 'ghub',
    align: 'left',
    headerClasses: 'bg-grey-3',
  },
  {
    name: 'address',
    label: 'Endereço',
    field: 'address',
    align: 'left',
    headerClasses: 'bg-grey-3',
  },
  {
    name: 'actions',
    label: 'Ações',
    field: '',
    align: 'center',
    headerClasses: 'bg-grey-3',
  },
];
