import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  id: string;
  name?: string;
  age?: number;
  ghub?: string;
  adrsUF?: string;
  addressCity?: string;
  addressDistrict?: string;
  addressStreet?: string;
  addresNumber?: number;
  addressComplement?: string;
}
