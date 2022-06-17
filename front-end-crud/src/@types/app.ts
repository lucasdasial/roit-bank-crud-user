export type createUserDto = {
  id: string;
  name: string;
  email: string;
  age: number | null;
  ghub: string;
  ghub_url_profile: string;
  ghub_url_repo: string;
  cep: string;
  addressUF: string;
  addressCity: string;
  addressDistrict: string;
  addressStreet: string;
  addresNumber: string;
  addressComplement: null | string;
  address?: string | null;
};
export type updateUserDto = {
  id?: string;
  name?: string;
  email?: string;
  age?: number | null;
  ghub?: string;
  cep?: string;
  addressUF?: string;
  addressCity?: string;
  addressDistrict?: string;
  addressStreet?: string;
  addresNumber?: string;
  addressComplement?: null | string;
  address?: string | null;
};

export type apiCrudPostResponse = {
  message: string;
  tag: number;
};
export type apiCrudDeleteResponse = {
  message: string;
};
export type apiCrudPatchResponse = {
  message: string;
};
