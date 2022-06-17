/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty()
  name?: string;
  @ApiProperty()
  age?: number;
  @ApiProperty()
  email?: string;
  @ApiProperty()
  ghub?: string;
  @ApiProperty()
  cep?: string;
  @ApiProperty()
  adrsUF?: string;
  @ApiProperty()
  addressCity?: string;
  @ApiProperty()
  addressDistrict?: string;
  @ApiProperty()
  addressStreet?: string;
  @ApiProperty()
  addresNumber?: string;
  @ApiProperty()
  addressComplement?: string;
}
