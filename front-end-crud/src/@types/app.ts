export type record = {
  id: number;
  name: string;
  age: number;
  github: string;
  address: string;
};

export type createUserDto = {
  id: string;
  name: string;
  age: number;
  ghub: string;
  cep: string;
  addressUF: string;
  addressCity: string;
  addressDistrict: string;
  addressStreet: string;
  addresNumber: string;
  addressComplement: null | string;
};

export type apiCrudResponse = {
  message: string;
  tag: number;
};
