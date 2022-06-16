/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  age: number;
  @ApiProperty()
  ghub: string;
  @ApiProperty()
  addressUF: string;
  @ApiProperty()
  addressCity: string;
  @ApiProperty()
  addressDistrict: string;
  @ApiProperty()
  addressStreet: string;
  @ApiProperty()
  addresNumber: number;
  @ApiProperty()
  addressComplement?: string;
}
