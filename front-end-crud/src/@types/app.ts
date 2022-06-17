// export type record = {
//   id: number;
//   name: string;
//   age: number;
//   ghub: string;
//   cep: string;
//   addressUF: string;
//   addressCity: string;
//   addressDistrict: string;
//   addressStreet: string;
//   addresNumber: string;
//   addressComplement: null | string;
//   address?: string | null;
// };

export type createUserDto = {
  id: string;
  name: string;
  age: number | null;
  ghub: string;
  cep: string;
  addressUF: string;
  addressCity: string;
  addressDistrict: string;
  addressStreet: string;
  addresNumber: string;
  addressComplement: null | string;
  address?: string | null;
};

export type apiCrudPostResponse = {
  message: string;
  tag: number;
};
export type apiCrudDeleteResponse = {
  message: string;
};
